import React, { useState } from "react";
import bgImage from "../assets/bg.jpg";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All"); // State to track selected filter
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
  });

  const addActivity = () => {
    if (formData.title.trim()) {
      setActivities([{ ...formData, id: Date.now() }, ...activities]);
      setFormData({ title: "", date: "", description: "" });
      setShowForm(false);
    }
  };

  const removeActivity = (id) => {
    setActivities(activities.filter((act) => act.id !== id));
  };

  return (
    <div className="activities-wrapper">
      <header>
        <h1>Co-Curriculars</h1>
        <p>Add and track all your activities</p>
      </header>

      {/* Search + Filters + Add Button */}
      <section className="form-section">
        <input
          type="text"
          placeholder="Search activity..."
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="search-bar"
        />
        <div className="button-group-under-search">
          <div className="filters-and-add">
            <div className="filters">
              <button
                className={`filter-btn ${selectedFilter === "All" ? "active" : ""}`}
                onClick={() => setSelectedFilter("All")}
              >
                All
              </button>
              <button
                className={`filter-btn ${selectedFilter === "Participation" ? "active" : ""}`}
                onClick={() => setSelectedFilter("Participation")}
              >
                Participation
              </button>
              <button
                className={`filter-btn ${selectedFilter === "Prize Winning" ? "active" : ""}`}
                onClick={() => setSelectedFilter("Prize Winning")}
              >
                Prize Winning
              </button>
            </div>
            <button
              className="add-btn"
              onClick={() => setShowForm(true)}
            >
              Add Activity
            </button>
          </div>
        </div>
      </section>

      {/* Modal Form */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ color: "#000" }}>Add New Activity</h2>
            <input
              type="text"
              placeholder="Enter Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
            <textarea
              placeholder="Enter Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <select
              style={{ padding: "0.6rem", borderRadius: "12px", border: "1px solid #ccc" }}
              onChange={(e) => console.log(e.target.value)}
            >
              <option value="participation">Participation</option>
              <option value="prize">Prize Winning</option>
            </select>
            <div className="modal-actions">
              <button onClick={addActivity}>Save</button>
              <button className="cancel" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activities List */}
      <section className="cards-container">
        {activities.length === 0 ? (
          <div className="empty">No activities added yet.</div>
        ) : (
          activities.map((act) => (
            <div key={act.id} className="activity-card">
              <div>
                <strong>{act.title}</strong>
                <p>{act.date}</p>
                <small>{act.description}</small>
              </div>
              <button onClick={() => removeActivity(act.id)}>❌</button>
            </div>
          ))
        )}
      </section>

      <style>{`
        .activities-wrapper {
          min-height: 100vh;
          padding: 3rem 2rem;
          background: url('${bgImage}') no-repeat center center fixed;
          background-size: cover;
          font-family: 'Inter', sans-serif;
          color: #333;
        }
        header {
          text-align: center;
          margin-bottom: 2rem;
        }
        header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #000;
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
          flex: 0.5;
          min-width: 220px;
          padding: 0.8rem 1rem;
          border-radius: 12px;
          border: 1px solid #ccc;
          outline: none;
          font-size: 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .form-section input:focus {
          box-shadow: 0 0 10px rgba(100, 100, 255, 0.2);
        }
        .form-section button {
          padding: 0.8rem 1.5rem;
          background: linear-gradient(90deg,#6a11cb,#2575fc);
          border: none;
          color: #fff;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.2s;
        }
        .form-section button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }
        /* Only this section changes for full button gradient color */
        .add-btn {
          padding: 0.75rem 1.6rem;
          background: linear-gradient(90deg, #ff6a00 0%, #ee0979 100%) !important;
          border: none;
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          border-radius: 16px;
          cursor: pointer;
          box-shadow: 0 8px 26px rgba(238, 9, 121, 0.13);
          transition: transform 0.15s, box-shadow 0.2s;
        }
        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(238, 9, 121, 0.18);
        }
        .cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        .activity-card {
          background: #f9f9f9;
          border-radius: 16px;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          font-weight: 500;
          flex-direction: column;
          gap: 0.5rem;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .activity-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
        }
        .activity-card button {
          background: none;
          border: none;
          color: #ff4b5c;
          cursor: pointer;
          font-size: 1.1rem;
          align-self: flex-end;
        }
        .empty {
          text-align: center;
          font-size: 1rem;
          color: #999;
          grid-column: 1/-1;
        }
        /* Modal Styling */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal {
          background: #f0f7ff;
          padding: 2rem;
          border-radius: 16px;
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: 0 12px 30px rgba(0,0,0,0.2);
          animation: fadeIn 0.3s ease-in-out;
          border: 1px solid #c8e1ff;
        }
        .modal h2 {
          margin: 0 0 0.5rem;
          font-size: 1.4rem;
          color: #1a3c6e;
        }
        .modal input,
        .modal textarea {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #aac9f0;
          border-radius: 10px;
          font-size: 1rem;
          background: #ffffff;
        }
        .modal textarea {
          min-height: 80px;
          resize: none;
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 0.5rem;
        }
        .modal-actions button {
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }
        .modal-actions button:first-child {
          background: linear-gradient(90deg,#6a11cb,#2575fc);
          color: #fff;
        }
        .modal-actions .cancel {
          background: #e3eaf7;
          color: #333;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @media(max-width:600px){
          .form-section { flex-direction: column; gap: 0.8rem; }
        }
        .search-bar {
          padding: 0.75rem 1.2rem;
          border-radius: 14px;
          border: 1px solid #ccc;
          outline: none;
          font-size: 1rem;
        }
        .filter-btn {
          padding: 13px 20px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          background: linear-gradient(90deg, #ff6a00, #ee0979);
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
          box-shadow: 0 8px 26px rgba(238, 9, 121, 0.13);
          transition: transform 0.13s, box-shadow 0.2s;
        }
        .filter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(238, 9, 121, 0.18);
        }
        .button-group-under-search {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .filters-and-add {
          display: flex;
          flex-direction: row;
          gap: 1.2rem;
          align-items: center;
          margin-top: 0.7rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .filters {
          display: flex;
          gap: 1rem;
        }
      `}</style>
    </div>
  );
}
