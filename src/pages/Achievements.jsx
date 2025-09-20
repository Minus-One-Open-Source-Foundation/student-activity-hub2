import React, { useState } from "react";
import { FaTrophy, FaTrash } from "react-icons/fa";

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [achievement, setAchievement] = useState("");

  const addAchievement = () => {
    if (achievement.trim()) {
      setAchievements([...achievements, achievement]);
      setAchievement("");
    }
  };

  const deleteAchievement = (index) => {
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  return (
    <div className="achievements-wrapper">
      <h1> Achievements</h1>
      <p>Add and manage your awards, honors, and recognitions.</p>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter Achievement"
          value={achievement}
          onChange={(e) => setAchievement(e.target.value)}
        />
        <button onClick={addAchievement}>Add</button>
      </div>

      <div className="achievements-list">
        {achievements.length === 0 ? (
          <p className="empty-text">No achievements added yet.</p>
        ) : (
          achievements.map((ach, i) => (
            <div key={i} className="achievement-card">
              <div className="ach-info">
                <FaTrophy color="#ff9800" />
                <span>{ach}</span>
              </div>
              <button className="delete-btn" onClick={() => deleteAchievement(i)}>
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>

      <style>{`
        .achievements-wrapper {
          min-height: 100vh;
          padding: 3rem 2rem;
          background: url("/src/assets/bg.jpg") no-repeat center center fixed;
          background-size: cover;
          font-family: 'Inter', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        h1 {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(90deg,#6a11cb,#2575fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        p {
          color: #555;
          margin-bottom: 2rem;
          text-align: center;
        }

        .input-section {
          display: flex;
          gap: 12px;
          margin-bottom: 2rem;
          width: 100%;
          max-width: 500px;
        }

        .input-section input {
          flex: 1;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid #ccc;
          outline: none;
          font-size: 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .input-section button {
          padding: 12px 25px;
          background: linear-gradient(90deg,#6a11cb,#2575fc);
          color: #fff;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .input-section button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        .achievements-list {
          width: 100%;
          max-width: 500px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .achievement-card {
          background: #f9f9f9;
          padding: 12px 16px;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .achievement-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.1);
        }

        .ach-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .delete-btn {
          background: #ff4b5c;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 6px 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.15s, box-shadow 0.15s;
        }

        .delete-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        }

        .empty-text {
          text-align: center;
          color: #999;
          font-style: italic;
        }

        @media (max-width: 600px) {
          .input-section {
            flex-direction: column;
          }

          .input-section button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
