import React, { useState, useEffect } from "react";
import { openDB } from "idb";
import { format } from "date-fns";

const today = format(new Date(), "yyyy-MM-dd");

function HabitTracker() {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    const db = await openDB("habitDB", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("habits")) {
          db.createObjectStore("habits", { keyPath: "id", autoIncrement: true });
        }
      },
    });
    const tx = db.transaction("habits", "readonly");
    const store = tx.objectStore("habits");
    const allHabits = await store.getAll();
    setHabits(allHabits);
  };

  const saveHabit = async () => {
    const trimmed = habit.trim();
    if (!trimmed) return;

    const db = await openDB("habitDB", 1);
    const tx = db.transaction("habits", "readwrite");
    const store = tx.objectStore("habits");

    if (editingId !== null) {
      const existing = await store.get(editingId);
      await store.put({ ...existing, id: editingId, name: trimmed });
      setEditingId(null);
    } else {
      await store.add({ name: trimmed, createdAt: new Date(), completionHistory: {} });
    }

    await tx.done;
    setHabit("");
    loadHabits();
  };

  const toggleTodayCompletion = async (id, currentStatus) => {
    const db = await openDB("habitDB", 1);
    const tx = db.transaction("habits", "readwrite");
    const store = tx.objectStore("habits");
    const habit = await store.get(id);

    const history = habit.completionHistory || {};
    history[today] = !currentStatus;

    await store.put({ ...habit, completionHistory: history });
    await tx.done;
    loadHabits();
  };

  const startEditing = (habit) => {
    setHabit(habit.name);
    setEditingId(habit.id);
  };

  const deleteHabit = async (id) => {
    const db = await openDB("habitDB", 1);
    const tx = db.transaction("habits", "readwrite");
    const store = tx.objectStore("habits");
    await store.delete(id);
    await tx.done;
    loadHabits();
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Track Your Habits</h2>
      <input
        type="text"
        placeholder="Enter a habit"
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        style={{ padding: "0.5rem", width: "60%", marginRight: "1rem" }}
      />
      <button onClick={saveHabit} style={{ padding: "0.5rem 1rem" }}>
        {editingId !== null ? "Update Habit" : "Add Habit"}
      </button>

      <ul style={{ marginTop: "1rem" }}>
        {habits.map((h) => {
          const completedToday = h.completionHistory?.[today] || false;
          return (
            <li key={h.id} style={{ marginBottom: "0.75rem" }}>
              <input
                type="checkbox"
                checked={completedToday}
                onChange={() => toggleTodayCompletion(h.id, completedToday)}
                style={{ marginRight: "0.5rem" }}
              />
              <span style={{ textDecoration: completedToday ? "line-through" : "none" }}>
                {h.name}
              </span>

              <button onClick={() => startEditing(h)} style={{ marginLeft: "1rem" }}>
                Edit
              </button>
              <button
                onClick={() => deleteHabit(h.id)}
                style={{ marginLeft: "0.5rem", backgroundColor: "#f66", color: "#fff" }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HabitTracker;
