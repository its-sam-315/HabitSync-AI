import React, { useState } from "react";

function AICoach() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = () => {
    // Simulated AI response – later we’ll replace with real logic
    if (!input.trim()) {
      setResponse("Please enter a message for the AI Coach.");
    } else {
      setResponse(`🤖 AI Coach says: Great job staying consistent with "${input}"! Keep it up!`);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>AI Habit Coach</h2>
      <p>Ask your AI coach for help, tips, or motivation.</p>

      <input
        type="text"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "60%", padding: "0.5rem", marginRight: "1rem" }}
      />
      <button onClick={handleAsk} style={{ padding: "0.5rem 1rem" }}>
        Ask
      </button>

      {response && (
        <div style={{ marginTop: "1rem", background: "#f5f5f5", padding: "1rem", borderRadius: "5px" }}>
          {response}
        </div>
      )}
    </div>
  );
}

export default AICoach;
