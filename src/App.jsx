import React from 'react';
import Header from './components/Header';
import HabitCard from './components/HabitCard';

const dummyHabits = [
  { name: 'Drink Water', streak: 5, completed: 12, total: 14 },
  { name: 'Exercise', streak: 2, completed: 4, total: 7 },
  { name: 'Sleep by 11 PM', streak: 8, completed: 15, total: 15 },
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow px-6 py-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {dummyHabits.map((habit, idx) => (
          <HabitCard key={idx} habit={habit} />
        ))}
      </main>
    </div>
  );
}

export default App;
