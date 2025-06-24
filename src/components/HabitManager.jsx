import React, { useEffect, useState } from 'react';
import { getHabits, addHabit } from '../utils/db';
import HabitCard from './HabitCard';

export default function HabitManager() {
  const [habits, setHabits] = useState([]);
  const [newHabitName, setNewHabitName] = useState('');

  useEffect(() => {
    loadHabits();
  }, []);

  async function loadHabits() {
    const stored = await getHabits();
    setHabits(stored);
  }

  async function handleAddHabit(e) {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    const newHabit = {
      name: newHabitName.trim(),
      streak: 0,
      completed: 0,
      total: 0,
    };

    await addHabit(newHabit);
    setNewHabitName('');
    loadHabits();
  }

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <form onSubmit={handleAddHabit} className="flex items-center gap-4 mb-6">
        <input
          type="text"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          placeholder="Enter new habit"
          className="flex-grow border rounded px-4 py-2 shadow-sm"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Habit
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {habits.length === 0 ? (
          <p className="text-gray-500 col-span-full">No habits yet. Add one above!</p>
        ) : (
          habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))
        )}
      </div>
    </div>
  );
}
