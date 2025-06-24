import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { openDB } from "idb";

function AICoach() {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    analyzeHabits();
  }, []);

  const analyzeHabits = async () => {
    const db = await openDB("habitDB", 1);
    const tx = db.transaction("habits", "readonly");
    const store = tx.objectStore("habits");
    const allHabits = await store.getAll();

    if (!allHabits.length) {
      setSummary("Add some habits first to get AI suggestions.");
      return;
    }

    const completedFlags = allHabits.map((h) => (h.completed ? 1 : 0));
    const tensor = tf.tensor1d(completedFlags);

    const total = completedFlags.length;
    const sum = tensor.sum().arraySync();
    const avg = sum / total;

    let message = "";

    if (avg === 1) {
      message = "🔥 Excellent! You're completing all your habits!";
    } else if (avg >= 0.7) {
      message = "💪 You're doing great! Just a few more to perfect it.";
    } else if (avg >= 0.4) {
      message = "⚠️ Keep pushing. Try scheduling or smaller goals.";
    } else {
      message = "😐 Let's work on building consistency. Start small!";
    }

    setSummary(`AI Insight: ${message}`);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>AI Coach</h2>
      <p>This coach analyzes your habits and gives smart suggestions.</p>
      <div style={{ marginTop: "1rem", fontWeight: "bold" }}>{summary}</div>
    </div>
  );
}

export default AICoach;
