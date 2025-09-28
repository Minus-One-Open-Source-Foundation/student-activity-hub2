import React, { useState } from "react";

export default function GradeManagement() {
  const [studentInfo, setStudentInfo] = useState({
    name: "John Doe",
    rollNo: "12345",
    dept: "Computer Science",
    year: "3rd Year",
  });

  const [semesters, setSemesters] = useState([
    { id: 1, name: "Semester 1", file: null },
    { id: 2, name: "Semester 2", file: null },
    { id: 3, name: "Semester 3", file: null },
    { id: 4, name: "Semester 4", file: null },
    { id: 5, name: "Semester 5", file: null },
    { id: 6, name: "Semester 6", file: null },
    { id: 7, name: "Semester 7", file: null },
    { id: 8, name: "Semester 8", file: null },
  ]);

  const handleFileChange = (id, file) => {
    setSemesters((prev) =>
      prev.map((sem) =>
        sem.id === id ? { ...sem, file } : sem
      )
    );
  };

  const handleSave = () => {
    console.log("Student Info:", studentInfo);
    console.log("Uploaded Records:", semesters);
    alert("Grades/marksheets saved successfully and reflected on student page!");
  };

  return (
    <div className="grade-management">
      <h1>Grade Management</h1>
      <p className="subtitle">
        Upload marksheets for each semester. These will reflect in the student’s Academic Records page.
      </p>

      {/* Editable student info */}
      <div className="student-info">
        <label>
          Student Name:{" "}
          <input
            type="text"
            value={studentInfo.name}
            onChange={(e) =>
              setStudentInfo({ ...studentInfo, name: e.target.value })
            }
          />
        </label>
        <label>
          Roll No:{" "}
          <input
            type="text"
            value={studentInfo.rollNo}
            onChange={(e) =>
              setStudentInfo({ ...studentInfo, rollNo: e.target.value })
            }
          />
        </label>
        <label>
          Department:{" "}
          <input
            type="text"
            value={studentInfo.dept}
            onChange={(e) =>
              setStudentInfo({ ...studentInfo, dept: e.target.value })
            }
          />
        </label>
        <label>
          Year:{" "}
          <input
            type="text"
            value={studentInfo.year}
            onChange={(e) =>
              setStudentInfo({ ...studentInfo, year: e.target.value })
            }
          />
        </label>
      </div>

      {/* Semester cards */}
      <div className="semester-grid">
        {semesters.map((sem) => (
          <div key={sem.id} className="semester-card">
            <h3>{sem.name}</h3>
            <input
              type="file"
              accept=".pdf,.xlsx,.xls"
              onChange={(e) => handleFileChange(sem.id, e.target.files[0])}
            />
            {sem.file ? (
              <p className="uploaded">📄 {sem.file.name}</p>
            ) : (
              <p className="not-uploaded">Not Uploaded</p>
            )}
          </div>
        ))}
      </div>

      <button className="save-btn" onClick={handleSave}>
        Save Changes
      </button>

      <style>{`
        .grade-management {
          padding: 2rem;
          font-family: 'Inter', sans-serif;
          text-align: center;
        }
        .subtitle {
          margin-bottom: 1rem;
          color: #6b7280;
        }
        .student-info {
          background: #f9fafb;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }
        .student-info label {
          font-size: 0.95rem;
          color: #374151;
        }
        .student-info input {
          margin-left: 0.5rem;
          padding: 0.3rem 0.6rem;
          border: 1px solid #d1d5db;
          border-radius: 6px;
        }
        .semester-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-top: 1rem;
        }
        .semester-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .semester-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
        .semester-card h3 {
          margin-bottom: 1rem;
        }
        .semester-card input {
          margin: 0.5rem 0;
        }
        .uploaded {
          color: green;
          font-weight: bold;
          font-size: 0.9rem;
        }
        .not-uploaded {
          color: #9ca3af;
          font-size: 0.9rem;
        }
        .save-btn {
          margin-top: 2rem;
          padding: 0.8rem 2rem;
          border: none;
          border-radius: 8px;
          background-color: #3b82f6;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s;
        }
        .save-btn:hover {
          background-color: #2563eb;
        }
      `}</style>
    </div>
  );
}
