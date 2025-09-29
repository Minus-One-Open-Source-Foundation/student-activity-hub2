import React, { useState } from "react";
import { FaPlus, FaCheckCircle, FaExclamationCircle, FaFileAlt } from "react-icons/fa";

export default function FacultyInternshipsRequests() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Summer Internship at XYZ Corp",
      type: "Internship",
      startDate: "2025-05-01",
      endDate: "2025-06-01",
      companyName: "XYZ Corp",
      description: "Worked on developing web applications using React and Node.js.",
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

  const [searchTerm, setSearchTerm] = useState("");
  const filteredEvents = events.filter((ev) =>
    ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ev.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="internships-requests-wrapper" style={{ minHeight: "100vh", padding: "2rem 1rem", fontFamily: "'Inter', sans-serif", background: `url('/src/assets/bg.jpg') no-repeat center center fixed`, backgroundSize: "cover", color: "#111" }}>
      <header style={{ textAlign: "center", marginBottom: "2.5rem", marginTop: "2.5rem" }}>
        <div className="search-bar-wrapper">
            <h2 style={{ fontWeight: 700, fontSize: '2.1rem', color: '#3a3aee', marginBottom: '1.5rem' }}>Internships Requests</h2>
            <input
              type="text"
              placeholder="Search internships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
              style={{ flex: 1, padding: "1rem 3rem 1rem 1.5rem", borderRadius: "30px", border: "none", background: "rgba(255,255,255,0.7)", color: "#232526", fontSize: "1.1rem", outline: "none", width: "580px" }}
            />
        </div>
      </header>
      <section className="cards-container" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {filteredEvents.length === 0 ? (
          <div className="event-card" style={{ background: "#fff", borderRadius: "18px", boxShadow: "0 6px 24px rgba(0,0,0,0.13)", padding: "2rem 1.6rem", textAlign: 'center' }}>
            No internship requests found.
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div key={event.id} style={{ marginBottom: '1.5rem', position: 'relative' }}>
              <div className="event-card" style={{ background: "#fff", borderRadius: "18px", boxShadow: "0 6px 24px rgba(0,0,0,0.13)", padding: "2rem 1.6rem", display: "flex", flexDirection: "row", gap: "2rem", alignItems: "flex-start", position: "relative" }}>
                <div className="badge" style={{ position: "absolute", top: "1.2rem", left: "1.2rem", padding: "0.4rem 1.2rem", borderRadius: "14px", fontWeight: 700, fontSize: "1rem", background: "#fff", border: "2px solid #ff6a00", color: "#ff6a00" }}>
                  {event.type}
                </div>
                <div className="event-info" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 className="event-title" style={{ color: "#3a3aee", fontSize: "1.1rem", fontWeight: 700, margin: "0.5rem 0" }}>{event.type}</h3>
                  <h4 className="event-subtitle" style={{ color: "#3a3aee", fontSize: "1rem", fontWeight: 600, margin: "0.3rem 0 0.5rem 0" }}>{event.title}</h4>
                  <span className="company-name" style={{ fontSize: "1rem", color: "#555", fontWeight: 600, marginBottom: "0.5rem", display: "block" }}>{event.companyName}</span>
                  <span className="date" style={{ fontSize: "0.95rem", color: "#777", marginBottom: "0.3rem", display: "block" }}>{event.startDate} - {event.endDate}</span>
                  {/* Internship mode below date */}
                  <div style={{ fontSize: '1rem', color: '#3a3aee', fontWeight: 600, marginBottom: '0.7rem', textAlign: 'left' }}>
                    Internship mode: <span style={{ color: '#222', fontWeight: 500 }}>{event.mode || 'Remote'}</span>
                  </div>
                  <p style={{ color: "#444", fontSize: "1rem", marginBottom: "0.7rem" }}>{event.description}</p>
                </div>
                {/* Rectangle box */}
                <div style={{ width: '180px', height: '160px', minWidth: '180px', minHeight: '160px', border: '2px dashed #bbb', borderRadius: '12px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
              </div>
              {/* Status button for all containers, at the same place */}
              <div style={{ position: 'absolute', right: '1.6rem', bottom: '1.2rem', width: '180px', textAlign: 'center' }}>
                {event.status === "Pending" ? (
                  <span style={{ color: '#FF9800', fontWeight: 'bold', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: '#fff8e1', borderRadius: '8px', padding: '0.3rem 0.8rem', border: '1.5px solid #FF9800' }}>
                    <FaExclamationCircle style={{ marginRight: '4px' }} /> Pending
                  </span>
                ) : event.status === "Approved" ? (
                  <span style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: '#e8f5e9', borderRadius: '8px', padding: '0.3rem 0.8rem', border: '1.5px solid #4CAF50' }}>
                    <FaCheckCircle style={{ marginRight: '4px' }} /> Approved
                  </span>
                ) : null}
              </div>
            </div>
          ))
        )}
      </section>
      <style>{`
        .approved { color: #10b981; }
        .pending { color: #ff4b5c; }
      `}</style>
    </div>
  );
}
