import React, { useState } from "react";

export default function StudentProfile() {
  const [info, setInfo] = useState({
    name: "",
    dob: "",
    phone: "",
    email: "",
    department: "",
    regno: "",
  });

  const [profilePic, setProfilePic] = useState(null);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Student Profile Saved:\n" + JSON.stringify(info, null, 2));
  };

  const handlePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div className="profile-wrapper">
      <h2 className="title">Student Profile</h2>

      <div className="profile-card">
        <div className="profile-left">
          {/* Clickable circle instead of choose file button */}
          <label htmlFor="fileInput" className="pic-box">
            {profilePic ? (
              <img src={profilePic} alt="Profile" />
            ) : (
              <div className="placeholder">Upload Photo</div>
            )}
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handlePicUpload}
            style={{ display: "none" }}
          />

          {/* Edit Profile Button */}
          <button className="edit-btn">Edit Profile</button>
        </div>

        <div className="profile-right">
          <div className="form-group">
            <label>Full Name</label>
            <input
              placeholder="Enter full name"
              name="name"
              value={info.name}
              onChange={handleChange}
              className="gradient-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={info.dob}
                onChange={handleChange}
                className="gradient-input"
              />
            </div>
            <div className="form-group">
              <label>Register Number</label>
              <input
                placeholder="Enter register number"
                name="regno"
                value={info.regno}
                onChange={handleChange}
                className="gradient-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
              <input
                placeholder="Enter phone number"
                name="phone"
                value={info.phone}
                onChange={handleChange}
                className="gradient-input"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                value={info.email}
                onChange={handleChange}
                className="gradient-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              placeholder="Enter department"
              name="department"
              value={info.department}
              onChange={handleChange}
              className="gradient-input"
            />
          </div>

          <button className="save-btn" onClick={handleSave}>
            Save Profile
          </button>
        </div>
      </div>

      <style>{`
        :root {
          --primary: #090b0dff;
          --secondary: #43cea2;
          --text-dark: #222;
          --text-light: #555;
          --border: #ddd;
          --button-gradient: linear-gradient(90deg, #ff6a00, #ee0979);
        }

        .profile-wrapper {
          min-height: 100vh;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: url("/src/assets/bg.jpg") no-repeat center center fixed;
          background-size: cover;
          font-family: "Inter", system-ui, sans-serif;
          color: var(--text-dark);
        }

        .title {
          font-size: 2.4rem;
          font-weight: 700;
          margin-bottom: 30px;
          color: var(--primary);
          letter-spacing: 0.5px;
          position: relative;
        }

        .title::after {
          content: "";
          width: 120px;
          height: 4px;
          background: var(--secondary);
          display: block;
          margin: 8px auto 0;
          border-radius: 2px;
        }

        .profile-card {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 3rem;
          width: 100%;
          max-width: 1100px;
          min-height: 60vh;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          display: flex;
          gap: 2.5rem;
          animation: fadeIn 0.5s ease-in-out;
        }

        .profile-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pic-box {
          width: 250px;
          height: 250px;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid var(--border);
          display: flex;
          justify-content: center;
          align-items: center;
          background: #e0e0e0;
          margin-bottom: 12px;
          position: relative;
          cursor: pointer;
        }

        .pic-box:hover {
          opacity: 0.85;
        }

        .pic-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .placeholder {
          color: var(--text-light);
          font-size: 0.95rem;
        }

        /* Edit Button */
        .edit-btn {
          margin-top: 12px;
          padding: 10px 20px;
          border: none;
          border-radius: 12px;
          background: var(--button-gradient);
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.2s ease;
        }

        .edit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(238,9,121,0.2);
        }

        .profile-right {
          flex: 2;
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 2.4rem;
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          margin-bottom: 6px;
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-dark);
        }

        .form-group input {
          width: 100%;
          padding: 16px;
          border-radius: 10px;
          border: 1px solid var(--border);
          outline: none;
          font-size: 16px;
          background: #fafafa;
          transition: all 0.25s ease;
          text-align: left; /* Ensures text alignment */
        }

        .form-group input:focus {
          border-color: var(--primary);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(24, 90, 157, 0.2);
        }

        .form-row {
          display: flex;
          gap: 2.4rem;
        }

        .save-btn {
          margin-top: 24px;
          align-self: flex-end;
          padding: 16px 32px;
          border: none;
          border-radius: 14px;
          background: var(--button-gradient);
          color: #fff;
          font-weight: 700;
          font-size: 17px;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(238,9,121,0.2);
          transition: transform 0.15s ease-in-out, box-shadow 0.2s ease-in-out;
        }

        .save-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 34px rgba(238,9,121,0.3);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .profile-card {
            flex-direction: column;
          }
          .form-row {
            flex-direction: column;
          }
          .save-btn {
            width: 100%;
            align-self: center;
          }
        }

        .personal-info-wrapper {
          min-height: 100vh;
          padding: 2rem;
          font-family: 'Inter', sans-serif;
          background: url("/src/assets/bg.jpg") no-repeat center center fixed;
          background-size: cover;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .personal-info-form {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 6px 24px rgba(0,0,0,0.13);
          padding: 2rem;
          width: 100%;
          max-width: 600px;
        }
        .form-row {
          display: flex;
          justify-content: space-between;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .form-group {
          flex: 1;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }
        .gradient-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          border: 1px solid #c5b3f7; /* Enhanced border contrast */
          background-color: #e5d1ff !important; /* Increased background contrast */
          color: #333;
          font-size: 1rem;
          outline: none;
        }
        .gradient-input::placeholder {
          color: #666;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}
