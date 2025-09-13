import React from "react";

export default function Dashboard() {
  const stats = [
    { label: "Academic Records", value: 5 },
    { label: "Activities", value: 3 },
    { label: "Achievements", value: 2 },
    { label: "Portfolio Items", value: 4 },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>📊 Dashboard</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255, 255, 255, 0.15)",
              borderRadius: "12px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              backdropFilter: "blur(12px)",
            }}
          >
            <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>{stat.label}</h3>
            <p style={{ fontSize: "28px", fontWeight: "bold", color: "#ffd369" }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
