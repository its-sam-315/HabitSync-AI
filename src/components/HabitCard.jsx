import React from 'react';

export default function HabitCard({ habit }) {
  const { name, streak, completed, total } = habit;

  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
  const statusColor = streak >= 7 ? 'text-green-600' : streak >= 3 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="bg-white shadow rounded-md p-4 border hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className={`text-sm ${statusColor} font-medium`}>Streak: {streak} days</p>

      <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="mt-1 text-xs text-gray-500">{completed} of {total} completed</p>
    </div>
  );
}
