import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 🔑 Default hardcoded student
  const defaultStudent = {
    email: "student@test.com",
    password: "12345678",
    role: "student",
    name: "Student Name",
  };

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([defaultStudent]);

  // 🔐 Login
  const login = (email, password) => {
    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (existingUser) {
      console.log("User logged in:", existingUser);
      setUser(existingUser);
      return true;
    }
    console.log("Login failed for email:", email);
    return false;
  };

  // 🆕 Register (students only)
  const register = (name, email, password) => {
    const exists = users.some((u) => u.email === email);
    if (exists) return false;

    const newUser = { name, email, password, role: "student" };
    setUsers([...users, newUser]);
    return true;
  };

  // 🚪 Logout
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
