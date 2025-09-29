import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  // Mock fetch (replace with API call later)
  useEffect(() => {
    setRequests([
      {
        id: 1,
        type: "Internship",
        student: "John Doe",
        details: "Company: TechCorp | Duration: 6 months",
      },
      {
        id: 2,
        type: "Hackathon",
        student: "Jane Smith",
        details: "Event: National Hackathon 2025 | Date: Oct 15, 2025",
      },
      {
        id: 3,
        type: "Workshop",
        student: "Mike Johnson",
        details: "Workshop: AI & ML | Date: Nov 2, 2025",
      },
    ]);
  }, []);

  const handleAction = (id, action) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
    alert(`Request ${action} successfully!`);
  };

  return (
    <div className="faculty-dashboard">
      {/* Header */}
      <header>
        <h1>Faculty Dashboard</h1>
        <p>
          Signed in as: <span className="faculty-email">faculty@test.com</span>
        </p>
      </header>

      {/* Dashboard Navigation */}
      <div className="top-cards">
        <div className="card" onClick={() => navigate("/faculty/students")}>
          <h3>Student Management</h3>
          <p>Manage student profiles and academic records</p>
        </div>
        <div className="card" onClick={() => navigate("/faculty/grades")}>
          <h3>Grade Management</h3>
          <p>Review and update student performance</p>
        </div>
        <div className="card" onClick={() => navigate("/faculty/reports")}>
          <h3>Pending Requests</h3>
          <p>Manage all pending student requests efficiently.</p>
        </div>
      </div>

      {/* Requests Section */}
      <div className="dashboard-wrapper">
        <style>{`
          .faculty-dashboard {
            height: 100vh;
            overflow: hidden;
            padding: 2rem;
            font-family: 'Inter', sans-serif;
            background: url("/src/assets/bg.jpg") no-repeat center center fixed;
            background-size: cover;
            position: relative;
          }

          /* Overlay */
          .faculty-dashboard::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(6px);
            z-index: -1;
          }

          /* Header */
          header {
            text-align: center;
            margin-bottom: 2.5rem;
          }
          header h1 {
            font-size: 2.2rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 0.5rem;
          }
          header p {
            color: #334155;
          }
          .faculty-email {
            font-weight: 600;
            color: #0f172a;
          }

          /* Navigation Cards */
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
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(20px);
            color: #1e293b;
            padding: 1.8rem;
            border-radius: 18px;
            text-align: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
            cursor: pointer;
          }
          .card:hover {
            transform: translateY(-6px) scale(1.02);
            box-shadow: 0 16px 60px rgba(0, 0, 0, 0.25);
          }
          .card h3 {
            font-size: 1.3rem;
            margin-bottom: 0.8rem;
          }
          .card p {
            font-size: 0.95rem;
            color: #374151;
          }

          /* Requests Section */
          .dashboard-wrapper {
            height: 100vh;
            overflow: hidden;
            padding: 2rem;
            font-family: 'Inter', sans-serif;
            background: url("/src/assets/bg.jpg") no-repeat center center fixed;
            background-size: cover;
            color: #111;
          }

          @media (max-width: 768px) {
            .card {
              padding: 1.2rem;
            }
            header h1 {
              font-size: 1.6rem;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
