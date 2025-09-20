import React, { useState } from "react";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState("");

  const addActivity = () => {
    if (activity.trim()) {
      setActivities([{ name: activity, id: Date.now() }, ...activities]);
      setActivity("");
    }
  };

  const removeActivity = (id) => {
    setActivities(activities.filter((act) => act.id !== id));
  };

  return (
    <div className="activities-wrapper">
      <header>
        <h1>Extra-Curricular Activities</h1>
        <p>Add and track all your activities</p>
      </header>

      <section className="form-section">
        <input
          type="text"
          placeholder="Enter activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        <button onClick={addActivity}>Add Activity</button>
      </section>

      <section className="cards-container">
        {activities.length === 0 ? (
          <div className="empty">No activities added yet.</div>
        ) : (
          activities.map((act) => (
            <div key={act.id} className="activity-card">
              <span>{act.name}</span>
              <button onClick={() => removeActivity(act.id)}>❌</button>
            </div>
          ))
        )}
      </section>

      <style>{`
        .activities-wrapper {
          min-height: 100vh;
          padding: 3rem 2rem;
          background: url("/src/assets/bg.jpg") no-repeat center center fixed;
          background-size: cover;
          font-family: 'Inter', sans-serif;
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

        .form-section {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .form-section input {
          flex: 1;
          min-width: 220px;
          padding: 0.8rem 1rem;
          border-radius: 12px;
          border: 1px solid #ccc;
          outline: none;
          font-size: 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .form-section input:focus {
          box-shadow: 0 0 10px rgba(100, 100, 255, 0.2);
        }

        .form-section button {
          padding: 0.8rem 1.5rem;
          background: linear-gradient(90deg,#6a11cb,#2575fc);
          border: none;
          color: #fff;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.2s;
        }

        .form-section button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        .cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }

        .activity-card {
          background: #f9f9f9;
          border-radius: 16px;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          transition: transform 0.25s, box-shadow 0.25s;
        }

        .activity-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
        }

        .activity-card button {
          background: none;
          border: none;
          color: #ff4b5c;
          cursor: pointer;
          font-size: 1.1rem;
        }

        .empty {
          text-align: center;
          font-size: 1rem;
          color: #999;
          grid-column: 1/-1;
        }

        @media(max-width:600px){
          .form-section { flex-direction: column; gap: 0.8rem; }
        }
      `}</style>
    </div>
  );
}
