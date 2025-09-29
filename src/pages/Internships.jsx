import React, { useState } from "react";
import {
  FaPlus,
  FaCheckCircle,
  FaExclamationCircle,
  FaFileAlt,
} from "react-icons/fa";

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
      description: "Contributed to backend services and database optimization.",
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
      <header
        style={{
          textAlign: "center",
          marginBottom: "2.5rem",
          marginTop: "2.5rem",
        }}
      >
        <div className="search-bar-wrapper">
          <input
            type="text"
            placeholder="Search internships..."
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="search-bar"
            style={{
              flex: 1,
              padding: "1rem 3rem 1rem 1.5rem",
              borderRadius: "30px",
              border: "none",
              background: "rgba(255,255,255,0.7)",
              color: "#232526",
              fontSize: "1.1rem",
              outline: "none",
              width: "580px",
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
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: "32px",
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-form"
            style={{
              width: "70%",
              maxWidth: "350px",
              background: "#fff",
              padding: "1.2rem 1.2rem",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "1.1rem",
              maxHeight: "92vh",
              overflowY: "auto",
              position: "fixed",
              top: "60px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1100,
            }}
          >
            <h3
              style={{
                margin: "0 0 1rem 0",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#333",
              }}
            >
              Add New Internship
            </h3>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "1rem",
              }}
            />
            <input
              type="text"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              style={{
                borderRadius: "8px",
                padding: "0.7rem 1rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                outline: "none",
                width: "100%",
              }}
            />
            <select
              value={formData.mode || ""}
              onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
              style={{
                borderRadius: "8px",
                padding: "0.7rem 1rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                outline: "none",
                width: "100%",
              }}
            >
              <option value="" disabled>
                Select Internship Mode
              </option>
              <option value="Online">Online Internship</option>
              <option value="Offline">Offline Internship</option>
            </select>
            <label style={{ fontWeight: 500, marginBottom: "0.1rem", marginLeft: "8px" }}>
              Start Date
            </label>
            <input
              type="date"
              placeholder="dd-mm-yyyy"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              style={{
                borderRadius: "8px",
                padding: "0.7rem 1rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                outline: "none",
                width: "100%",
              }}
            />
            <label style={{ fontWeight: 500, marginBottom: "0.1rem", marginLeft: "8px" }}>
              End Date
            </label>
            <input
              type="date"
              placeholder="dd-mm-yyyy"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              style={{
                borderRadius: "8px",
                padding: "0.7rem 1rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                outline: "none",
                width: "100%",
              }}
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              maxLength={100}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              style={{
                minHeight: "80px",
                maxHeight: "80px",
                resize: "none",
                borderRadius: "8px",
                padding: "0.7rem 1rem",
                fontSize: "1rem",
                border: "1px solid #ccc",
                outline: "none",
                width: "100%",
              }}
            />
            <input
              type="file"
              onChange={(e) =>
                setFormData({ ...formData, file: e.target.files[0] })
              }
              style={{
                width: "100%",
                padding: "0.8rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "1rem",
              }}
            />
            <div
              className="modal-actions"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
              }}
            >
              <button
                onClick={handleAddInternship}
                style={{
                  padding: "0.8rem 1.5rem",
                  background: "linear-gradient(90deg,#ff6a00,#ee0979)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "1rem",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Submit
              </button>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  padding: "0.8rem 1.5rem",
                  background: "none",
                  color: "#333",
                  fontWeight: 600,
                  fontSize: "1rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
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
            <div
              className="event-main"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: "2rem",
              }}
            >
              <div className="event-info" style={{ flex: 1 }}>
                <h3
                  className="event-title"
                  style={{
                    color: "#3a3aee",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    margin: "0.5rem 0",
                  }}
                >
                  {event.type}
                </h3>
                <h4
                  className="event-subtitle"
                  style={{
                    color: "#3a3aee",
                    fontSize: "1rem",
                    fontWeight: 600,
                    margin: "0.3rem 0 0.5rem 0",
                  }}
                >
                  {event.title}
                </h4>
                <span
                  className="company-name"
                  style={{
                    fontSize: "1rem",
                    color: "#555",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                    display: "block",
                  }}
                >
                  {event.companyName}
                </span>
                <span
                  className="date"
                  style={{
                    fontSize: "0.95rem",
                    color: "#777",
                    marginBottom: "0.7rem",
                    display: "block",
                  }}
                >
                  {event.startDate} - {event.endDate}
                </span>
                  {/* Internship mode below date */}
                  <div style={{ fontSize: '1rem', color: '#3a3aee', fontWeight: 600, marginBottom: '0.7rem', textAlign: 'left' }}>
                    Internship mode: <span style={{ color: '#222', fontWeight: 500 }}>{event.mode || 'Remote'}</span>
                  </div>
                <p
                  style={{
                    color: "#444",
                    fontSize: "1rem",
                    marginBottom: "0.7rem",
                  }}
                >
                  {event.description}
                </p>
              </div>
              {/* Empty rectangle box */}
              <div style={{ width: '180px', height: '160px', minWidth: '180px', minHeight: '160px', border: '2px dashed #bbb', borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}></div>
              {/* Status below the rectangle box, outside and down */}
              <div style={{ width: '180px', marginLeft: 'auto', marginTop: '0.7rem', textAlign: 'center' }}>
                {event.status === "Approved" ? (
                  <span style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: '#e8f5e9', borderRadius: '8px', padding: '0.3rem 0.8rem', border: '1.5px solid #4CAF50' }}>
                    <FaCheckCircle style={{ marginRight: '4px' }} /> Approved
                  </span>
                ) : (
                  <span style={{ color: '#FF9800', fontWeight: 'bold', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: '#fff8e1', borderRadius: '8px', padding: '0.3rem 0.8rem', border: '1.5px solid #FF9800' }}>
                    <FaExclamationCircle style={{ marginRight: '4px' }} /> Pending
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      <style>{`
        .approved { color: #10b981; }
        .pending { color: #ff4b5c; }
      `}</style>
    </div>
  );
}
