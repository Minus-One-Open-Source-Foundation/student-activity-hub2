import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Get user information from localStorage or context
  const getUserInfo = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('Dashboard - User data from localStorage:', parsedUser);
        return parsedUser;
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    console.log('Dashboard - User data from context:', user);
    return user;
  };

  const currentUser = getUserInfo();

  const [personalInfo] = useState({
    name: currentUser?.username || currentUser?.name || "Student",
    dob: currentUser?.dateOfBirth || "Not specified", 
    phone: currentUser?.phone || currentUser?.phoneNumber || "Not specified",
    address: "Not specified",
    email: currentUser?.email || "Not specified",
  });

  const [activities] = useState([
    { id: 1, title: "Hackathon", description: "Participated in SIH Hackathon", category: "Hackathon", status: "Approved" },
    { id: 2, title: "Workshop", description: "Attended AI Workshop", category: "Workshop", status: "Pending" },
    { id: 3, title: "Internship", description: "Summer internship at Infosys", category: "Internship", status: "Approved" },
  ]);

  const hackathonWorkshops = activities.filter(
    (a) => a.category === "Hackathon" || a.category === "Workshop"
  ).length;

  const internships = activities.filter((a) => a.category === "Internship").length;

  const achievements = activities.filter((a) => a.status === "Approved").length;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-content">
        <h1 className="title">Welcome, <span>{personalInfo.name || "Student"}</span></h1>
        <p className="subtitle">Student Dashboard</p>

        {/* Stats Section */}
        <section className="stats-section">
        <div className="stats-grid">
        {/* Personal Info Card */}
          <div
            className="glass-card"
            onClick={() => navigate("/personal-info")}
            style={{ cursor: "pointer" }}
            >
            <h3>Personal Info</h3>
            <p className="description">View and update your personal details.</p>
          </div>

          {/* Co-Curricular Card */}
          <div
            className="glass-card"
            onClick={() => navigate("/activities")}
            style={{ cursor: "pointer" }}
            >
            <h3>Co-Curricular</h3>
            <p className="description">Track your co-curricular activities and achievements.</p>
          </div>

          {/* URMS Card */}
          <div
            className="glass-card"
            onClick={() => navigate("/urms")}
            style={{ cursor: "pointer" }}
            >
            <h3>URMS</h3>
            <p className="description">Manage your role-based resumes for different companies.</p>
          </div>

          <div className="glass-card" onClick={() => navigate("/hackathons-workshops")} style={{ cursor: "pointer" }}>
            <h3>Hackathons & Workshops</h3>
            <p className="description">Explore your participation in hackathons and workshops.</p>
          </div>

          <div className="glass-card" onClick={() => navigate("/internships")} style={{ cursor: "pointer" }}>
            <h3>Internships</h3>
            <p className="description">Manage and track your internship experiences.</p>
          </div>

          <div className="glass-card" onClick={() => navigate("/achievements")} style={{ cursor: "pointer" }}>
            <h3>Approved Achievements</h3>
            <p className="description">Review your approved achievements and milestones.</p>
          </div>
        </div>
      </section>

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
          min-height: 100vh;
          width: 100%;
          height: 100vh;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          color:#111;
          background: url("/src/assets/bg.jpg") no-repeat center center fixed;
          background-size: cover;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          justify-content: flex-start;
        }
        .dashboard-content {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 1.5rem 1rem; /* Further adjusted padding to move content even more upwards */
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .title{ font-size:2rem; margin:0 0 0.3rem; font-weight:700; color:#111; }
        .title span {
          color: #001f3f; /* Updated the color of the welcome message to navy blue */
        }
        .subtitle{ font-size:1rem; margin:0 0 1.5rem; color:rgba(0,0,0,0.7); }

        .stats-section{ width:100%; max-width:920px; margin-bottom:1.5rem; }
        .stats-grid{ display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:1rem; }

        .glass-card{
          background: linear-gradient(145deg, rgba(128, 90, 213, 0.4), rgba(128, 90, 213, 0.2)); /* Light purple glassy gradient */
          color: #fff; /* Ensure text is readable */
          border-radius: 12px;
          padding: 1.3rem;
          text-align: center;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2); /* Subtle shadow for depth */
          backdrop-filter: blur(10px); /* Glassy effect */
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .glass-card:hover{
          transform: translateY(-6px);
          box-shadow: 0 18px 40px rgba(0,0,0,0.25);
        }
        .glass-card h3{ margin:0 0 0.4rem 0; font-size:1.3rem; font-weight:700; color:#facc15; }
        .glass-card h3 {
          color: #001f3f; /* Updated heading color to navy blue */
        }
        .description{ font-size:0.9rem; color:#f4f4f4; margin:0.5rem 0 0; }
        .description {
          color: #000; /* Changed description text to black */
        }

        .download-btn button {
          background: linear-gradient(to right, #ee0979, #ff6a00); /* Updated to match logout button color */
          color: #fff;
          border: none;
          padding: 15px 25px;
          border-radius: 15px;
          cursor: pointer;
          font-weight: 700;
          font-size: 1.1rem;
          box-shadow: 0 10px 30px rgba(238,9,121,0.3);
          transition: transform 0.2s, box-shadow 0.3s;
        }

        .download-btn button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(238,9,121,0.4);
        }

        .download-btn button:active {
          transform: translateY(1px);
          box-shadow: 0 8px 20px rgba(238,9,121,0.2);
        }

        @media (max-width:520px){ .stats-grid{ grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); } }
      `}</style>
      </div>
    </div>
  );
}
