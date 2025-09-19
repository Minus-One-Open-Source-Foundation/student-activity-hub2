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
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.type || !newEvent.date || !newEvent.description) {
      alert("Please fill all fields.");
      return;
    }
    const event = { id: events.length + 1, ...newEvent };
    setEvents([event, ...events]);
    setNewEvent({ title: "", type: "", date: "", description: "" });
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
          </div>
        ))}
      </section>

      <style>{`
        .hw-wrapper {
          min-height: 100vh;
          padding: 3rem 2rem;
          background: linear-gradient(135deg, #f5f7fa, #e0e0e0);
          font-family: 'Inter', sans-serif;
          color: #111;
        }

        header {
          text-align: center;
          margin-bottom: 2.5rem;
          position: relative;
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
          padding: 0.6rem 1.2rem;
          background: linear-gradient(90deg,#ff6a00,#ee0979);
          border: none;
          color: #fff;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.2s;
        }

        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(238,9,121,0.18);
        }

        .cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .event-card {
          background: #fff;
          border-radius: 16px;
          padding: 1.8rem 1.5rem;
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
          padding: 0.25rem 0.8rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.8rem;
          color: #fff;
          margin-bottom: 1rem;
          align-self: flex-start;
        }

        .badge.hackathon { background: #6366f1; }
        .badge.workshop { background: #10b981; }

        .event-card h3 {
          font-size: 1.2rem;
          margin: 0 0 0.5rem;
          font-weight: 700;
        }

        .date {
          font-size: 0.85rem;
          color: #777;
          margin-bottom: 0.8rem;
        }

        .event-card p {
          font-size: 0.95rem;
          color: #444;
          flex-grow: 1;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.3);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
        }

        .modal-content {
          background: #fff;
          border-radius: 16px;
          padding: 2rem;
          width: 100%;
          max-width: 400px;
        }

        .modal-content h3 {
          margin-top: 0;
          margin-bottom: 1rem;
        }

        .modal-content label {
          display: block;
          margin-bottom: 0.3rem;
          font-weight: 600;
          color: #111;
        }

        .modal-content input,
        .modal-content select,
        .modal-content textarea {
          width: 100%;
          padding: 0.6rem 0.8rem;
          border-radius: 10px;
          border: 1px solid #ccc;
          margin-bottom: 0.8rem;
          font-size: 0.95rem;
          outline: none;
          resize: vertical;
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
          padding: 0.6rem 1.2rem;
          border-radius: 12px;
          cursor: pointer;
        }

        .ghost-btn {
          background: transparent;
          border: none;
          color: #555;
          text-decoration: underline;
          cursor: pointer;
        }

        @media(max-width: 600px){
          .hw-wrapper { padding: 2rem 1rem; }
        }
      `}</style>
    </div>
  );
}
