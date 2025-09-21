import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((s) => ({ ...s, [e.target.name]: null }));
    setFeedback(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.password || form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setFeedback({ text: "Please fix the errors above", type: "error" });
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      await login(form.email, form.password);
      setFeedback({ text: "Login successful — redirecting...", type: "success" });
      setTimeout(() => navigate("/"), 900);
    } catch (error) {
      setFeedback({ 
        text: error.response?.data?.message || error.message || "Login failed. Please check your credentials.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <form className="auth-card" onSubmit={handleSubmit} autoComplete="off" noValidate>
        <h1 className="title">Welcome Back</h1>
        <p className="subtitle">Sign in to access your student dashboard</p>

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

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          className="ghost-btn"
          onClick={() => navigate("/register")}
          disabled={loading}
        >
          Create an account
        </button>

        {feedback && (
          <div className={`feedback ${feedback.type === "success" ? "fb-success" : "fb-error"}`}>
            {feedback.text}
          </div>
        )}
      </form>

      <style>{`
        :root {
          --card-bg: rgba(255,255,255,0.12);
          --input-bg: rgba(255,255,255,0.14);
          --glass-border: rgba(255,255,255,0.18);
          --accent-1: #ff6a00;
          --accent-2: #ee0979;
        }
        *{box-sizing:border-box}
        .auth-wrapper{
          min-height:100vh;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:2rem;
          background: linear-gradient(135deg,#667eea 0%,#764ba2 100%);
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        }
        .auth-card{
          width:100%;
          max-width:420px;
          background:var(--card-bg);
          backdrop-filter: blur(12px) saturate(120%);
          border-radius:18px;
          padding:2.4rem;
          box-shadow: 0 18px 50px rgba(0,0,0,0.25);
          display:flex;
          flex-direction:column;
          gap:0.9rem;
          color: #fff;
        }
        .title{
          margin:0;
          text-align:center;
          font-size:1.9rem;
          line-height:1.05;
          font-weight:700;
          background: linear-gradient(90deg,#fff,#ffd700);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }
        .subtitle{ margin:0; text-align:center; color:rgba(255,255,255,0.85); font-size:0.98rem; margin-bottom:0.6rem; }
        .label{ font-size:0.95rem; margin-top:0.6rem; margin-bottom:0.35rem; color:rgba(255,255,255,0.92); font-weight:600; }
        .input{ width:100%; padding:0.9rem 1rem; border-radius:12px; border:1px solid var(--glass-border); background:var(--input-bg); color:#fff; font-size:1rem; outline:none; transition:box-shadow .18s, transform .12s; }
        .input::placeholder{ color: rgba(255,255,255,0.72); }
        .input:focus{ box-shadow:0 6px 18px rgba(0,0,0,0.25); transform:translateY(-1px); border-color: rgba(255,255,255,0.95); }
        .input-error{ box-shadow: none; border-color: #ff6b6b !important; }
        .field-error{ color:#ffb4b4; font-size:0.86rem; margin-top:0.35rem; }
        .password-row{ position:relative; display:flex; align-items:center; gap:0.6rem; }
        .toggle-btn{ position:absolute; right:0.5rem; top:50%; transform:translateY(-50%); background:transparent; border:none; color:#fff; font-weight:600; cursor:pointer; padding:0.15rem 0.6rem; border-radius:8px; }
        .primary-btn{ margin-top:0.65rem; background:linear-gradient(90deg,var(--accent-1),var(--accent-2)); border:none; padding:0.95rem; border-radius:12px; color:#fff; font-weight:700; font-size:1rem; cursor:pointer; box-shadow:0 10px 30px rgba(238,9,121,0.14); transition: transform .12s; }
        .primary-btn:disabled{ opacity:0.7; cursor:not-allowed; transform:none; }
        .primary-btn:not(:disabled):hover{ transform:translateY(-3px); }
        .ghost-btn{ margin-top:0.25rem; background:transparent; color:#fff; border:none; text-decoration:underline; font-weight:600; cursor:pointer; }
        .feedback{ margin-top:0.6rem; padding:0.6rem; border-radius:10px; text-align:center; font-weight:700; }
        .fb-success{ background:#d8ffe8; color:#006b29; }
        .fb-error{ background:#fff2f3; color:#b00020; }
        @media (max-width:520px){
          .auth-card{ padding:1.6rem; border-radius:14px; }
          .title{ font-size:1.6rem; }
        }
      `}</style>
    </div>
  );
}
