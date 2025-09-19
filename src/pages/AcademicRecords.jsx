import React, { useState } from "react";

export default function AcademicRecords() {
  const [records, setRecords] = useState([
    // Example default record
    // { course: "Data Structures", grade: "A+" }
  ]);
  const [form, setForm] = useState({ course: "", grade: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addRecord = () => {
    if (form.course && form.grade) {
      setRecords([form, ...records]);
      setForm({ course: "", grade: "" });
    }
  };

  return (
    <div className="records-wrapper">
      <header>
        <h1> Academic Records</h1>
        <p>Track all your courses and grades here</p>
      </header>

      <section className="form-section">
        <input
          type="text"
          placeholder="Course Name"
          name="course"
          value={form.course}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Grade"
          name="grade"
          value={form.grade}
          onChange={handleChange}
        />
        <button onClick={addRecord}>Add Record</button>
      </section>

      <section className="cards-container">
        {records.length === 0 ? (
          <div className="empty">No records added yet.</div>
        ) : (
          records.map((rec, i) => (
            <div key={i} className="record-card">
              <h3>{rec.course}</h3>
              <span className="grade">{rec.grade}</span>
            </div>
          ))
        )}
      </section>

      <style>{`
        .records-wrapper {
          min-height: 100vh;
          padding: 3rem 2rem;
          background: linear-gradient(135deg,#f5f7fa,#e0e0e0);
          font-family: 'Inter', sans-serif;
          color: #111;
        }

        header {
          text-align: center;
          margin-bottom: 2rem;
        }

        header h1 {
          font-size: 2.2rem;
          font-weight: 700;
          background: linear-gradient(90deg,#ff6a00,#ee0979);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }

        header p {
          font-size: 1rem;
          color: #555;
        }

        .form-section {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 2rem;
        }

        .form-section input {
          padding: 0.8rem 1rem;
          border-radius: 12px;
          border: 1px solid #ccc;
          outline: none;
          font-size: 1rem;
          min-width: 200px;
          transition: all 0.25s;
        }

        .form-section input:focus {
          border-color: #ff6a00;
          box-shadow: 0 0 10px rgba(255,106,0,0.2);
        }

        .form-section button {
          padding: 0.8rem 1.5rem;
          background: linear-gradient(90deg,#ff6a00,#ee0979);
          border: none;
          color: #fff;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.2s;
        }

        .form-section button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(238,9,121,0.18);
        }

        .cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }

        .record-card {
          background: #fff;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 12px 28px rgba(0,0,0,0.12);
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.25s, box-shadow 0.25s;
        }

        .record-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .record-card h3 {
          margin: 0 0 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .grade {
          font-size: 1rem;
          color: #555;
          background: #f0f0f0;
          padding: 0.3rem 0.8rem;
          border-radius: 8px;
        }

        .empty {
          text-align: center;
          font-size: 1rem;
          color: #888;
          grid-column: 1/-1;
        }

        @media(max-width:600px){
          .form-section { flex-direction: column; gap: 0.8rem; }
        }
      `}</style>
    </div>
  );
}
