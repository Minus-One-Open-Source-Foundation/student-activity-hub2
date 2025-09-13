import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Analytics() {
  const data = [
    { name: "Academic Records", value: 5 },
    { name: "Activities", value: 3 },
    { name: "Achievements", value: 2 },
    { name: "Portfolio Items", value: 4 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg, #ffecd2, #fcb69f)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>📈 Analytics</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
}
