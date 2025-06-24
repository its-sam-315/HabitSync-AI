import React, { useState, useEffect } from "react";
import { openDB } from "idb";

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
    const trimmedHabit = habit.trim();
    if (!trimmedHabit) return;

    const db = await openDB("habitDB", 1);
    const tx = db.transaction("habits", "readwrite");
    const store = tx.objectStore("habits");

    if (editingId !== null) {
      await store.put({ id: editingId, name: trimmedHabit });
      setEditingId(null);
    } else {
      await store.add({ name: trimmedHabit, createdAt: new Date() });
    }

    await tx.done;
    setHabit("");
    loadHabits();
  };

  const deleteHabit = async (id) => {
    const db = await openDB("habitDB", 1);
    const tx = db.transaction("habits", "readwrite");
    const store = tx.objectStore("habits");
    await store.delete(id);
    await tx.done;
    loadHabits();
  };

  const startEditing = (habit) => {
    setHabit(habit.name);
    setEditingId(habit.id);
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
        {habits.map((h) => (
          <li key={h.id} style={{ marginBottom: "0.5rem" }}>
            {h.name}
            <button
              onClick={() => startEditing(h)}
              style={{ marginLeft: "1rem", padding: "0.25rem 0.5rem" }}
            >
              Edit
            </button>
            <button
              onClick={() => deleteHabit(h.id)}
              style={{ marginLeft: "0.5rem", padding: "0.25rem 0.5rem", backgroundColor: "#f66" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HabitTracker;
