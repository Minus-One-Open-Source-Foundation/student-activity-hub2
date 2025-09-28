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
      <form className="auth-card animate-card" onSubmit={handleSubmit} autoComplete="off" noValidate>
        <h1 className="title animate-fade-in">Welcome Back</h1>
        <p className="subtitle">Sign in to access your student dashboard</p>

        <label className="label">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={errors.email ? "input input-error shake" : "input"}
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
            className={errors.password ? "input input-error shake" : "input"}
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

        <button type="submit" className="primary-btn ripple" disabled={loading}>
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
          <div className={`feedback ${feedback.type === "success" ? "fb-success pop-in" : "fb-error shake"}`}>
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

        * { box-sizing: border-box }

        .auth-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;

          /* Background image + gradient overlay */
          background-image: 
            linear-gradient(270deg, rgba(142,197,252,0.75), rgba(224,195,252,0.75), rgba(240,244,248,0.75), rgba(207,217,223,0.75)),
            url("/src/assets/bg.jpg"); /* 👉 replace with your image path */
          background-size: 800% 800%, cover;
          background-position: center;
          background-attachment: fixed;
          animation: gradientMove 25s ease infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%, center; }
          25% { background-position: 50% 50%, center; }
          50% { background-position: 100% 50%, center; }
          75% { background-position: 50% 50%, center; }
          100% { background-position: 0% 50%, center; }
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
          background: var(--card-bg);
          backdrop-filter: blur(12px) saturate(120%);
          border-radius: 18px;
          padding: 2.4rem;
          box-shadow: 0 18px 50px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          color: #2c3e50;
          animation: fadeIn 0.8s ease-out;
        }

        .title {
          margin: 0;
          text-align: center;
          font-size: 1.9rem;
          font-weight: 700;
          color: #2c3e50;
        }

        .subtitle {
          margin: 0;
          text-align: center;
          color: #4f5d75;
          font-size: 0.98rem;
          margin-bottom: 0.6rem;
        }

        .label { font-size: 0.95rem; margin-top:0.6rem; margin-bottom:0.35rem; font-weight:600; color:#2c3e50; }

        .input {
          width: 100%;
          padding: 0.9rem 1rem;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
          background: var(--input-bg);
          color: #2c3e50;
          font-size: 1rem;
          outline: none;
          transition: box-shadow .18s, transform .12s;
        }

        .input::placeholder { color: #7d8ca3; }
        .input:focus { box-shadow: 0 6px 18px rgba(0,0,0,0.1); transform: translateY(-1px); border-color: #a1b5d8; }
        .input-error { border-color: #fc5c7d; }

        .field-error { color: #b00020; font-size: 0.86rem; margin-top: 0.35rem; }

        .password-row { position: relative; display: flex; align-items: center; gap:0.6rem; }

        .toggle-btn { position: absolute; right: 0.5rem; top:50%; transform: translateY(-50%); background:transparent; border:none; color:#2c3e50; font-weight:600; cursor:pointer; padding:0.15rem 0.6rem; border-radius:8px; }

        .primary-btn { margin-top:0.65rem; background: linear-gradient(90deg, var(--accent-1), var(--accent-2)); border:none; padding:0.95rem; border-radius:12px; color:#fff; font-weight:700; font-size:1rem; cursor:pointer; box-shadow:0 10px 20px rgba(102,130,251,0.2); transition: transform .12s, box-shadow .18s; }
        .primary-btn:not(:disabled):hover { transform: translateY(-2px); }
        .primary-btn:disabled { opacity:0.7; cursor:not-allowed; }

        .ghost-btn { margin-top:0.25rem; background:transparent; color:#2c3e50; border:none; text-decoration:underline; font-weight:600; cursor:pointer; }

        .feedback { margin-top:0.6rem; padding:0.6rem; border-radius:10px; text-align:center; font-weight:700; }
        .fb-success { background:#d8ffe8; color:#006b29; }
        .fb-error { background:#fff2f3; color:#b00020; }

        @keyframes fadeIn { from{opacity:0; transform:translateY(-10px);} to{opacity:1; transform:translateY(0);} }
        @keyframes shake { 10%,90%{transform:translateX(-2px);}20%,80%{transform:translateX(4px);}30%,50%,70%{transform:translateX(-6px);}40%,60%{transform:translateX(6px);} }
        @keyframes popIn { from{transform:scale(0.9); opacity:0;} to{transform:scale(1); opacity:1;} }

        .shake { animation: shake 0.4s ease-in-out; }
        .pop-in { animation: popIn 0.4s ease-out; }

        @media (max-width:520px) { .auth-card { padding:1.6rem; border-radius:14px; } .title{font-size:1.6rem;} }
      `}</style>
    </div>
  );
}
