import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // default test user
  // const defaultUser = { email: "student@test.com", password: "12345678" };
  // const defaultFaculty = { email: "faculty@test.com", password: "  // ...existing code...
  const defaultUser = { email: "student@test.com", password: "12345678", role: "student", name: "John Doe" };
  const defaultFaculty = { email: "faculty@test.com", password: "faculty123", role: "faculty", name: "Faculty Name" };
  // ...existing code...", role: "faculty" };

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([defaultUser,defaultFaculty]); // store multiple users in memory
 

  const login = (email, password) => {
    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (existingUser) {
      setUser(existingUser);
      return true;
    }
    return false;
  };

  const register = (name, email, password) => {
    const exists = users.some((u) => u.email === email);
    if (exists) return false;

    const newUser = { name, email, password };
    setUsers([...users, newUser]);
    return true;
  };

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
