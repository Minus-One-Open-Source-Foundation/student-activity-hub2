import React, { useState } from "react";

export default function Internships() {
  const [internships, setInternships] = useState([
    {
      id: 1,
      company: "Infosys",
      role: "Summer Intern",
      startDate: "2025-06-01",
      endDate: "2025-07-31",
      description:
        "Worked on a web development project using React and Node.js.",
      file: null,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newInternship, setNewInternship] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    setNewInternship({ ...newInternship, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    setNewInternship({ ...newInternship, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { company, role, startDate, endDate, description } = newInternship;
    if (!company || !role || !startDate || !endDate || !description) {
      alert("Please fill all fields.");
      return;
    }
    const internship = { id: internships.length + 1, ...newInternship };
    setInternships([internship, ...internships]);
    setNewInternship({
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
      file: null,
    });
    setShowForm(false);
  };

  return (
    <div className="intern-wrapper">
      <header>
        <h1>Internships</h1>
        <p>Manage your internship experiences and details</p>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Add Internship
        </button>
      </header>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Internship</h3>
            <form onSubmit={handleSubmit}>
              <label>Company Name</label>
              <input
                type="text"
                name="company"
                value={newInternship.company}
                onChange={handleChange}
                required
              />

              <label>Role / Position</label>
              <input
                type="text"
                name="role"
                value={newInternship.role}
                onChange={handleChange}
                required
              />

              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={newInternship.startDate}
                onChange={handleChange}
                required
              />

              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={newInternship.endDate}
                onChange={handleChange}
                required
              />

              <label>Description</label>
              <textarea
                name="description"
                value={newInternship.description}
                onChange={handleChange}
                required
              />

              <label>Upload Certificate (optional)</label>
              <input type="file" onChange={handleFileUpload} />

              <div className="modal-buttons">
                <button type="submit" className="primary-btn">
                  Add
                </button>
                <button
                  type="button"
                  className="ghost-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="cards-container">
        {internships.map((intern) => (
          <div key={intern.id} className="intern-card">
            <h3>{intern.role}</h3>
            <span className="company">{intern.company}</span>
            <span className="dates">
              {intern.startDate} - {intern.endDate}
            </span>
            <p>{intern.description}</p>
            {intern.file && <p className="file-name">📎 {intern.file.name}</p>}
          </div>
        ))}
      </section>

      <style>{`
        .intern-wrapper {
          min-height: 100vh;
          padding: 3rem 2rem;
          background: linear-gradient(135deg, #f5f7fa, #e0e0e0);
          font-family: 'Inter', sans-serif;
          color: #111;
        }

        header {
          text-align: center;
          margin-bottom: 2.5rem;
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
          margin-bottom: 1rem;
        }

        .add-btn {
          padding: 0.6rem 1.4rem;
          background: linear-gradient(90deg,#ff6a00,#ee0979);
          border: none;
          color: #fff;
          font-weight: 600;
          border-radius: 14px;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(238,9,121,0.2);
          transition: transform 0.15s, box-shadow 0.2s;
        }

        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(238,9,121,0.25);
        }

        .cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .intern-card {
          background: #fff;
          border-radius: 18px;
          padding: 2rem 1.6rem;
          box-shadow: 0 12px 28px rgba(0,0,0,0.12);
          transition: transform 0.25s, box-shadow 0.25s;
          display: flex;
          flex-direction: column;
        }

        .intern-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .intern-card h3 {
          font-size: 1.25rem;
          margin: 0 0 0.5rem;
          font-weight: 700;
        }

        .company {
          font-size: 0.95rem;
          color: #555;
          margin-bottom: 0.25rem;
        }

        .dates {
          font-size: 0.85rem;
          color: #777;
          margin-bottom: 0.8rem;
        }

        .intern-card p {
          font-size: 0.95rem;
          color: #444;
          flex-grow: 1;
          margin-bottom: 0.6rem;
        }

        .file-name {
          font-size: 0.85rem;
          color: #555;
          font-style: italic;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.35);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          z-index: 1000;
        }

        .modal-content {
          background: #fff;
          border-radius: 18px;
          padding: 2.5rem 2rem;
          width: 100%;
          max-width: 450px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
          animation: slideDown 0.3s ease;
        }

        .modal-content h3 {
          margin-top: 0;
          margin-bottom: 1.2rem;
          font-size: 1.5rem;
          color: #222;
        }

        .modal-content label {
          display: block;
          margin-bottom: 0.4rem;
          font-weight: 600;
          color: #111;
        }

        .modal-content input,
        .modal-content select,
        .modal-content textarea {
          width: 100%;
          padding: 0.65rem 0.9rem;
          border-radius: 12px;
          border: 1px solid #ccc;
          margin-bottom: 1rem;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.25s ease;
        }

        .modal-content input:focus,
        .modal-content select:focus,
        .modal-content textarea:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
        }

        .modal-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }

        .primary-btn {
          background: linear-gradient(90deg,#ff6a00,#ee0979);
          border: none;
          color: #fff;
          font-weight: 600;
          padding: 0.65rem 1.3rem;
          border-radius: 14px;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.2s;
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(238,9,121,0.25);
        }

        .ghost-btn {
          background: transparent;
          border: none;
          color: #555;
          text-decoration: underline;
          cursor: pointer;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media(max-width: 600px){
          .intern-wrapper { padding: 2rem 1rem; }
        }
      `}</style>
    </div>
  );
}
