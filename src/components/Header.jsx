import React from 'react';

export default function Header() {
  return (
    <header className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">HabitSync AI</h1>
      <nav>
        <ul className="flex space-x-6">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">Analytics</a></li>
          <li><a href="#" className="hover:underline">Coach</a></li>
          <li><a href="#" className="hover:underline">Settings</a></li>
        </ul>
      </nav>
    </header>
  );
}
