// app/contexts/auth-context.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Mock signup function
  const signup = ({ username, email, phone, password }) => {
    const newUser = {
      id: "user_" + Math.random().toString(36).substr(2, 9),
      username,
      email,
      phone,
      token: "mock_token_" + Math.random().toString(36).substr(2, 9),
    };
    setUser(newUser);
  };

  // ✅ Mock login function
  const login = ({ id, username, email, phone, token }) => {
    setUser({ id, username, email, phone, token });
  };

  // ✅ Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
