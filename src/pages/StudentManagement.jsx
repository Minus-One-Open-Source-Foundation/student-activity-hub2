import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

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

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.regno.toLowerCase().includes(search.toLowerCase())
  );

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

              {/* Profile Photo + Delete Account */}
              <div className="profile-section">
                <div className="profile-photo">
                  <img src={student.profilePic} alt={student.name} />
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete Account
                </button>
              </div>
            </div>
          ))}

          {filteredStudents.length === 0 && (
            <p className="no-data">No students found</p>
          )}
        </div>
      </div>

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
          display: flex;
          justify-content: space-between;
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

        .student-info {
          flex: 2;
        }

        .student-info h2 {
         font-size: 1.3rem;
         margin-bottom: 0.4rem; /* keep spacing below unchanged */
         position: relative;
         top: -4px; /* move slightly upwards */
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

        .profile-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-left: 1rem;
        }

        .profile-photo {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #d1d5db;
          box-shadow: 0 6px 18px rgba(0,0,0,0.2);
          margin-bottom: 1rem;
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

        .delete-btn {
          background: #ef4444;
          color: white;
          padding: 0.7rem 1.4rem;
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .delete-btn:hover {
          background: #dc2626;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
        }

        .no-data {
          text-align: center;
          font-size: 1rem;
          color: #6b7280;
        }

        @media (max-width: 768px) {
          .student-card {
            flex-direction: column;
            text-align: center;
          }

          .profile-section {
            margin-top: 1rem;
          }

          .profile-photo {
            width: 140px;
            height: 140px;
          }
        }
      `}</style>
    </div>
  );
}
