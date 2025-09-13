import React, { useState } from "react";

export default function PersonalInfo() {
  const [info, setInfo] = useState({
    name: "",
    dob: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Personal Info Saved: " + JSON.stringify(info, null, 2));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background: "linear-gradient(135deg, #43cea2, #185a9d)",
        fontFamily: "Arial, sans-serif",
        color: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>👤 Personal Information</h2>

      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <input
          placeholder="Full Name"
          name="name"
          value={info.name}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="date"
          name="dob"
          value={info.dob}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          placeholder="Phone"
          name="phone"
          value={info.phone}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          placeholder="Address"
          name="address"
          value={info.address}
          onChange={handleChange}
          style={inputStyle}
        />

        <button onClick={handleSave} style={btnStyle}>
          Save
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  fontSize: "14px",
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  background: "#ffd369",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};
