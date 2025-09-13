import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState("");
  const navigate = useNavigate();

  const addActivity = () => {
    if (activity.trim()) {
      setActivities([...activities, activity]);
      setActivity("");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg, #8360c3, #2ebf91)",
        fontFamily: "Arial, sans-serif",
        color: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.1)",
          padding: "20px",
          borderRadius: "12px",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>🎯 Extra-Curricular Activities</h2>

        <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
          <input
            placeholder="Enter activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
            }}
          />
          <button onClick={addActivity} style={btnStyle}>
            Add
          </button>
        </div>

        <ul>
          {activities.map((act, i) => (
            <li key={i} style={{ marginBottom: "8px" }}>
              ✅ {act}
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", justifyContent: "space-around", marginTop: "20px" }}>
          <button onClick={() => navigate("/")} style={btnStyle}>
            Home
          </button>
          <button onClick={() => navigate("/portfolio")} style={btnStyle}>
            Portfolio
          </button>
          <button onClick={() => navigate("/login")} style={btnStyle}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "10px 20px",
  background: "#ffd369",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};
