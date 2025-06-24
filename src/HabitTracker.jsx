import React, { useState, useEffect } from "react";
import { openDB } from "idb";

function HabitTracker() {
  const [habit, setHabit] = useState("");
  const [habits, setHabits] = useState([]);

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
    if (!habit.trim()) return;

    const db = await openDB("habitDB", 1);
    const tx = db.transaction("habits", "readwrite");
    const store = tx.objectStore("habits");
    await store.add({ name: habit, createdAt: new Date() });
    await tx.done;

    setHabit("");
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
        Add Habit
      </button>

      <ul style={{ marginTop: "1rem" }}>
        {habits.map((h) => (
          <li key={h.id}>{h.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default HabitTracker;
