import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function Portfolio() {
  const [files, setFiles] = useState([]);

  const handleUpload = (e) => {
    const uploaded = Array.from(e.target.files);
    const newFiles = uploaded.filter(
      (file) => !files.some((f) => f.name === file.name)
    );
    setFiles([...files, ...newFiles]);
  };

  const handleDelete = (fileName) => {
    setFiles(files.filter((f) => f.name !== fileName));
  };

  return (
    <div className="portfolio-wrapper">
      <header>
        <h1>Digital Portfolio</h1>
        <p>Upload and manage your documents</p>
      </header>

      <label className="upload-btn">
        Upload Documents
        <input type="file" hidden multiple onChange={handleUpload} />
      </label>

      <section className="files-container">
        {files.length === 0 ? (
          <div className="empty">No documents uploaded yet.</div>
        ) : (
          files.map((file, i) => (
            <div key={i} className="file-card">
              <span>{file.name}</span>
              <button onClick={() => handleDelete(file.name)}>
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </section>

      <style>{`
        .portfolio-wrapper {
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

        .files-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }

        .file-card {
          background: #f9f9f9;
          border-radius: 16px;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          transition: transform 0.25s, box-shadow 0.25s;
        }

        .file-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.1);
        }

        .file-card button {
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
