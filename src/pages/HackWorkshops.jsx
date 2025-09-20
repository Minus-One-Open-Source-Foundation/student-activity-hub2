import React, { useState } from "react";

export default function HackWorkshops() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Smart India Hackathon 2025",
      type: "Hackathon",
      date: "2025-07-15",
      description:
        "Participated in SIH 2025, solved real-life problem statements using AI and IoT.",
      file: null,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "",
    date: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    setNewEvent({ ...newEvent, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.type || !newEvent.date || !newEvent.description) {
      alert("Please fill all fields.");
      return;
    }
    const event = { id: events.length + 1, ...newEvent };
    setEvents([event, ...events]);
    setNewEvent({ title: "", type: "", date: "", description: "", file: null });
    setShowForm(false);
  };

  return (
    <div className="hw-wrapper">
      <header>
        <h1> Hackathons & Workshops</h1>
        <p>Showcasing all your hackathon participations and workshops attended</p>
        <button className="add-btn" onClick={() => setShowForm(true)}>+ Add Event</button>
      </header>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Event</h3>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input type="text" name="title" value={newEvent.title} onChange={handleChange} required />

              <label>Type</label>
              <select name="type" value={newEvent.type} onChange={handleChange} required>
                <option value="">Select Type</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Workshop">Workshop</option>
              </select>

              <label>Date</label>
              <input type="date" name="date" value={newEvent.date} onChange={handleChange} required />

              <label>Description</label>
              <textarea name="description" value={newEvent.description} onChange={handleChange} required />

              <label>Upload File (optional)</label>
              <input type="file" onChange={handleFileUpload} />

              <div className="modal-buttons">
                <button type="submit" className="primary-btn">Add</button>
                <button type="button" className="ghost-btn" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="cards-container">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className={`badge ${event.type.toLowerCase()}`}>{event.type}</div>
            <h3>{event.title}</h3>
            <span className="date">{event.date}</span>
            <p>{event.description}</p>
            {event.file && <p className="file-name">📎 {event.file.name}</p>}
          </div>
        ))}
      </section>

      <style>{`
        .hw-wrapper {
          min-height: 100vh;
          padding: 2rem 1rem;
          background: url("/src/assets/bg.jpg") no-repeat center center fixed;
          background-size: cover;
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

        .event-card {
          background: #fff;
          border-radius: 18px;
          padding: 2rem 1.6rem;
          box-shadow: 0 12px 28px rgba(0,0,0,0.12);
          transition: transform 0.25s, box-shadow 0.25s;
          display: flex;
          flex-direction: column;
        }

        .event-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }

        .badge {
          display: inline-block;
          padding: 0.35rem 0.9rem;
          border-radius: 14px;
          font-weight: 600;
          font-size: 0.85rem;
          color: #fff;
          margin-bottom: 1rem;
          align-self: flex-start;
        }

        .badge.hackathon { background: #6366f1; }
        .badge.workshop { background: #10b981; }

        .event-card h3 {
          font-size: 1.25rem;
          margin: 0 0 0.6rem;
          font-weight: 700;
        }

        .date {
          font-size: 0.85rem;
          color: #777;
          margin-bottom: 1rem;
        }

        .event-card p {
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
          .hw-wrapper { padding: 2rem 1rem; }
        }
      `}</style>
    </div>
  );
}
