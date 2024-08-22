import { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const login = () => {
    sessionStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    sessionStorage.removeItem("isLoggedIn");
  };

  const isAuthenticated = () => {
    return sessionStorage.getItem("isLoggedIn") === "true";
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
