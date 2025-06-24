import React from "react";

function Analytics() {
  // Example static data, later you can replace with real user habit data
  const habitData = [
    { habit: "Exercise", completed: 20, missed: 5 },
    { habit: "Reading", completed: 15, missed: 10 },
    { habit: "Meditation", completed: 25, missed: 0 },
  ];

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Habit Analytics</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Habit</th>
            <th>Completed Days</th>
            <th>Missed Days</th>
          </tr>
        </thead>
        <tbody>
          {habitData.map(({ habit, completed, missed }) => (
            <tr key={habit}>
              <td>{habit}</td>
              <td>{completed}</td>
              <td>{missed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Analytics;
