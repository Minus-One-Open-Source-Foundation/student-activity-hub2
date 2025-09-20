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
      link.href = `/${sem.file}`; // Place PDFs in public folder with these names
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
              <span className="grade">Click to Download</span>
            ) : (
              <span className="grade not-uploaded-text">Not Yet Uploaded</span>
            )}
          </div>
        ))}
      </section>
      <style>{`
        .records-wrapper {
          min-height: calc(100vh - 3cm);
          padding: 3rem 2rem 1cm 2rem;
          background: linear-gradient(135deg,#f5f7fa,#e0e0e0);
          font-family: 'Inter', sans-serif;
          color: #111;
        }
        header {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        header h1 {
          font-size: 2.2rem;
          font-weight: 700;
          background: linear-gradient(90deg,#ff6a00,#ee0979);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        header p {
          font-size: 1rem;
          color: #555;
        }
        .cards-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
        }
        .record-card {
          background: #fff;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 12px 28px rgba(0,0,0,0.12);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.25s, box-shadow 0.25s;
          text-align: center;
        }
        .record-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
        .record-card h3 {
          margin: 0 0 0.5rem;
          font-size: 1.3rem;
          font-weight: 700;
        }
        .grade {
          font-size: 1rem;
          color: #555;
          background: #f0f0f0;
          padding: 0.3rem 0.8rem;
          border-radius: 8px;
        }
        .not-uploaded {
          opacity: 0.7;
          background: #f8f8f8;
        }
        .not-uploaded-text {
          color: #999;
          background: #ececec;
        }
        @media(max-width:600px){
          .cards-container { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
