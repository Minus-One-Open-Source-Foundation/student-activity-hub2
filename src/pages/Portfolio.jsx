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
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>📂 Digital Portfolio</h2>

      <label
        style={{
          display: "inline-block",
          padding: "10px 20px",
          background: "#6a11cb",
          color: "#fff",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Upload Documents
        <input type="file" hidden multiple onChange={handleUpload} />
      </label>

      <div>
        {files.length === 0 ? (
          <p style={{ color: "#444" }}>No documents uploaded yet.</p>
        ) : (
          files.map((file, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.8)",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{file.name}</span>
              <button
                onClick={() => handleDelete(file.name)}
                style={{
                  background: "red",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "5px 10px",
                  cursor: "pointer",
                }}
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
