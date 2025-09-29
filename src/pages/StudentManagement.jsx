import React, { useState } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";

export default function StudentManagement() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      dob: "2003-05-12",
      phone: "9876543210",
      email: "john@example.com",
      department: "CSE",
      regno: "CSE2023001",
      status: "Active",
      profilePic: "/src/assets/default-profile.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      dob: "2004-02-20",
      phone: "9123456780",
      email: "jane@example.com",
      department: "ECE",
      regno: "ECE2023002",
      status: "Inactive",
      profilePic: "/src/assets/default-profile.jpg",
    },
    {
      id: 3,
      name: "Mike Johnson",
      dob: "2002-10-10",
      phone: "9001234567",
      email: "mike@example.com",
      department: "MECH",
      regno: "MECH2023003",
      status: "Active",
      profilePic: "/src/assets/default-profile.jpg",
    },
  ]);

  const [search, setSearch] = useState("");
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showReasonPopup, setShowReasonPopup] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.regno.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setShowConfirmPopup(true);
  };

  const confirmDelete = () => {
    setShowConfirmPopup(false);
    setShowReasonPopup(true);
  };

  const submitReason = () => {
    if (deleteReason.trim() === "") {
      alert("Please enter a reason for deletion.");
      return;
    }
    setStudents(students.filter((s) => s.id !== studentToDelete.id));
    console.log(
      `Student ${studentToDelete.name} deleted. Reason: ${deleteReason}`
    );
    setDeleteReason("");
    setStudentToDelete(null);
    setShowReasonPopup(false);
  };

  return (
    <div className="student-management">
      <header>
        <h1>Student Management</h1>
        <p>Manage student details, profiles, and records</p>
      </header>

      {/* Search Bar */}
      <div className="top-bar">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or register number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Student Grid */}
      <div className="student-grid-container">
        <div className="student-grid">
          {filteredStudents.map((student) => (
            <div className="student-card" key={student.id}>
              {/* Delete Button */}
              <button
                className="delete-button"
                onClick={() => handleDeleteClick(student)}
              >
                <FaTrash />
              </button>

              {/* Profile Photo */}
              <div className="profile-section">
                <div className="profile-photo">
                  <img src={student.profilePic} alt={student.name} />
                </div>
              </div>

              {/* Student Info */}
              <div className="student-info">
                <h2>{student.name}</h2>
                <p>
                  <strong>Date of Birth:</strong> {student.dob}
                </p>
                <p>
                  <strong>Register No:</strong> {student.regno}
                </p>
                <p>
                  <strong>Department:</strong> {student.department}
                </p>
                <p>
                  <strong>Email:</strong> {student.email}
                </p>
                <p>
                  <strong>Phone:</strong> {student.phone}
                </p>
                <span
                  className={`status-badge ${
                    student.status === "Active" ? "active" : "inactive"
                  }`}
                >
                  {student.status}
                </span>
              </div>
            </div>
          ))}

          {filteredStudents.length === 0 && (
            <p className="no-data">No students found</p>
          )}
        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirmPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Confirm Deletion</h3>
            <p>
              Are you sure you want to delete{" "}
              <strong>{studentToDelete?.name}</strong>?
            </p>
            <div className="popup-actions">
              <button onClick={() => setShowConfirmPopup(false)}>Cancel</button>
              <button onClick={confirmDelete}>Confirm Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Reason Popup */}
      {showReasonPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Reason for Deletion</h3>
            <textarea
              rows="4"
              placeholder="Enter reason..."
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
            />
            <div className="popup-actions">
              <button onClick={() => setShowReasonPopup(false)}>Cancel</button>
              <button onClick={submitReason}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .student-management {
          padding: 2rem;
          font-family: 'Inter', sans-serif;
          width: 100%;
          max-width: 100%;
          margin: 0;
        }

        header {
          text-align: center;
          margin-bottom: 2rem;
        }

        header h1 {
          font-size: 2.3rem;
          font-weight: 700;
          color: #1e293b;
        }

        header p {
          color: #475569;
        }

        /* Search bar */
        .top-bar {
          display: flex;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .search-wrapper {
          position: relative;
          width: 90%;
        }

        .search-icon {
          position: absolute;
          top: 50%;
          left: 16px;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 1.1rem;
        }

        .search-wrapper input {
          width: 100%;
          padding: 1rem 1.6rem 1rem 3rem;
          border-radius: 12px;
          border: 1px solid #d1d5db;
          font-size: 1.05rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          outline: none;
          transition: 0.3s;
        }

        .search-wrapper input:focus {
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59,130,246,0.3);
        }

        .student-grid-container {
          max-height: 75vh;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .student-grid-container::-webkit-scrollbar {
          width: 6px;
        }

        .student-grid-container::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        .student-grid-container::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        .student-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(550px, 1fr));
          gap: 1.5rem;
          width: 100%;
        }

        .student-card {
          position: relative;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          transition: transform 0.2s ease, box-shadow 0.3s ease;
          width: 100%;
        }

        .student-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        /* Delete Button */
        .delete-button {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 1cm;
          height: 1cm;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 4px;
          background: #f87171;
          color: white;
          cursor: pointer;
          font-size: 1rem;
        }

        .delete-button:hover {
          background: #dc2626;
        }

        .profile-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-left: 1cm;
          margin-top: 1cm;
        }

        .profile-photo {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #d1d5db;
          box-shadow: 0 6px 18px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .profile-photo:hover img {
          transform: scale(1.05);
        }

        .student-info {
          flex: 2;
          margin-left: 1.5cm;
        }

        .student-info h2 {
          font-size: 1.3rem;
          margin-bottom: 0.4rem;
          position: relative;
          top: -4px;
        }

        .student-info p {
          margin: 0.2rem 0;
          font-size: 0.95rem;
        }

        .status-badge {
          display: inline-block;
          margin-top: 0.4rem;
          padding: 0.3rem 0.6rem;
          border-radius: 10px;
          font-size: 0.8rem;
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

        .no-data {
          text-align: center;
          font-size: 1rem;
          color: #6b7280;
        }

        /* Popup Styles */
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .popup {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.2);
          max-width: 400px;
          width: 100%;
          text-align: center;
        }

        .popup h3 {
          margin-bottom: 1rem;
        }

        .popup p {
          margin-bottom: 1.2rem;
        }

        .popup textarea {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 0.8rem;
          resize: none;
          font-size: 0.95rem;
          margin-bottom: 1rem;
        }

        .popup-actions {
          display: flex;
          justify-content: space-between;
        }

        .popup-actions button {
          flex: 1;
          margin: 0 0.3rem;
          padding: 0.6rem;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          cursor: pointer;
          font-weight: 600;
        }

        .popup-actions button:first-child {
          background: #e5e7eb;
          color: #374151;
        }

        .popup-actions button:last-child {
          background: #ef4444;
          color: white;
        }

        @media (max-width: 768px) {
          .student-card {
            flex-direction: column;
            text-align: center;
          }

          .profile-section {
            margin-bottom: 1rem;
            margin-left: 0;
            margin-top: 0;
          }

          .profile-photo {
            width: 140px;
            height: 140px;
          }

          .student-info {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}
