import React, { useState } from "react";
import { FaPlus, FaCheckCircle, FaExclamationCircle, FaFileAlt } from "react-icons/fa";

export default function Internships() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Summer Internship at XYZ Corp",
      type: "Internship",
      startDate: "2025-05-01",
      endDate: "2025-06-01",
      companyName: "XYZ Corp",
      description:
        "Worked on developing web applications using React and Node.js.",
      file: { name: "certificate.jpg", type: "JPG" },
      status: "Approved",
    },
    {
      id: 2,
      title: "Winter Internship at ABC Ltd",
      type: "Internship",
      startDate: "2025-11-15",
      endDate: "2025-12-15",
      companyName: "ABC Ltd",
      description:
        "Contributed to backend services and database optimization.",
      file: { name: "certificate.jpg", type: "JPG" },
      status: "Pending",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "Internship",
    startDate: "",
    endDate: "",
    companyName: "",
    description: "",
    file: null,
    status: "Pending",
  });

  const handleAddInternship = () => {
    setEvents([...events, { id: events.length + 1, ...formData }]);
    setShowForm(false);
    setFormData({
      title: "",
      type: "Internship",
      startDate: "",
      endDate: "",
      companyName: "",
      description: "",
      file: null,
      status: "Pending",
    });
  };

  const filteredEvents = events.filter((ev) =>
    ev.title.toLowerCase().includes(formData.title.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem 1rem",
        fontFamily: "'Inter', sans-serif",
        background: `url("/src/assets/bg.jpg") no-repeat center center fixed`,
        backgroundSize: "cover",
        color: "#111",
      }}
    >
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search internships..."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="search-bar"
            style={{
              flex: 1,
              padding: "1rem 3rem 1rem 1.5rem",
              borderRadius: "30px",
              border: "none",
              background: "linear-gradient(90deg,#a18cd1,#fbc2eb)",
              color: "#fff",
              fontSize: "1.1rem",
              outline: "none",
            }}
          />
          <button
            className="add-btn"
            onClick={() => setShowForm(true)}
            style={{
              padding: "0.7rem 1.5rem",
              background: "linear-gradient(90deg,#ff6a00,#ee0979)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1rem",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            <FaPlus style={{ marginRight: 6 }} /> Add internships
          </button>
        </div>
      </header>

      {showForm && (
        <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div className="modal-form" style={{ width: "70%", maxWidth: "350px", background: "#fff", padding: "1rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ margin: "0 0 1rem 0", fontSize: "1.5rem", fontWeight: 700, color: "#333" }}>Add New Internship</h3>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{ width: "100%", padding: "0.8rem", border: "1px solid #ddd", borderRadius: "8px", fontSize: "1rem" }}
            />
            <input
              type="text"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              style={{ width: "100%", padding: "0.8rem", border: "1px solid #ddd", borderRadius: "8px", fontSize: "1rem" }}
            />
            <input
              type="date"
              placeholder="Start Date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              style={{ width: "100%", padding: "0.8rem", border: "1px solid #ddd", borderRadius: "8px", fontSize: "1rem" }}
            />
            <input
              type="date"
              placeholder="End Date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              style={{ width: "100%", padding: "0.8rem", border: "1px solid #ddd", borderRadius: "8px", fontSize: "1rem" }}
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ width: "100%", padding: "0.8rem", border: "1px solid #ddd", borderRadius: "8px", fontSize: "1rem", minHeight: "100px" }}
            ></textarea>
            <input
              type="file"
              onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
              style={{ width: "100%", padding: "0.8rem", border: "1px solid #ddd", borderRadius: "8px", fontSize: "1rem" }}
            />
            <div className="modal-actions" style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
              <button
                onClick={handleAddInternship}
                style={{ padding: "0.8rem 1.5rem", background: "linear-gradient(90deg,#ff6a00,#ee0979)", color: "#fff", fontWeight: 600, fontSize: "1rem", border: "none", borderRadius: "8px", cursor: "pointer" }}
              >
                Submit
              </button>
              <button
                onClick={() => setShowForm(false)}
                style={{ padding: "0.8rem 1.5rem", background: "none", color: "#333", fontWeight: 600, fontSize: "1rem", border: "1px solid #ddd", borderRadius: "8px", cursor: "pointer" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cards */}
      <section
        className="cards-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="event-card"
            style={{
              background: "#fff",
              borderRadius: "18px",
              boxShadow: "0 6px 24px rgba(0,0,0,0.13)",
              padding: "2rem 1.6rem",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div
              className={`badge ${event.type.toLowerCase()}`}
              style={{
                position: "absolute",
                top: "1.2rem",
                left: "1.2rem",
                padding: "0.4rem 1.2rem",
                borderRadius: "14px",
                fontWeight: 700,
                fontSize: "1rem",
                background: "#fff",
                border: "2px solid #ff6a00",
                color: "#ff6a00",
              }}
            >
              {event.type}
            </div>
            <div className="event-main" style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "2rem" }}>
              <div className="event-info" style={{ flex: 1 }}>
                <h3 className="event-title" style={{ color: "#3a3aee", fontSize: "1.1rem", fontWeight: 700, margin: "0.5rem 0" }}>
                  {event.type}
                </h3>
                <h4 className="event-subtitle" style={{ color: "#3a3aee", fontSize: "1rem", fontWeight: 600, margin: "0.3rem 0 0.5rem 0" }}>
                  {event.title}
                </h4>
                <span className="company-name" style={{ fontSize: "1rem", color: "#555", fontWeight: 600, marginBottom: "0.5rem", display: "block" }}>
                  {event.companyName}
                </span>
                <span className="date" style={{ fontSize: "0.95rem", color: "#777", marginBottom: "0.7rem", display: "block" }}>
                  {event.startDate} - {event.endDate}
                </span>
                <p style={{ color: "#444", fontSize: "1rem", marginBottom: "0.7rem" }}>
                  {event.description}
                </p>
              </div>
              <div
                className="file-preview"
                style={{
                  minWidth: "110px",
                  minHeight: "110px",
                  background: "#f3f3f3",
                  borderRadius: "12px",
                  padding: "1.2rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  justifyContent: "center",
                }}
              >
                {event.file ? (
                  <>
                    <FaFileAlt className="file-logo" style={{ fontSize: "2rem", color: "#a18cd1", marginBottom: "0.5rem" }} />
                    <span className="file-type" style={{ fontSize: "1.1rem", color: "#7b7b7b", fontWeight: 700, marginTop: "0.5rem" }}>
                      {event.file.type}
                    </span>
                  </>
                ) : (
                  <div className="file-placeholder" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span className="file-type" style={{ fontSize: "1.1rem", color: "#7b7b7b", fontWeight: 700, marginTop: "0.5rem" }}>
                      JPG
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="status-box below" style={{ fontSize: "1rem", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem", marginTop: "1rem" }}>
              {event.status === "Approved" ? (
                <span className="approved" style={{ color: "#10b981" }}>
                  <FaCheckCircle /> Approved
                </span>
              ) : (
                <span className="pending" style={{ color: "#ff4b5c" }}>
                  <FaExclamationCircle /> Pending
                </span>
              )}
            </div>
          </div>
        ))}
      </section>

      <style>{`
        .internships-wrapper {
          min-height: 100vh;
          padding: 2rem 1rem;
          font-family: 'Inter', sans-serif;
          background: url("/src/assets/bg.jpg") no-repeat center center fixed;
          background-size: cover;
          color: #111;
        }
        header { text-align: center; margin-bottom: 2.5rem; }
        .search-bar-wrapper {
          position: relative;
          width: 100%;
          max-width: 700px;
          margin: 0 auto 1.5rem auto;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .search-bar {
          flex: 1;
          padding: 1rem 3rem 1rem 1.5rem;
          border-radius: 30px;
          border: none;
          background: linear-gradient(90deg,#a18cd1,#fbc2eb);
          color: #fff;
          font-size: 1.1rem;
          outline: none;
        }
        .search-bar::placeholder { color: #fff; opacity: 0.8; }
        .add-btn {
          padding: 0.7rem 1.5rem;
          background: linear-gradient(90deg,#ff6a00,#ee0979);
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-form {
          width: 70%;
          max-width: 350px;
          background: #fff;
          padding: 1rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .modal-form h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #333;
        }
        .modal-form input,
        .modal-form textarea {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end; /* Moved buttons to the right */
          gap: 1rem;
        }
        .modal-actions button {
          padding: 0.8rem 1.5rem;
          background: linear-gradient(90deg,#ff6a00,#ee0979);
          color: #fff;
          font-weight: 600;
          fontSize: "1rem",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }
        .cards-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .event-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 6px 24px rgba(0,0,0,0.13);
          padding: 2rem 1.6rem;
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }
        .badge {
          position: absolute;
          top: 1.2rem;
          left: 1.2rem;
          padding: 0.4rem 1.2rem;
          border-radius: 14px;
          font-weight: 700;
          font-size: 1rem;
          background: #fff;
          border: 2px solid #ff6a00;
          color: #ff6a00;
        }
        .badge.internship { border-color: #ff6a00; color: #ff6a00; }
        .status-box.below {
          font-size: 1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center; /* Center alignment */
          gap: 0.3rem;
          margin-top: 1rem; /* Adjusted spacing */
        }
        .approved { color: #10b981; }
        .pending { color: #ff4b5c; }
        .event-main {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 2rem;
        }
        .event-info {
          flex: 1;
        }
        .event-info h3.event-title {
          color: #3a3aee;
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0.5rem 0 0.5rem 0;
        }
        .event-info h4.event-subtitle {
          color: #3a3aee;
          font-size: 1rem;
          font-weight: 600;
          margin: 0.3rem 0 0.5rem 0; /* Added spacing */
        }
        .company-name {
          font-size: 1rem;
          color: #555;
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: block;
        }
        .date {
          font-size: 0.95rem;
          color: #777;
          margin-bottom: 0.7rem;
          display: block;
        }
        .event-info p {
          color: #444;
          font-size: 1rem;
          margin-bottom: 0.7rem;
        }
        .file-preview {
          min-width: 110px;
          min-height: 110px;
          background: #f3f3f3;
          border-radius: 12px;
          padding: 1.2rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          justify-content: center;
        }
        .file-logo {
          font-size: 2rem;
          color: #a18cd1;
          margin-bottom: 0.5rem;
        }
        .file-type {
          font-size: 1.1rem;
          color: #7b7b7b;
          font-weight: 700;
          margin-top: 0.5rem;
        }
        .file-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
}
