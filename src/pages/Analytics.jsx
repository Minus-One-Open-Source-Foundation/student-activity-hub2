import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Analytics() {
  const data = [
    { name: "Academic Records", value: 5 },
    { name: "Activities", value: 3 },
    { name: "Achievements", value: 2 },
    { name: "Portfolio Items", value: 4 },
  ];

  const total = data.reduce((acc, cur) => acc + cur.value, 0);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="analytics-wrapper">
      <header>
        <h1>Analytics Dashboard</h1>
        <p>Visual summary of all student activities and achievements</p>
      </header>

      <div className="chart-card">
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, value }) =>
              `${((value / total) * 100).toFixed(1)}%`
            }
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) =>
              [`${value} (${((value / total) * 100).toFixed(1)}%)`, name]
            }
          />
          <Legend />
        </PieChart>
      </div>

      <style>{`
        .analytics-wrapper {
          min-height: 100vh;
          padding: 3rem 2rem;
          background: url("/src/assets/bg.jpg") no-repeat center center fixed;
          background-size: cover;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #333;
        }

        header {
          text-align: center;
          margin-bottom: 2rem;
        }

        header h1 {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(90deg,#6a11cb,#2575fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        header p {
          font-size: 1rem;
          color: #555;
        }

        .chart-card {
          background: #f9f9f9;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.12);
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.25s, box-shadow 0.25s;
        }

        .chart-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.15);
        }

        @media (max-width: 600px) {
          .chart-card {
            width: 100%;
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}