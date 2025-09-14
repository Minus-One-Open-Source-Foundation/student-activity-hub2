import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const accentGradient = "linear-gradient(90deg,#ff6a00,#ee0979)";

  const linkStyle = {
    padding: "12px 18px",
    borderRadius: "12px",
    textDecoration: "none",
    color: "#fff",
    fontWeight: 600,
    background: "rgba(255,255,255,0.08)",
    transition: "box-shadow 0.22s, background 0.18s",
    border: "1px solid rgba(255,255,255,0.12)",
    fontSize: "1rem"
  };

  const activeStyle = {
    background: "rgba(255,255,255,0.12)",
    boxShadow: "0 8px 26px rgba(238,9,121,0.13)",
    borderColor: "#ffd700"
  };

  return (
    <div
      style={{
        width: "238px",
        background: "linear-gradient(135deg,#667eea 0%,#764ba2 100%)",
        color: "#fff",
        minHeight: "100vh",
        padding: "22px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
      }}
    >
      <div>
        <h2 style={{
          marginBottom: "26px",
          textAlign: "center",
          fontWeight: 700,
          fontSize: "1.46rem",
          lineHeight:"1.08",
          background: "linear-gradient(90deg,#fff,#ffd700)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>
           Student Hub
        </h2>
        <nav style={{display:"flex",flexDirection:"column",gap:"10px"}}>
          {[
            { to: "/", label: "Dashboard" },
            { to: "/personal-info", label: "Personal Info" },
            { to: "/academic-records", label: "Academic Records" },
            { to: "/activities", label: "Activities" },
            { to: "/achievements", label: "Achievements" },
            { to: "/portfolio", label: "Portfolio" },
            { to: "/analytics", label: "Analytics" }
          ].map((item, i) => (
            <NavLink
              key={i}
              to={item.to}
              style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        onClick={() => { logout(); navigate("/login"); }}
        style={{
          marginBottom: "60px",
          background: accentGradient,
          border: "none",
          padding: "13px 20px",
          color: "#fff",
          borderRadius: "12px",
          cursor: "pointer",
          fontWeight: 700,
          fontSize: "1rem",
          boxShadow: "0 8px 26px rgba(238,9,121,0.13)",
          transition: "transform .13s"
        }}
      >
        Logout
      </button>

      <style>{`
        @media (max-width:520px){
          div[style] { width:100vw !important; padding:1rem !important; }
          h2 { font-size:1.15rem !important;}
        }
      `}</style>
    </div>
  );
}
