import React, { useState } from "react";
import { FaTrash, FaDownload } from "react-icons/fa";

export default function ResumeManagement() {
  const [resumes, setResumes] = useState([]);

  const handleUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    const newResumes = uploadedFiles.map((file) => ({
      file,
      role: "",
    }));
    setResumes([...resumes, ...newResumes]);
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
              <div className="resume-preview">
                <iframe
                  src={URL.createObjectURL(resume.file)}
                  title="Resume Preview"
                  style={{
                    width: "200px",
                    height: "200px",
                    border: "none",
                    aspectRatio: "1 / 1",
                  }}
                ></iframe>
              </div>
              <input
                type="text"
                placeholder="Enter role description"
                value={resume.role}
                onChange={(e) => handleRoleChange(index, e.target.value)}
              />
              <p className="role-display">Role: {resume.role}</p>
              <button onClick={() => handleDownload(resume.file)}>
                <FaDownload />
              </button>
              <button onClick={() => handleDelete(index)}>
                <FaTrash />
              </button>
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
          gap: 1.5rem;
        }

        .resume-card {
          background: #f9f9f9;
          border-radius: 16px;
          padding: 1rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
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
