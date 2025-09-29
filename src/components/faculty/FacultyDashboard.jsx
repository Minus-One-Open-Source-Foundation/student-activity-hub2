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
        <div className="stats-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem"
        }}>
          <div className="glass-card" style={{
            background: "linear-gradient(to right, #4e54c8, #8f94fb, #4e54c8)",
            color: "#fff",
            borderRadius: "8px",
            padding: "1rem",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            transition: "transform 0.18s, box-shadow 0.18s",
            width: "200px",
            height: "200px"
          }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.8rem" }}>Search</h3> {/* Increased font size */}
            <input
              type="text"
              placeholder="Student or Title"
              value={filters.q}
              onChange={e => setFilters(f => ({ ...f, q: e.target.value }))}
              className="input"
              style={{
                width: "100%",
                padding: "0.6rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                background: "#fff",
                color: "#111",
                marginBottom: "0.6rem",
                outline: "none",
                fontSize: "1.2rem", // Increased font size
                fontFamily: "inherit",
                boxShadow: "0 2px 6px rgba(78,84,200,0.1)",
                transition: "border-color 0.18s"
              }}
            />
          </div>
          <div className="glass-card" style={{
            background: "linear-gradient(to right, #4e54c8, #8f94fb, #4e54c8)",
            color: "#fff",
            borderRadius: "8px",
            padding: "1rem",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            transition: "transform 0.18s, box-shadow 0.18s",
            width: "200px",
            height: "200px"
          }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.8rem" }}>Type</h3> {/* Increased font size */}
            <select
              value={filters.type}
              onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
              className="custom-select"
              style={{
                width: "100%",
                padding: "0.6rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                background: "#fff",
                color: "#111",
                marginBottom: "0.6rem",
                outline: "none",
                fontSize: "1.2rem", // Increased font size
                fontFamily: "inherit",
                boxShadow: "0 2px 6px rgba(78,84,200,0.1)",
                transition: "border-color 0.18s"
              }}
            >
              <option value="all">All Types</option>
              <option value="academic">Academic</option>
              <option value="co-curricular">Co-curricular</option>
              <option value="extracurricular">Extracurricular</option>
            </select>
          </div>
          <div className="glass-card" style={{
            background: "linear-gradient(to right, #4e54c8, #8f94fb, #4e54c8)",
            color: "#fff",
            borderRadius: "8px",
            padding: "1rem",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            transition: "transform 0.18s, box-shadow 0.18s",
            width: "200px",
            height: "200px"
          }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.8rem" }}>Department</h3> {/* Increased font size */}
            <select
              value={filters.dept}
              onChange={e => setFilters(f => ({ ...f, dept: e.target.value }))}
              className="custom-select"
              style={{
                width: "100%",
                padding: "0.6rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                background: "#fff",
                color: "#111",
                marginBottom: "0.6rem",
                outline: "none",
                fontSize: "1.2rem", // Increased font size
                fontFamily: "inherit",
                boxShadow: "0 2px 6px rgba(78,84,200,0.1)",
                transition: "border-color 0.18s"
              }}
            >
              <option value="all">All Departments</option>
              <option value="cse">CSE</option>
              <option value="ece">ECE</option>
            </select>
          </div>
          <div className="glass-card" style={{
            background: "linear-gradient(to right, #4e54c8, #8f94fb, #4e54c8)",
            color: "#fff",
            borderRadius: "8px",
            padding: "1rem",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            transition: "transform 0.18s, box-shadow 0.18s",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "200px",
            height: "200px"
          }}>
            <button className="primary-btn" onClick={fetchPending} style={{
              background: "linear-gradient(90deg, #4e54c8, #8f94fb)",
              border: "none",
              padding: "0.6rem 1rem",
              borderRadius: "8px",
              color: "#fff",
              fontWeight: "700",
              cursor: "pointer",
              fontSize: "1.2rem", // Increased font size
              boxShadow: "0 4px 10px rgba(78,84,200,0.15)",
              transition: "transform .12s"
            }}>Refresh</button>
            <button className="ghost-btn" style={{
              marginTop: "0.6rem",
              background: "transparent",
              color: "#4e54c8",
              border: "none",
              textDecoration: "underline",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "1.2rem" // Increased font size
            }} onClick={() => { setFilters({ q: "", type: "all", dept: "all" }); fetchPending(); }}>Clear</button>
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

      {/* Styles moved to inline <style> block for consistency */}
      <style>{`
        .faculty-dashboard {
          max-width: 1280px;
          margin: 0 auto;
          padding: 2.5rem;
          text-align: center;
        }

        .faculty-dashboard h4 {
          margin-bottom: 1.5rem;
          color: #1976d2;
        }

        .faculty-approvals-grid {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          align-items: center;
        }

        .approval-card {
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 2rem;
          width: 100%;
          max-width: 600px;
          text-align: left;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }

        .approval-card:hover {
          box-shadow: 0 6px 20px rgba(0,0,0,0.06);
          transform: translateY(-3px);
        }

        .approval-card .title {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 0.3rem;
          color: #111827;
        }

        .approval-card .student-line {
          font-size: 1rem;
          color: #555;
          margin-bottom: 0.8rem;
        }

        .approval-card .desc {
          font-size: 1.05rem;
          color: #333;
          margin-bottom: 0.8rem;
          white-space: pre-wrap;
        }

        .approval-card .actions {
          display: flex;
          gap: 0.8rem;
          margin-top: 1rem;
        }

        .approval-card .actions button {
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          border: none;
        }

        .approval-card .actions .approve {
          background-color: #1976d2;
          color: #fff;
        }

        .approval-card .actions .reject {
          background-color: #e5e7eb;
          color: #111827;
        }

        .stats-section {
          width: 100%;
          max-width: 920px;
          margin: 0 auto 2.5rem auto;
          text-align: left;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
          gap: 1.5rem;
          align-items: center;
        }

        .activity-section {
          width: 100%;
          max-width: 920px;
          margin: 0 auto;
          text-align: left;
        }

        .activities-list {
          background: #f4f4f4;
          border-radius: 12px;
          padding: 1.5rem;
          max-height: 360px;
          overflow-y: auto;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
        }

        .activity-item {
          background: #eaeaea;
          padding: 1rem;
          margin-bottom: 0.6rem;
          border-radius: 8px;
          position: relative;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 1.5rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .glass-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        }

        .glass-card h3 {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          color: #111;
        }

        .glass-card .input,
        .glass-card .custom-select {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          margin-top: 0.5rem;
          font-size: 1rem;
        }

        .glass-card .primary-btn,
        .glass-card .ghost-btn {
          width: 100%;
          padding: 0.8rem;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          border: none;
          margin-top: 1rem;
        }

        .glass-card .primary-btn {
          background-color: #1976d2;
          color: #fff;
        }

        .glass-card .ghost-btn {
          background-color: #e5e7eb;
          color: #111827;
        }
      `}</style>
    </div>
  );
}