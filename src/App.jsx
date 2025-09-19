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
import { useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";

// Extra Pages
import HackWorkshops from "./pages/HackWorkshops";
import Internships from "./pages/Internships";

function App() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
        <Route path="/academic-records" element={<AcademicRecords />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/hackathons-workshops" element={<HackWorkshops />} />
        <Route path="/internships" element={<Internships />} />
      </Routes>
    </Layout>
  );
}

export default App;
