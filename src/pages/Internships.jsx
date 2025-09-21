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
  const [openCard, setOpenCard] = useState(null);
  const [search, setSearch] = useState("");
  const [newInternship, setNewInternship] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
    file: null,
  });

  const handleChange = (e) =>
    setNewInternship({ ...newInternship, [e.target.name]: e.target.value });

  const handleFileUpload = (e) =>
    setNewInternship({ ...newInternship, file: e.target.files[0] });

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

  const filteredInternships = internships.filter(
    (intern) =>
      intern.company.toLowerCase().includes(search.toLowerCase()) ||
      intern.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "'Inter', sans-serif",
        background: `url("/src/assets/bg.jpg") no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            background: "linear-gradient(90deg,#ff6a00,#ee0979)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "0.5rem",
          }}
        >
          Internships
        </h1>
        <p style={{ fontSize: "1rem", color: "#080606ff", marginBottom: "1rem" }}>
          Manage your internship experiences
        </p>
        <input
          type="text"
          placeholder="Search by company or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "0.7rem 1rem",
            borderRadius: "12px",
            border: "1px solid #ccc",
            marginRight: "1rem",
            width: "250px",
            fontSize: "0.95rem",
          }}
        />
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: "1rem 2.2rem",
            fontSize: "1rem",
            background: "linear-gradient(90deg,#ff6a00,#ee0979)",
            border: "none",
            color: "#fff",
            fontWeight: 600,
            borderRadius: "16px",
            cursor: "pointer",
            marginTop: "0.5rem",
          }}
        >
          + Add Internship
        </button>
      </header>

      {/* Centered Modal Form */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "1rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "450px",
              background: "#fff",
              padding: "2rem",
              borderRadius: "18px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: "1rem" }}>
              Add New Internship
            </h3>
            <form onSubmit={handleSubmit}>
              <label>Company Name</label>
              <input
                type="text"
                name="company"
                value={newInternship.company}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginBottom: "1rem",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                }}
                required
              />
              <label>Role / Position</label>
              <input
                type="text"
                name="role"
                value={newInternship.role}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginBottom: "1rem",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                }}
                required
              />
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={newInternship.startDate}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginBottom: "1rem",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                }}
                required
              />
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={newInternship.endDate}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginBottom: "1rem",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                }}
                required
              />
              <label>Description</label>
              <textarea
                name="description"
                value={newInternship.description}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  marginBottom: "1rem",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                }}
                required
              />
              <label>Upload Certificate</label>
              <input
                type="file"
                onChange={handleFileUpload}
                style={{ marginBottom: "1rem" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(90deg,#ff6a00,#ee0979)",
                    border: "none",
                    color: "#fff",
                    padding: "0.6rem 1.5rem",
                    fontSize: "1rem",
                    borderRadius: "12px",
                    cursor: "pointer",
                  }}
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#555",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {filteredInternships.map((intern) => (
          <div
            key={intern.id}
            style={{
              padding: "1.5rem",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(12px)",
              color: "#111",
              boxShadow: "0 12px 28px rgba(0,0,0,0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            <h3 style={{ margin: "0 0 0.5rem" }}>{intern.role}</h3>
            <span style={{ fontSize: "0.9rem", color: "#222" }}>
              {intern.company}
            </span>
            <div
              style={{
                fontSize: "0.85rem",
                color: "#333",
                margin: "0.5rem 0",
              }}
            >
              {intern.startDate} - {intern.endDate}
            </div>
            {openCard === intern.id && (
              <p style={{ marginBottom: "0.5rem" }}>{intern.description}</p>
            )}
            {intern.file && openCard === intern.id && (
              <a
                href={URL.createObjectURL(intern.file)}
                download
                style={{
                  display: "inline-block",
                  marginTop: "0.5rem",
                  textDecoration: "none",
                  background: "#ff6a00",
                  color: "#fff",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                }}
              >
                📎 Download Certificate
              </a>
            )}
            <button
              onClick={() =>
                setOpenCard(openCard === intern.id ? null : intern.id)
              }
              style={{
                marginTop: "0.8rem",
                border: "none",
                background: "transparent",
                color: "#ee0979",
                cursor: "pointer",
              }}
            >
              {openCard === intern.id ? "Hide Details" : "Show Details"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
