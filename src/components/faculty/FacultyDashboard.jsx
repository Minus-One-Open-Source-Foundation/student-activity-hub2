import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import ApprovalCard from "./ApprovalCard";

export default function FacultyDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ q: "", type: "all", dept: "all" });

  // Default demo activities
  const defaultActivities = [
    {
      id: 1,
      title: "Hackathon",
      description: "Participated in SIH Hackathon",
      category: "Competition",
      status: "Pending",
      student: "John Doe",
      dept: "cse"
    },
    {
      id: 2,
      title: "Workshop",
      description: "Attended AI Workshop",
      category: "Workshop",
      status: "Pending",
      student: "Jane Smith",
      dept: "ece"
    },
    {
      id: 3,
      title: "Paper Presentation",
      description: "Presented paper at National Conference",
      category: "Academic",
      status: "Pending",
      student: "Rahul Kumar",
      dept: "cse"
    },
    {
      id: 4,
      title: "Sports Meet",
      description: "Participated in Intercollege Sports Meet",
      category: "Extracurricular",
      status: "Pending",
      student: "Priya Singh",
      dept: "ece"
    }
  ];

  const [activities, setActivities] = useState(defaultActivities);

  // Only use demo data, no API
  function fetchPending() {
    setLoading(true);
    setError("");
    setActivities(defaultActivities);
    setLoading(false);
  }

  useEffect(() => {
    fetchPending();
    // eslint-disable-next-line
  }, []);

  function removeActivityFromList(id) {
    setActivities((prev) => prev.filter((a) => (a.id ?? a._id) !== id));
  }

  return (
    <div className="dashboard-wrapper faculty-dashboard">
      <h1 className="title">
        Faculty Approval Dashboard
      </h1>
      <p className="subtitle">
        Signed in as: <span>{user?.email}</span>
      </p>

      {/* Controls Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="glass-card">
            <h3>Search</h3>
            <input
              type="text"
              placeholder="Student or Title"
              value={filters.q}
              onChange={e => setFilters(f => ({ ...f, q: e.target.value }))}
              className="input"
            />
          </div>
          <div className="glass-card">
            <h3>Type</h3>
            <select
              value={filters.type}
              onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
              className="custom-select"
            >
              <option value="all">All Types</option>
              <option value="academic">Academic</option>
              <option value="co-curricular">Co-curricular</option>
              <option value="extracurricular">Extracurricular</option>
            </select>
          </div>
          <div className="glass-card">
            <h3>Department</h3>
            <select
              value={filters.dept}
              onChange={e => setFilters(f => ({ ...f, dept: e.target.value }))}
              className="custom-select"
            >
              <option value="all">All Departments</option>
              <option value="cse">CSE</option>
              <option value="ece">ECE</option>
            </select>
          </div>
          <div className="glass-card" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <button className="primary-btn" onClick={fetchPending}>Refresh</button>
            <button className="ghost-btn" style={{marginTop:"0.5rem"}} onClick={() => { setFilters({ q: "", type: "all", dept: "all" }); fetchPending(); }}>Clear</button>
          </div>
        </div>
      </section>

      {/* Approvals Section */}
      <section className="activity-section">
        <div className="activity-header">
          <h2>Pending Activities</h2>
        </div>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
            <span>Loading...</span>
          </div>
        ) : activities.length === 0 ? (
          <div style={{ marginTop: "1rem", color: "#6366f1", fontWeight: 600 }}>No pending activities.</div>
        ) : (
          <div className="activities-list">
            <ul>
              {activities.map((act) => {
                const id = act.id ?? act._id;
                return (
                  <li key={id} className="activity-item">
                    <ApprovalCard
                      activity={act}
                      onApprove={() => removeActivityFromList(id)}
                      onReject={() => removeActivityFromList(id)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </section>

      {/* Styles */}
      <style>{`
        :root {
          --card-bg: #f4f4f4;
          --input-bg: #fff;
          --accent-1: #4e54c8;
          --accent-2: #8f94fb;
        }
        .faculty-dashboard .title {
          color: #4e54c8;
        }
        .faculty-dashboard .subtitle {
          color: #6366f1;
        }
        .glass-card {
          background: linear-gradient(to right, #4e54c8, #8f94fb, #4e54c8);
          color: #fff;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          box-shadow: 0 6px 18px rgba(0,0,0,0.15);
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .glass-card h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
          font-weight: 700;
        }
        .input,
        .custom-select {
          width: 100%;
          padding: 0.6rem 0.8rem;
          border-radius: 10px;
          border: 1px solid #ccc;
          background: var(--input-bg);
          color: #111;
          margin-bottom: 0.8rem;
          outline: none;
          font-size: 1rem;
          font-family: inherit;
          box-shadow: 0 2px 8px rgba(78,84,200,0.07);
          transition: border-color 0.18s;
        }
        .custom-select:focus {
          border-color: #4e54c8;
        }
        .primary-btn {
          background: linear-gradient(90deg,var(--accent-1),var(--accent-2));
          border: none;
          padding: 0.75rem 1.2rem;
          border-radius: 12px;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
          font-size: 1rem;
          box-shadow: 0 6px 20px rgba(78,84,200,0.14);
          transition: transform .12s;
        }
        .primary-btn:hover {
          transform: translateY(-2px);
        }
        .ghost-btn {
          background: transparent;
          color: #4e54c8;
          border: none;
          text-decoration: underline;
          cursor: pointer;
          font-weight: 600;
        }
        .stats-section {
          width: 100%;
          max-width: 920px;
          margin-bottom: 2rem;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
          gap: 1rem;
        }
        .activity-section {
          width: 100%;
          max-width: 920px;
          text-align: left;
        }
        .activity-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.8rem;
          flex-wrap: wrap;
        }
        .activities-list {
          background: var(--card-bg);
          border-radius: 12px;
          padding: 1rem;
          max-height: 360px;
          overflow-y: auto;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }
        .activities-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .activity-item {
          background: #eaeaea;
          padding: 0.8rem;
          margin-bottom: 0.6rem;
          border-radius: 8px;
          position: relative;
        }
        @media (max-width:520px){
          .stats-grid{ grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); }
        }
      `}</style>
    </div>
  );
}