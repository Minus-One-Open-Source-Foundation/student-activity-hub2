import React from "react";
import { useNavigate } from "react-router-dom";

export default function FacultyDashboard() {
  const navigate = useNavigate();

  return (
    <div className="faculty-dashboard">
      {/* Header */}
      <header>
        <h1>Faculty Dashboard</h1>
        <p>Signed in as: faculty@test.com</p>
      </header>

      {/* Dashboard cards */}
      <div className="top-cards">
        <div className="card" onClick={() => navigate("/faculty/students")}> {/* Navigate to Student Management */}
          <h3>Student Management</h3>
          <p>Manage student profiles and academic records</p>
        </div>
        <div className="card" onClick={() => navigate("/faculty/grades")}> {/* Navigate to Grade Management */}
          <h3>Grade Management</h3>
          <p>Review and update student grades and academic performance</p>
        </div>
        <div className="card" onClick={() => navigate("/faculty/reports")}> {/* Navigate to Reports */}
          <h3>Reports</h3>
          <p>Generate detailed reports on student progress and activities</p>
        </div>
      </div>

      {/* Pending Activities section */}
      <section className="pending-section">
        <h2>Pending Activities</h2>
        <div className="activity-card">
          <h3>Internship Approval</h3>
          <p>Student: John Doe</p>
          <p>Company: TechCorp</p>
          <p>Duration: 6 months</p>
          <div className="action-buttons">
            <button className="approve">APPROVE</button>
            <button className="reject">REJECT</button>
          </div>
        </div>
        <div className="activity-card">
          <h3>Hackathon Participation</h3>
          <p>Student: Jane Smith</p>
          <p>Event: National Hackathon 2025</p>
          <p>Date: October 15, 2025</p>
          <div className="action-buttons">
            <button className="approve">APPROVE</button>
            <button className="reject">REJECT</button>
          </div>
        </div>
      </section>

      <style>{`
        .faculty-dashboard {
          min-height: 100vh;
          padding: 2rem;
          font-family: 'Inter', sans-serif;
          background: url("/src/assets/bg.jpg") no-repeat center center fixed;
          background-size: cover;
        }

        /* Header */
        header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }
        header p {
          color: #475569;
        }

        /* Top Cards */
        .top-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
        }
        .card {
          background: rgba(255, 255, 255, 0.6); /* Increased opacity for better visibility */
          backdrop-filter: blur(15px);
          color: #1e293b; /* Darker text color for contrast */
          padding: 1.5rem;
          border-radius: 16px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.25); /* Enhanced shadow for better visibility */
          cursor: pointer;
        }
        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 60px rgba(0, 0, 0, 0.35); /* Stronger shadow on hover */
        }
        .card h3 {
          font-size: 1.2rem;
          margin-bottom: 0.8rem;
        }
        .card p {
          font-size: 0.95rem;
          color: #374151; /* Darker color for better visibility */
        }

        /* Pending Activities */
        .pending-section {
          max-width: 800px;
          margin: 0 auto;
          max-height: 400px; /* Limit height to enable scrolling */
          overflow-y: auto; /* Add vertical scrollbar */
          padding-right: 10px; /* Space for scrollbar */
        }
        .pending-section::-webkit-scrollbar {
          width: 8px;
        }
        .pending-section::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .pending-section::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .pending-section h2 {
          font-size: 1.4rem;
          margin-bottom: 1rem;
          color: #1e293b;
        }
        .activity-card {
          background: rgba(255, 255, 255, 0.8);
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          margin-bottom: 1.5rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .activity-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
        }
        .activity-card h3 {
          margin: 0;
          font-size: 1.2rem;
          color: #1e293b;
        }
        .activity-card p {
          color: #475569;
          margin: 0.5rem 0;
        }
        .action-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        .approve {
          background: #10b981;
          border: none;
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
        }
        .approve:hover {
          background: #059669;
        }
        .reject {
          background: #ef4444;
          border: none;
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
        }
        .reject:hover {
          background: #dc2626;
        }

        @media (max-width: 768px) {
          .card {
            padding: 1rem;
          }
          header h1 {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </div>
  );
}
