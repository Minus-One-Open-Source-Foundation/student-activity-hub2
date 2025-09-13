import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PersonalInfo from "./pages/PersonalInfo";
import AcademicRecords from "./pages/AcademicRecords";
import Activities from "./pages/Activities";
import Achievements from "./pages/Achievements";
import Portfolio from "./pages/Portfolio";
import Analytics from "./pages/Analytics";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./contexts/AuthContext";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";

function App() {
  const { user } = useAuth();

  // 🌈 Custom theme (you can change primary/secondary colors)
  const theme = createTheme({
    palette: {
      mode: "light", // try "dark" too
      primary: {
        main: "#1976d2", // blue
      },
      secondary: {
        main: "#9c27b0", // purple
      },
      background: {
        default: "#f5f6fa",
      },
    },
    shape: {
      borderRadius: 12,
    },
  });

  // 🔒 If not logged in → show login/register only
  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main Content Area */}
        <Box component="main" sx={{ flex: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/personal-info" element={<PersonalInfo />} />
            <Route path="/academic-records" element={<AcademicRecords />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
