import React, { useState } from "react";
import { FaTrophy, FaCheckCircle, FaExclamationCircle, FaFileAlt } from "react-icons/fa";

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [formData, setFormData] = useState({
    title: "",
    category: "Symposium",
    date: "",
    description: "",
    file: null,
    status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const saveAchievement = () => {
    if (!formData.title.trim()) {
      alert("Please enter a title!");
      return;
    }
    setAchievements([...achievements, formData]);
    setFormData({
      title: "",
      category: "Symposium",
      date: "",
      description: "",
      file: null,
      status: "Pending",
    });
    setShowForm(false);
  };

  const filteredAchievements = achievements.filter(
    (ach) =>
      (activeCategory === "All" || ach.category === activeCategory) &&
      (ach.title.toLowerCase().includes(search.toLowerCase()) ||
        ach.category.toLowerCase().includes(search.toLowerCase()) ||
        (ach.description && ach.description.toLowerCase().includes(search.toLowerCase())) ||
        (ach.date && ach.date.includes(search)))
  );

  const categories = ["All", "Symposium", "Academic Certification", "Others"];

  return (
    <div className="achievements-wrapper">
      <h1>Achievements</h1>
      <p>Add and manage your Symposium Achievements, Academic Certifications</p>

      {/* Top Controls */}
      <div className="top-controls">
        <input
          type="text"
          placeholder="Search achievements..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        <div className="category-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}

          <button className="add-btn" onClick={() => setShowForm(true)}>
            + Add Achievement
          </button>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="form-card" onClick={(e) => e.stopPropagation()}>
            <h2>Add Achievement</h2>

            <input
              type="text"
              name="title"
              placeholder="Achievement Title"
              value={formData.title}
              onChange={handleChange}
            />

            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Symposium">Symposium</option>
              <option value="Academic Certification">Academic Certification</option>
              <option value="Others">Others</option>
            </select>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />

            <input
              type="file"
              name="file"
              onChange={handleFileChange}
            />

            <div className="form-actions">
              <button onClick={saveAchievement}>Submit</button>
              <button className="cancel-btn" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Achievements List */}
      <div className="achievements-list">
        {filteredAchievements.length === 0 ? (
          <p className="empty-text">No achievements found.</p>
        ) : (
          filteredAchievements.map((ach, i) => (
            <div key={i} className="achievement-card">
              <div className="ach-text">
                <div className="category-btn-display">{ach.category}</div>
                <strong>{ach.title}</strong>
                <div className="ach-date">{ach.date}</div>
                <div className="ach-description">{ach.description}</div>
              </div>

              {/* Right-side container */}
              <div className="right-side">
                <div className={`status-box ${ach.status === "Approved" ? "approved" : "pending"}`}>
                  {ach.status === "Approved" ? (
                    <span>
                      <FaCheckCircle style={{ marginRight: "4px" }} /> Approved
                    </span>
                  ) : (
                    <span>
                      <FaExclamationCircle style={{ marginRight: "4px" }} /> Pending
                    </span>
                  )}
                </div>

                <div className="file-preview">
                  {ach.file ? (
                    <img
                      src={URL.createObjectURL(ach.file)}
                      alt="Certificate"
                      className="file-image"
                      onClick={() => window.open(URL.createObjectURL(ach.file), "_blank")}
                    />
                  ) : (
                    <div className="file-placeholder">
                      <FaFileAlt style={{ fontSize: "2rem", color: "#a18cd1" }} />
                      <span>No File</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Styles */}
      <style>{`
        .achievements-wrapper { min-height: 100vh; padding: 3rem 2rem; background: url("/src/assets/bg.jpg") no-repeat center center fixed; background-size: cover; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; align-items: center; }
        h1 { font-size: 2rem; font-weight: 700; color: #000; margin-bottom: 0.5rem; }
        p { color: #555; margin-bottom: 1.5rem; text-align: center; }

        .top-controls { display: flex; flex-direction: column; align-items: stretch; gap: 40px; }
        .search-bar { width: 100%; max-width: 700px; padding: 16px 20px; border-radius: 30px; border: none; outline: none; font-size: 1.1rem; background: linear-gradient(90deg,#a18cd1,#fbc2eb); color: #fff; }
        .search-bar::placeholder { color: #fff; opacity: 0.8; }
        .category-row { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }

        .category-btn { padding: 10px 14px; border-radius: 14px; border: 1px solid #ccc; background: #fff; color: #000; cursor: pointer; font-size: 0.9rem; font-weight: 500; transition: 0.2s; }
        .category-btn.active { background: linear-gradient(90deg,#ff6a00,#ee0979); color: #fff; }

        .category-btn-display { display: inline-block; padding: 8px 16px; border: 2px solid #ff6a00; border-radius: 12px; color: #ff6a00; font-size: 0.9rem; font-weight: 600; background: transparent; cursor: default; margin-bottom: 8px; }

        .add-btn { padding: 12px 20px; background: linear-gradient(90deg,#ff6a00,#ee0979); color: #fff; font-weight: 600; border: none; border-radius: 30px; cursor: pointer; }

        .achievements-list { width: 100%; max-width: 1900px; display: flex; flex-direction: column; gap: 20px; margin-top: 20px; }
        .achievement-card { background: #f9f9f9; padding: 20px; border-radius: 12px; display: flex; justify-content: space-between; align-items: flex-start; box-shadow: 0 4px 15px rgba(0,0,0,0.1); min-height: 140px; }
        .ach-text { display: flex; flex-direction: column; gap: 6px; }
        .ach-date { color: #777; font-size: 0.9rem; font-weight: 400; margin-bottom: 10px; }
        .ach-description { color: #000; font-size: 1rem; }
        .ach-text strong { color: #3a3aee; font-size: 1rem; }

        .right-side { display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .file-preview { width: 140px; height: 140px; display: flex; align-items: center; justify-content: center; }
        .file-image { width: 100%; height: 100%; object-fit: cover; border-radius: 8px; cursor: pointer; }
        .file-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; }

        .status-box { font-weight: bold; font-size: 0.95rem; }
        .status-box.approved { color: #4CAF50; }
        .status-box.pending { color: #FF9800; }

        /* Modal Styles */
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000; }
        .form-card { background: #fff; padding: 25px; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.2); display: flex; flex-direction: column; gap: 12px; width: 90%; max-width: 500px; }
        .form-card input, .form-card select, .form-card textarea { padding: 12px; border: 1px solid #ccc; border-radius: 8px; font-size: 1rem; }
        .form-actions { display: flex; gap: 12px; justify-content: flex-end; }
        .form-actions button:first-child { background: linear-gradient(90deg,#ff6a00,#ee0979); color: #fff; border: none; border-radius: 8px; cursor: pointer; padding: 10px 20px; }
        .cancel-btn { background: #ffffff; color: #000; border: 1px solid #ccc; border-radius: 8px; padding: 10px 20px; cursor: pointer; }
      `}</style>
    </div>
  );
}
