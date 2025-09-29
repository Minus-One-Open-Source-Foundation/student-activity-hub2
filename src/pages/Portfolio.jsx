import React, { useState } from "react";
import { FaTrash, FaDownload } from "react-icons/fa";

export default function ResumeManagement() {
  const [resumes, setResumes] = useState([]);

  // Ensure the resumes are displayed in the order they are uploaded without changing the layout or alignment
  const handleUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const newResumes = uploadedFiles.map((file) => ({
      file,
      role: "",
    }));
    setResumes((prevResumes) => [...prevResumes, ...newResumes]);
  };

  const handleDelete = (index) => {
    setResumes(resumes.filter((_, i) => i !== index));
  };

  const handleRoleChange = (index, role) => {
    const updatedResumes = [...resumes];
    updatedResumes[index].role = role;
    setResumes(updatedResumes);
  };

  const handleDownload = (file) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePreview = (file) => {
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
  };

  const handleSaveRole = (index) => {
    const role = resumes[index].role;
    alert(`Role saved: ${role}`); // Replace with actual save logic
  };

  return (
    <div className="resume-management-wrapper">
      <header>
        <h1>Unified Resume Management System</h1>
        <p>Upload, preview, and manage your resumes</p>
      </header>

      <label className="upload-btn">
        Upload Resumes
        <input
          type="file"
          hidden
          multiple
          accept="application/pdf"
          onChange={handleUpload}
        />
      </label>

      <section className="resumes-container">
        {resumes.length === 0 ? (
          <div className="empty">No resumes uploaded yet.</div>
        ) : (
          resumes.map((resume, index) => (
            <div key={index} className="resume-card">
              <div
                className="resume-preview"
                onClick={() => handlePreview(resume.file)}
                style={{ cursor: 'pointer' }}
              >
                <iframe
                  src={URL.createObjectURL(resume.file)}
                  title="Resume Preview"
                  style={{
                    width: "200px",
                    height: "350px", // Increased height to make the PDF length larger inside the box
                    border: "none",
                    pointerEvents: "none", // Prevent scrolling
                  }}
                ></iframe>
              </div>
              <div style={{ position: 'relative', width: '100%' }}>
                <input
                  type="text"
                  placeholder="Enter role description"
                  value={resume.role}
                  onChange={(e) => handleRoleChange(index, e.target.value)}
                  style={{ width: '80%', paddingRight: '4rem' }} // Reduced width to ensure the button fits properly
                />
                <button
                  onClick={() => handleSaveRole(index)}
                  style={{
                    position: 'absolute',
                    right: '0.5rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'red',
                    color: 'white',
                    padding: '0.3rem 0.5rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    width: '3rem', // Adjusted width to fit inside the box
                    height: '1.5rem', // Adjusted height to fit inside the box
                  }}
                >
                  Save
                </button>
              </div>
              <p className="role-display">Role: {resume.role}</p>
              <button
                onClick={() => handleDownload(resume.file)}
                style={{
                  background: "linear-gradient(90deg, #6a11cb, #2575fc)",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                Download
              </button>
              <div style={{ position: "relative", width: "100%" }}>
                <button
                  onClick={() => handleDelete(index)}
                  style={{
                    position: "absolute",
                    top: "0.5rem",
                    right: "0.5rem",
                    background: "none",
                    border: "none",
                    color: "#ff4b5c",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      <style>{`
        .resume-management-wrapper {
          min-height: 100vh;
          padding: 3rem 2rem;
          background: url("/src/assets/bg.jpg") no-repeat center center fixed;
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

        .upload-btn {
          display: inline-block;
          padding: 0.8rem 1.5rem;
          background: linear-gradient(90deg,#6a11cb,#2575fc);
          color: #fff;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          margin-bottom: 2rem;
          transition: transform 0.15s, box-shadow 0.2s;
        }

        .upload-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }

        .resumes-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem; /* Increased gap slightly to provide more space between cards */
        }

        .resume-card {
          width: 345px; /* Increased width to accommodate the delete logo inside the card */
          height: 400px; /* Increased height for better spacing */
          background: #f9f9f9;
          border-radius: 12px;
          padding: 0.5rem; /* Reduced padding to minimize space */
          display: flex;
          flex-direction: column;
          gap: 0.2rem; /* Reduced gap between elements inside the card */
          font-weight: 600;
          transition: transform 0.25s, box-shadow 0.25s;
          align-items: center;
        }

        .resume-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
        }

        .resume-preview {
          width: 200px;
          height: 200px;
          background: #e0e0e0;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          overflow: hidden;
          margin: 0 auto;
        }

        .resume-card input {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 0.9rem;
          width: 90%;
        }

        .role-display {
          font-size: 0.9rem;
          color: #555;
        }

        .resume-card button {
          background: none;
          border: none;
          color: #ff4b5c;
          cursor: pointer;
          font-size: 1.1rem;
        }

        .empty {
          text-align: center;
          font-size: 1rem;
          color: #999;
          grid-column: 1/-1;
        }

        @media(max-width:600px){
          .upload-btn { width: 100%; text-align: center; }
        }
      `}</style>
    </div>
  );
}
