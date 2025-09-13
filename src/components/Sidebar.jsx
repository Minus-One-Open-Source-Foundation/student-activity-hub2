import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkStyle = {
    padding: "10px 14px",
    borderRadius: "6px",
    textDecoration: "none",
    color: "white",
    fontWeight: 500,
    transition: "0.3s",
  };

  const activeStyle = {
    background: "#2563eb",
  };

  return (
    <div
      style={{
        width: "230px",
        background: "#1e293b",
        color: "white",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h2 style={{ marginBottom: "25px", textAlign: "center" }}>🎓 Student Hub</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            { to: "/", label: "Dashboard" },
            { to: "/personal-info", label: "Personal Info" },
            { to: "/academic-records", label: "Academic Records" },
            { to: "/activities", label: "Activities" },
            { to: "/achievements", label: "Achievements" },
            { to: "/portfolio", label: "Portfolio" },
            { to: "/analytics", label: "Analytics" },
          ].map((item, i) => (
            <NavLink
              key={i}
              to={item.to}
              style={({ isActive }) =>
                isActive ? { ...linkStyle, ...activeStyle } : linkStyle
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        style={{
          marginBottom: "60px", // 👈 slightly above bottom
          background: "#ef4444",
          border: "none",
          padding: "10px 16px",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        Logout
      </button>
    </div>
  );
}
