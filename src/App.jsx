import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Analytics from "./Analytics";
import AICoach from "./AICoach";

function Home() {
  return (
    <div>
      <h2>Welcome to HabitSync AI</h2>
      <p>This is your home page.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
        <Link to="/analytics" style={{ marginRight: "1rem" }}>Analytics</Link>
        <Link to="/aicoach">AI Coach</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/aicoach" element={<AICoach />} />
      </Routes>
    </Router>
  );
}

export default App;
