import React from 'react';
import Header from './components/Header';
import HabitManager from './components/HabitManager';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <HabitManager />
      </main>
    </div>
  );
}

export default App;
