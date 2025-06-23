import React from 'react';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <h2 className="text-4xl font-bold text-indigo-600">Welcome to HabitSync AI</h2>
      </main>
    </div>
  );
}

export default App;
