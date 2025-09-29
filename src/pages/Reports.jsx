import React from "react";
import { FaClock } from "react-icons/fa";

export default function PendingRequests() {
  const requests = [
    {
      type: "Hackathon",
      student: "Jane Smith",
      event: "National Hackathon 2025",
      date: "Oct 15, 2025",
      // Placeholder JPG icon
      fileLogo: "/src/assets/jpg-logo.png",
    },
    {
      type: "Workshop",
      student: "Mike Johnson",
      event: "AI & ML",
      date: "Nov 2, 2025",
      fileLogo: "/src/assets/jpg-logo.png",
    },
  ];

  return (
    <div className="pending-requests-wrapper">
      <h2 className="page-title">Pending Requests</h2>

      {requests.map((req, index) => (
        <div className="request-box" key={index}>
          <div className="request-header">
            <h3>{req.type} Request</h3>
            <span className="pending-status">
              <FaClock /> Pending
            </span>
          </div>
          <p><strong>Student:</strong> {req.student}</p>
          <p>
            <strong>{req.type === "Hackathon" ? "Event" : "Workshop"}:</strong> {req.event} | <strong>Date:</strong> {req.date}
          </p>
          <div className="action-buttons">
            <button className="approve-btn">Approve</button>
            <button className="reject-btn">Reject</button>
          </div>
          {/* Rectangle box at bottom right under Pending, shown for every request */}
          <div className="empty-certificate-box" />
          {/* JPG file logo placeholder */}
          <div className="file-icon-container">
            <img src={req.fileLogo} alt="File logo" className="file-logo" />
          </div>
        </div>
      ))}

  <style>{`
        .pending-requests-wrapper {
          min-height: 100vh;
          padding: 2rem;
          font-family: 'Inter', sans-serif;
          background: url("/src/assets/bg.jpg") no-repeat center center fixed;
          background-size: cover;
          color: #111;
        }
        .page-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: #333;
        }
        .request-box {
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          text-align: left;
          position: relative;
          transition: transform 0.2s ease;
        }
        .request-box:hover {
          transform: translateY(-4px);
        }
        .request-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .request-header h3 {
          font-size: 1.25rem;
          margin: 0;
        }
        .pending-status {
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          color: #ff9800;
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .pending-status svg {
          margin-right: 0.3rem;
        }
        .action-buttons {
          margin-top: 1rem;
        }
        .approve-btn {
          background-color: #28a745;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          margin-right: 0.5rem;
          cursor: pointer;
        }
        .reject-btn {
          background-color: #dc3545;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
        }
        .file-icon-container {
          position: absolute;
          right: 1rem;
          bottom: 1rem;
        }
        .file-logo {
          width: 100px;
          height: 100px;
          object-fit: contain;
        }
        .empty-certificate-box {
          width: 180px;
          height: 140px;
          background: #f1f5f9;
          border: 2px dashed #64748b;
          border-radius: 12px;
          position: absolute;
          right: 1rem;
          bottom: 1rem;
          z-index: 2;
        }
        .empty-certificate-box {
          width: 180px;
          height: 140px;
          background: #e0e7ef;
          border: 2px dashed #64748b;
          border-radius: 12px;
          position: absolute;
          right: 1rem;
          bottom: 1rem;
          z-index: 1;
        }

      `}</style>
    </div>
  );
}
