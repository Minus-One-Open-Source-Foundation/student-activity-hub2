import React, { useState } from "react";
import { FaPlus, FaSearch, FaCheckCircle, FaExclamationCircle, FaFileAlt } from "react-icons/fa";

export default function HackWorkshops() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Smart India Hackathon 2025",
      type: "Hackathon",
      date: "2025-07-15",
      description:
        "Participated in SIH 2025, solved real-life problem statements using AI and IoT.",
      file: { name: "certificate.jpg", type: "JPG" },
      status: "Approved",
    },
    {
      id: 2,
      title: "Smart India Hackathon 2025",
      type: "Hackathon",
      date: "2025-07-15",
      description:
        "Participated in SIH 2025, solved real-life problem statements using AI and IoT.",
      file: { name: "certificate.jpg", type: "JPG" },
      status: "Pending",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    type: "Hackathon",
    date: "",
    description: "",
    file: null,
    status: "Pending",
  });
  const [filter, setFilter] = useState("All");

  const handleAddEvent = () => {
    setEvents([...events, { id: events.length + 1, ...formData }]);
    setShowForm(false);
    setFormData({
      title: "",
      type: "Hackathon",
      date: "",
      description: "",
      file: null,
      status: "Pending",
    });
  };

  const filteredEvents = events.filter((ev) =>
    ev.title.toLowerCase().includes(formData.title.toLowerCase())
  );

  const displayedEvents = filter === "All" ? filteredEvents : filteredEvents.filter(ev => ev.type === filter);

  return (
    <div className="hackworkshops-wrapper">
      <header>
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search hackathons..."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="search-bar"
          />
        </div>
      </header>

      <div className="top-controls" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginTop: "1.5rem" }}>
        <div className="filters" style={{ display: "flex", gap: "0.7rem" }}>
          {["All", "Hackathon", "Workshop"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          <FaPlus style={{ marginRight: 6 }} /> Add hackathons & workshops
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-form">
            <h3>Add New Hackathon/Workshop</h3>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{ width: "100%", padding: "0.8rem", border: "1px solid #ddd", borderRadius: "8px", fontSize: "1rem" }}
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              style={{ width: "100%", padding: "0.8rem", border: "1px solid #ddd", borderRadius: "8px", fontSize: "1rem" }}
            >
              <option value="Hackathon">Hackathon</option>
              <option value="Workshop">Workshop</option>
            </select>
            <input
              type="date"
              placeholder="Date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            ></textarea>
            <input
              type="file"
              onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
            />
            <div className="modal-actions">
              <button onClick={handleAddEvent}>Submit</button>
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

      <section className="cards-container">
        {displayedEvents.map((event) => (
          <div key={event.id} className="event-card">
            <div className={`badge ${event.type.toLowerCase()}`}>{event.type}</div>
            <div className="event-main">
              <div className="event-info">
                <h3 className="event-title">{event.type}</h3> {/* Hackathon */}
                <h4 className="event-subtitle">{event.title}</h4> {/* Hackathon title */}
                <span className="date">{event.date}</span>
                <p>{event.description}</p>
              </div>
              <div className="file-preview">
                {event.file ? (
                  <>
                    <FaFileAlt className="file-logo" /> {/* File logo */}
                    <span className="file-type">{event.file.type}</span>
                  </>
                ) : (
                  <div className="file-placeholder">
                    <span className="file-type">JPG</span>
                  </div>
                )}
              </div>
            </div>
            <div className="status-box below"> {/* Moved below and outside JPG box */}
              {event.status === "Approved" ? (
                <span className="approved">
                  <FaCheckCircle /> Approved
                </span>
              ) : (
                <span className="pending">
                  <FaExclamationCircle /> Pending
                </span>
              )}
            </div>
          </div>
        ))}
      </section>

      <style>{`
        .hackworkshops-wrapper {
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
          background: #fff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          width: 90%;
          max-width: 500px;
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
          justify-content: flex-end;
          gap: 1rem;
        }
        .modal-actions button {
          padding: 0.8rem 1.5rem;
          background: linear-gradient(90deg,#ff6a00,#ee0979);
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }
        .top-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .filters {
          display: flex;
          gap: 1rem;
        }
        .filter-btn {
          padding: 0.7rem 1.2rem;
          background: #f3f4f6;
          color: #111;
          font-weight: 500;
          font-size: 0.9rem;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .filter-btn.active {
          background: linear-gradient(90deg,#ff6a00,#ee0979);
          color: #fff;
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
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 1rem;
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
        .badge.hackathon { border-color: #ff6a00; color: #ff6a00; }
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
