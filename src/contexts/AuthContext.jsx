import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // default test user
  const defaultUser = { email: "student@test.com", password: "12345678" };

  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([defaultUser]); // store multiple users in memory

  const login = (email, password) => {
    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (existingUser) {
      setUser({ email: existingUser.email });
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
