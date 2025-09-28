import React, { useState } from "react";

export default function StudentManagement() {
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", roll: "12345", course: "CSE", year: "3rd", status: "Active" },
    { id: 2, name: "Jane Smith", roll: "67890", course: "ECE", year: "2nd", status: "Inactive" },
    { id: 3, name: "Mike Johnson", roll: "54321", course: "MECH", year: "4th", status: "Active" },
  ]);

  const [search, setSearch] = useState("");
  const [viewStudent, setViewStudent] = useState(null); // For modal

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const handleView = (student) => {
    setViewStudent(student); // Open modal with student details
  };

  const handleCloseModal = () => {
    setViewStudent(null); // Close modal
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.roll.includes(search)
  );

  return (
    <div className="student-management">
      <header>
        <h1>Student Management</h1>
        <p>Manage student details, academic status, and records</p>
      </header>

      {/* Top Bar */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search by name or roll number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Student Table */}
      <div className="table-container">
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Course</th>
              <th>Year</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.roll}</td>
                <td>{student.course}</td>
                <td>{student.year}</td>
                <td>
                  <span
                    className={`status-badge ${
                      student.status === "Active" ? "active" : "inactive"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => handleView(student)}
                  >
                    View
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="6" className="no-data">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for viewing student */}
      {viewStudent && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Student Details</h2>
            <p><strong>Name:</strong> {viewStudent.name}</p>
            <p><strong>Roll Number:</strong> {viewStudent.roll}</p>
            <p><strong>Course:</strong> {viewStudent.course}</p>
            <p><strong>Year:</strong> {viewStudent.year}</p>
            <p><strong>Status:</strong> {viewStudent.status}</p>
            <button className="close-btn" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}

      <style>{`
        .student-management {
          padding: 2rem;
          font-family: 'Inter', sans-serif;
          max-width: 1200px;
          margin: auto;
        }

        header {
          text-align: center;
          margin-bottom: 2rem;
        }
        header h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.3rem;
        }
        header p {
          color: #475569;
        }

        .top-bar {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .top-bar input {
          flex: 1;
          min-width: 250px;
          padding: 0.7rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          outline: none;
          font-size: 0.95rem;
        }

        .table-container {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          overflow-x: auto;
        }
        .student-table {
          width: 100%;
          border-collapse: collapse;
        }
        .student-table th, .student-table td {
          padding: 0.9rem;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        .student-table th {
          background: #f1f5f9;
          font-weight: 600;
          color: #1e293b;
        }
        .student-table tr:hover {
          background: #f9fafb;
        }

        .status-badge {
          padding: 0.3rem 0.7rem;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .status-badge.active {
          background: #dcfce7;
          color: #15803d;
        }
        .status-badge.inactive {
          background: #fee2e2;
          color: #b91c1c;
        }

        .view-btn, .delete-btn {
          margin-right: 0.4rem;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          transition: background 0.3s ease, transform 0.2s ease;
        }
        .view-btn {
          background-color: #3b82f6;
          color: white;
        }
        .view-btn:hover {
          background-color: #2563eb;
          transform: scale(1.05);
        }
        .delete-btn {
          background-color: #ef4444;
          color: white;
        }
        .delete-btn:hover {
          background-color: #dc2626;
          transform: scale(1.05);
        }

        .no-data {
          text-align: center;
          padding: 1rem;
          color: #6b7280;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          min-width: 300px;
          max-width: 500px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
          text-align: left;
        }
        .modal-content h2 {
          margin-top: 0;
          margin-bottom: 1rem;
        }
        .modal-content p {
          margin: 0.5rem 0;
        }
        .close-btn {
          margin-top: 1rem;
          background: #ef4444;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
        }
        .close-btn:hover {
          background: #dc2626;
        }

        @media (max-width: 768px) {
          header h1 {
            font-size: 1.6rem;
          }
          .student-table th, .student-table td {
            font-size: 0.85rem;
          }
          .view-btn, .delete-btn {
            padding: 0.5rem 0.8rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}
