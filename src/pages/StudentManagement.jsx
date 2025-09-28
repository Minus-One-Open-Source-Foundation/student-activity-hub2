import React from "react";

export default function StudentManagement() {
  return (
    <div className="student-management">
      <h1>Student Management</h1>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>12345</td>
            <td>
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>67890</td>
            <td>
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <style>{`
        .student-management {
          padding: 2rem;
          font-family: 'Inter', sans-serif;
        }
        .student-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }
        .student-table th, .student-table td {
          border: 1px solid #ddd;
          padding: 0.8rem;
          text-align: left;
        }
        .student-table th {
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