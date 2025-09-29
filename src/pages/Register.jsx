import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    otp: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((s) => ({ ...s, [e.target.name]: null }));
    setFeedback(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim() || form.name.length < 3) newErrors.name = "Enter a valid name (min 3 chars)";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.password || form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords must match";
    if (otpSent && (!form.phone || !/^\d{10}$/.test(form.phone))) newErrors.phone = "Enter a valid 10-digit phone";
    if (otpSent && form.otp !== generatedOtp) newErrors.otp = "Invalid OTP";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = () => {
    if (!form.phone || !/^\d{10}$/.test(form.phone)) {
      setErrors((s) => ({ ...s, phone: "Enter valid 10-digit phone" }));
      return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpSent(true);
    setFeedback({ text: `OTP sent (mock): ${otp}`, type: "info" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setFeedback({ text: "Please fix form errors", type: "error" });
      return;
    }
    
    setLoading(true);
    setFeedback(null);

    try {
      const result = await register(form.name, form.email, form.password);
      console.log('Register result:', result); // Debug log
      setFeedback({ text: "Registration successful! Redirecting to login...", type: "success" });
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error('Registration error details:', error);
      setFeedback({ 
        text: error.message || "Registration failed. Please try again.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h1 className="title">Create Student Account</h1>
        <p className="subtitle">Register to manage your student activity portfolio</p>

        <label className="label">Full Name</label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Your full name"
          className={errors.name ? "input input-error" : "input"}
          disabled={loading}
        />
        {errors.name && <div className="field-error">{errors.name}</div>}

        <label className="label">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={errors.email ? "input input-error" : "input"}
          disabled={loading}
        />
        {errors.email && <div className="field-error">{errors.email}</div>}

        <label className="label">Password</label>
        <div className="password-row">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            placeholder="At least 8 characters"
            className={errors.password ? "input input-error" : "input"}
            disabled={loading}
          />
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && <div className="field-error">{errors.password}</div>}

        <label className="label">Confirm Password</label>
        <div className="password-row">
          <input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Repeat password"
            className={errors.confirmPassword ? "input input-error" : "input"}
            disabled={loading}
          />
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setShowConfirmPassword((s) => !s)}
            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.confirmPassword && <div className="field-error">{errors.confirmPassword}</div>}

        <label className="label">Phone (optional)</label>
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="10-digit phone number"
          className={errors.phone ? "input input-error" : "input"}
          disabled={loading}
        />
        {errors.phone && <div className="field-error">{errors.phone}</div>}

        <button type="button" className="secondary-btn" onClick={handleSendOtp} disabled={loading}>
          {otpSent ? "Resend OTP" : "Send OTP"}
        </button>

        {otpSent && (
          <>
            <label className="label">OTP</label>
            <input
              name="otp"
              type="text"
              value={form.otp}
              onChange={handleChange}
              placeholder="Enter OTP (mock)"
              className={errors.otp ? "input input-error" : "input"}
              disabled={loading}
            />
            {errors.otp && <div className="field-error">{errors.otp}</div>}
          </>
        )}

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <button type="button" className="ghost-btn" onClick={() => navigate("/login")} disabled={loading}>
          Back to Login
        </button>

        {feedback && (
          <div
            className={`feedback ${
              feedback.type === "success"
                ? "fb-success"
                : feedback.type === "info"
                ? "fb-info"
                : "fb-error"
            }`}
          >
            {feedback.text}
          </div>
        )}
      </form>

      <style>{`
        :root {
          --card-bg: rgba(255,255,255,0.85);
          --input-bg: rgba(240, 244, 248, 0.95);
          --glass-border: rgba(200, 217, 223,0.7);
          --accent-1: #6a82fb;
          --accent-2: #fc5c7d;
        }

        * { box-sizing: border-box; }

        .auth-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;

          /* Background image + animated gradient overlay */
          background: url("/src/assets/bg.jpg") center/cover no-repeat,
                      linear-gradient(270deg, #8ec5fc, #e0c3fc, #f0f4f8, #cfd9df);
          background-size: cover, 800% 800%;
          background-blend-mode: overlay;
          animation: gradientMove 25s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: center, 0% 50%; }
          25% { background-position: center, 50% 50%; }
          50% { background-position: center, 100% 50%; }
          75% { background-position: center, 50% 50%; }
          100% { background-position: center, 0% 50%; }
        }

        .auth-card {
          width: 100%;
          max-width: 520px;
          background: var(--card-bg);
          backdrop-filter: blur(12px) saturate(120%);
          border-radius: 18px;
          padding: 2.4rem;
          box-shadow: 0 18px 50px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          color: #2c3e50;
        }

        .title{ margin:0; text-align:center; font-size:1.9rem; font-weight:700; color:#2c3e50; }
        .subtitle{ margin:0; text-align:center; color:#4f5d75; font-size:0.98rem; margin-bottom:0.4rem; }
        .label{ font-size:0.95rem; margin-top:0.5rem; color:#2c3e50; font-weight:600; }
        .input{ width:100%; padding:0.9rem 1rem; border-radius:12px; border:1px solid var(--glass-border); background:var(--input-bg); color:#2c3e50; font-size:1rem; outline:none; transition: box-shadow .18s, transform .12s; }
        .input::placeholder{ color: rgba(44,62,80,0.5); }
        .input:focus{ box-shadow:0 6px 18px rgba(0,0,0,0.1); transform:translateY(-1px); border-color: rgba(44,62,80,0.7); }
        .input-error{ border-color:#fc5c7d !important; }
        .field-error{ color:#e74c3c; font-size:0.86rem; margin-top:0.35rem; }
        .password-row{ position:relative; display:flex; align-items:center; gap:0.6rem; }
        .toggle-btn{ position:absolute; right:0.5rem; top:50%; transform:translateY(-50%); background:transparent; border:none; color:#2c3e50; font-weight:600; cursor:pointer; padding:0.15rem 0.6rem; border-radius:8px; }
        .secondary-btn{ margin-top:0.6rem; background:transparent; border:1px dashed rgba(44,62,80,0.3); color:#2c3e50; padding:0.75rem; border-radius:10px; cursor:pointer; }
        .secondary-btn:hover{ transform:translateY(-2px); }
        .primary-btn{ margin-top:0.8rem; background: linear-gradient(90deg,var(--accent-1),var(--accent-2)); border:none; padding:0.95rem; border-radius:12px; color:#fff; font-weight:700; font-size:1rem; cursor:pointer; }
        .primary-btn:disabled{ opacity:0.7; cursor:not-allowed; }
        .ghost-btn{ margin-top:0.5rem; background:none; border:none; color:#2c3e50; font-weight:600; text-decoration:underline; cursor:pointer; }
        .feedback{ margin-top:0.6rem; padding:0.6rem; border-radius:10px; text-align:center; font-weight:700; }
        .fb-success{ background:#d8ffe8; color:#006b29; }
        .fb-error{ background:#fff2f3; color:#b00020; }
        .fb-info{ background:#dbe7ff; color:#0446c7; }

        @media (max-width:720px){ .auth-card{ padding:1.6rem; } .title{ font-size:1.6rem; } }
      `}</style>
    </div>
  );
}
