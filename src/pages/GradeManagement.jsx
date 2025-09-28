import React from "react";

export default function GradeManagement() {
  return (
    <div className="grade-management">
      <h1>Grade Management</h1>
      <form className="grade-form">
        <input type="text" placeholder="Student Name" />
        <input type="text" placeholder="Grade" />
        <button type="submit">Add Grade</button>
      </form>
      <table className="grade-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>A</td>
            <td>
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <style>{`
        .grade-management {
          padding: 2rem;
          font-family: 'Inter', sans-serif;
        }
        .grade-form {
          margin-bottom: 1rem;
        }
        .grade-form input {
          margin-right: 0.5rem;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .grade-form button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          background-color: #3b82f6;
          color: white;
          cursor: pointer;
        }
        .grade-table {
          width: 100%;
          border-collapse: collapse;
        }
        .grade-table th, .grade-table td {
          border: 1px solid #ddd;
          padding: 0.8rem;
          text-align: left;
        }
        .grade-table th {
          background-color: #f3f4f6;
        }
        .edit-btn, .delete-btn {
          margin-right: 0.5rem;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .edit-btn {
          background-color: #3b82f6;
          color: white;
        }
        .delete-btn {
          background-color: #ef4444;
          color: white;
        }
      `}</style>
    </div>
  );
}