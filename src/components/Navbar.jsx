import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: "linear-gradient(90deg, #2563eb, #1e40af)",
        boxShadow: 3,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: "0.5px" }}
        >
          Student Activity Hub
        </Typography>
        {user ? (
          <>
            <Typography
              variant="body1"
              sx={{ mr: 3, fontWeight: 500 }}
            >
              👋 Welcome, {user.email}
            </Typography>
            <Button
              color="inherit"
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
              }}
              onClick={logout}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            color="inherit"
            sx={{
              border: "1px solid white",
              borderRadius: "6px",
              px: 2,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
