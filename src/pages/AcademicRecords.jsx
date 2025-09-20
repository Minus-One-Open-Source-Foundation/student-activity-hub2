import React from "react";

export default function AcademicRecords() {
  const semesters = [
    { id: 1, file: "sem1.pdf" },
    { id: 2, file: "sem2.pdf" },
    { id: 3, file: "sem3.pdf" },
    { id: 4, file: "sem4.pdf" },
    { id: 5, file: "sem5.pdf" },
    { id: 6, file: null },
    { id: 7, file: null },
    { id: 8, file: null },
  ];

  const handleClick = (sem) => {
    if (sem.file) {
      const link = document.createElement("a");
      link.href = `/${sem.file}`;
      link.download = sem.file;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(`Marksheet for Semester ${sem.id} is not yet uploaded.`);
    }
  };

  return (
    <div className="records-wrapper">
      <header>
        <h1>Academic Records</h1>
        <p>Click on a semester to view or download the marksheet</p>
      </header>

      <section className="cards-container">
        {semesters.map((sem) => (
          <div
            key={sem.id}
            className={`record-card ${!sem.file ? "not-uploaded" : ""}`}
            onClick={() => handleClick(sem)}
          >
            <h3>Semester {sem.id}</h3>
            {sem.file ? (
              <span className="status uploaded">Download</span>
            ) : (
              <span className="status not-uploaded-text">Not Uploaded</span>
            )}
          </div>
        ))}
      </section>

      {/* Inline Styles */}
      <style>{`
        .records-wrapper {
          min-height: 100vh;
          padding: 3rem 1.5rem;
          background: url("/src/assets/bg.jpg") no-repeat center center fixed;
          background-size: cover;
          font-family: "Inter", sans-serif;
          color: #222;
        }

        header {
          text-align: center;
          margin-bottom: 3rem;
        }

        header h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        header p {
          font-size: 1rem;
          color: #475569;
        }

        .cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .record-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 2rem 1.5rem;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-align: center;
        }

        .record-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
        }

        .record-card h3 {
          margin-bottom: 1rem;
          font-size: 1.3rem;
          font-weight: 600;
          color: #0f172a;
        }

        .status {
          display: inline-block;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 10px;
          transition: background 0.3s, color 0.3s;
        }

        .uploaded {
          background: #e0f2fe;
          color: #0369a1;
        }

        .record-card:hover .uploaded {
          background: #bae6fd;
          color: #075985;
        }

        .not-uploaded {
          opacity: 0.85;
        }

        .not-uploaded-text {
          background: #f1f5f9;
          color: #64748b;
        }

        @media (max-width: 600px) {
          .cards-container {
            grid-template-columns: 1fr;
          }
          header h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
