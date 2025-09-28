import React from "react";

export default function Reports() {
  return (
    <div className="reports">
      <h1>Reports</h1>
      <form className="report-form">
        <input type="text" placeholder="Report Title" />
        <button type="submit">Generate Report</button>
      </form>
      <div className="report-list">
        <div className="report-item">
          <h3>Student Progress Report</h3>
          <button className="view-btn">View</button>
        </div>
        <div className="report-item">
          <h3>Attendance Report</h3>
          <button className="view-btn">View</button>
        </div>
      </div>

      <style>{`
        .reports {
          padding: 2rem;
          font-family: 'Inter', sans-serif;
        }
        .report-form {
          margin-bottom: 1rem;
        }
        .report-form input {
          margin-right: 0.5rem;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .report-form button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          background-color: #3b82f6;
          color: white;
          cursor: pointer;
        }
        .report-list {
          margin-top: 1rem;
        }
        .report-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }
        .view-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          background-color: #3b82f6;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}