import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [personalInfo] = useState({
    name: "John Doe",
    dob: "2000-01-01",
    phone: "9876543210",
    address: "123, College Street",
  });

  const [activities, setActivities] = useState([
    { id: 1, title: "Hackathon", description: "Participated in SIH Hackathon", category: "Hackathon", status: "Approved" },
    { id: 2, title: "Workshop", description: "Attended AI Workshop", category: "Workshop", status: "Pending" },
    { id: 3, title: "Internship", description: "Summer internship at Infosys", category: "Internship", status: "Approved" },
  ]);

  const [newActivity, setNewActivity] = useState({ title: "", description: "", category: "", file: null });
  const [showForm, setShowForm] = useState(false);

  const hackathonWorkshops = activities.filter(
    (a) => a.category === "Hackathon" || a.category === "Workshop"
  ).length;

  const internships = activities.filter((a) => a.category === "Internship").length;

  const achievements = activities.filter((a) => a.status === "Approved").length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newActivity.title || !newActivity.description || !newActivity.category) {
      alert("Please fill all fields.");
      return;
    }
    const activity = { id: activities.length + 1, ...newActivity, status: "Pending" };
    setActivities([...activities, activity]);
    setNewActivity({ title: "", description: "", category: "", file: null });
    setShowForm(false);
  };

  const handleDownloadPortfolio = () => {
    let content = `Student Portfolio\n\n`;
    content += `Name: ${personalInfo.name}\nDOB: ${personalInfo.dob}\nPhone: ${personalInfo.phone}\nAddress: ${personalInfo.address}\n\n`;
    content += `--- Activities ---\n`;
    activities.forEach((a) => {
      content += `• ${a.title} (${a.category}) - ${a.status}\n   ${a.description}\n\n`;
    });
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${personalInfo.name}_Portfolio.txt`;
    link.click();
  };

  return (
    <div className="dashboard-wrapper">
      <h1 className="title">Welcome, <span>{personalInfo.name}</span></h1>
      <p className="subtitle">Student Dashboard</p>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="glass-card">
            <h3>Academic Records</h3>
            <p className="stat-value">—</p>
          </div>

          <div className="glass-card" onClick={() => navigate("/hackathons-workshops")} style={{ cursor: "pointer" }}>
            <h3>Hackathons & Workshops</h3>
            <p className="stat-value">{hackathonWorkshops}</p>
          </div>

          <div className="glass-card" onClick={() => navigate("/internships")} style={{ cursor: "pointer" }}>
            <h3>Internships</h3>
            <p className="stat-value">{internships}</p>
          </div>

          <div className="glass-card">
            <h3>Approved Achievements</h3>
            <p className="stat-value">{achievements}</p>
          </div>
        </div>
      </section>

      {/* Activity Section */}
      <section className="activity-section">
        <div className="activity-header">
          <h2>Activity Overview</h2>
          <button className="primary-btn" onClick={() => setShowForm(true)}>Add Activity</button>
        </div>

        <div className="activities-list">
          <ul>
            {activities.slice().reverse().map((a) => (
              <li key={a.id} className="activity-item">
                <strong>{a.title}</strong> ({a.category})<br />
                <small>{a.description}</small><br />
                {a.file && <small>📎 {a.file.name}</small>}
                <span className={`status ${a.status.toLowerCase()}`}>{a.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Download Button */}
      <div className="download-btn">
        <button className="primary-btn" onClick={handleDownloadPortfolio}>Download Portfolio</button>
      </div>

      {/* Modal for Adding Activity */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Activity</h3>
            <form onSubmit={handleSubmit}>
              <label>Title:
                <input type="text" value={newActivity.title} onChange={e => setNewActivity({...newActivity, title:e.target.value})} required />
              </label>
              <label>Description:
                <textarea value={newActivity.description} onChange={e => setNewActivity({...newActivity, description:e.target.value})} required />
              </label>
              <label>Category:
                <select value={newActivity.category} onChange={e => setNewActivity({...newActivity, category:e.target.value})} required>
                  <option value="">Select</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Internship">Internship</option>
                  <option value="Certification">Certification</option>
                </select>
              </label>
              <label>Upload Proof:
                <input type="file" onChange={e => setNewActivity({...newActivity, file:e.target.files[0]})} />
              </label>
              <div className="modal-buttons">
                <button type="submit" className="primary-btn">Submit</button>
                <button type="button" className="ghost-btn" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inline Styles */}
      <style>{`
        :root {
          --card-bg: #f4f4f4;
          --input-bg: #fff;
          --accent-1: #ff6a00;
          --accent-2: #ee0979;
        }
        *{box-sizing:border-box}
        body{margin:0}
        .dashboard-wrapper {
         min-height:100vh;
         padding:2rem 1.5rem 1rem;
         font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
         color:#111;
         background: url("/src/assets/bg.jpg") no-repeat center center fixed;
         background-size: cover;
         display:flex;
         flex-direction:column;
         align-items:center;
         text-align:center;
         justify-content:flex-start;
         }

        .title{ font-size:2rem; margin:0 0 0.3rem; font-weight:700; color:#111; }
        .subtitle{ font-size:1rem; margin:0 0 1.5rem; color:rgba(0,0,0,0.7); }

        .stats-section{ width:100%; max-width:920px; margin-bottom:1.5rem; }
        .stats-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:1rem; }

        .glass-card{
          background: linear-gradient(to right, #6366f1, #8b5cf6, #6366f1);
          color: #fff;
          border-radius: 12px;
          padding: 1.3rem;
          text-align:center;
          box-shadow: 0 6px 18px rgba(0,0,0,0.15);
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .glass-card:hover{
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(0,0,0,0.25);
        }
        .glass-card h3{ margin:0 0 0.4rem 0; font-size:1rem; font-weight:700; }
        .stat-value{ font-size:1.8rem; font-weight:700; color:#facc15; margin:0; }

        .activity-section{ width:100%; max-width:920px; text-align:left; margin-bottom:1rem; }
        .activity-header{ display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem; flex-wrap:wrap; }
        .activities-list{ background:var(--card-bg); border-radius:12px; padding:1rem; max-height:250px; overflow-y:auto; box-shadow:0 4px 15px rgba(0,0,0,0.08); }
        .activities-list ul{ list-style:none; padding:0; margin:0; }
        .activity-item{ background:#eaeaea; padding:0.7rem; margin-bottom:0.5rem; border-radius:8px; position:relative; }
        .activity-item small{ color:#333; }

        .status{ position:absolute; top:0.5rem; right:0.6rem; padding:0.15rem 0.6rem; border-radius:6px; font-size:0.75rem; font-weight:600; color:#fff; }
        .status.approved{ background:#16a34a; }
        .status.pending{ background:#f59e0b; }
        .status.rejected{ background:#dc2626; }

        .primary-btn{ background:linear-gradient(90deg,var(--accent-1),var(--accent-2)); border:none; padding:0.65rem 1rem; border-radius:12px; color:#fff; font-weight:700; cursor:pointer; font-size:1rem; box-shadow:0 6px 20px rgba(238,9,121,0.14); transition: transform .12s; }
        .primary-btn:hover{ transform:translateY(-2px); }
        .ghost-btn{ background:transparent; color:#111; border:none; text-decoration:underline; cursor:pointer; font-weight:600; margin-left:0.5rem; }

        .download-btn{ margin-top:0.5rem; text-align:center; margin-bottom:0; } /* removed bottom white space */
        .modal-overlay{ position:fixed; inset:0; background:rgba(0,0,0,0.3); display:flex; justify-content:center; align-items:center; padding:1rem; }
        .modal-content{ background:var(--card-bg); border-radius:16px; padding:1.5rem; width:100%; max-width:380px; text-align:left; }
        .modal-content h3{ margin-top:0; color:#111; }
        .modal-content label{ display:block; margin:0.5rem 0 0.25rem; font-weight:600; color:#111; }
        .modal-content input, .modal-content textarea, .modal-content select{
          width:100%; padding:0.6rem 0.8rem; border-radius:10px; border:1px solid #ccc; background:var(--input-bg); color:#111; margin-bottom:0.7rem; outline:none;
        }
        .modal-content select option { color: #111; background: #fff; }
        .modal-buttons{ display:flex; justify-content:flex-end; gap:0.5rem; margin-top:0.5rem; }

        @media (max-width:520px){ .stats-grid{ grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); } }
      `}</style>
    </div>
  );
}
