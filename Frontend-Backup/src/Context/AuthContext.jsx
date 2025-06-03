import { createContext, useContext } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  function saveToken(token) {
    localStorage.setItem("token", token);
  }
  function saveRole(role) {
    localStorage.setItem("role", role);
  }
  function saveName(name) {
    localStorage.setItem("name", name);
  }
  function getToken() {
    return localStorage.getItem("token");
  }
  function getRole() {
    return localStorage.getItem("role");
  }
  function getName() {
    return localStorage.getItem("name");
  }
  function removeToken() {
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        saveToken,
        removeToken,
        getToken,
        saveRole,
        getRole,
        saveName,
        getName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function Auth() {
  return useContext(AuthContext);
}

export function HaveToken({ children }) {
  const { getToken, getRole } = Auth();

  if (getToken() !== null) {
    if (getRole() == "Guru") {
      return <Navigate to={"/dashboard-guru"} />;
    }
    if (getRole() == "Penerima Tamu") {
      return <Navigate to={"/dashboard-penerima-tamu"} />;
    }
    if (getRole() == "Tamu") {
      return <Navigate to={"/dashboard-tamu"} />;
    }
  }

  return children;
}
export function NoToken({ children }) {
  const { getToken } = Auth();

  if (getToken() == null) {
    return <Navigate to={"/login"} />;
  }

  return children;
}
export function Guru({ children }) {
  const { getToken, getRole } = Auth();
  if (getToken() !== null) {
    if (getRole() == "Penerima Tamu") {
      return <Navigate to={"/dashboard-penerima-tamu"} />;
    }
    if (getRole() == "Admin") {
      return <Navigate to={"/dashboard-admin"} />;
    }
    if (getRole() == "Tamu") {
      return <Navigate to={"/dashboard-tamu"} />;
    }
  }

  return children;
}
export function PenerimaTamu({ children }) {
  const { getToken, getRole } = Auth();
  if (getToken() !== null && getRole() == "Guru") {
    return <Navigate to={"/dashboard-guru"} />;
  }
  if (getToken() !== null && getRole() == "Admin") {
    return <Navigate to={"/dashboard-admin"} />;
  }
  if (getToken() !== null && getRole() == "Tamu") {
    return <Navigate to={"/dashboard-tamu"} />;
  }

  return children;
}
export function Admin({ children }) {
  const { getToken, getRole } = Auth();
  if (getToken() !== null && getRole() == "Guru") {
    return <Navigate to={"/dashboard-guru"} />;
  }
  if (getToken() !== null && getRole() == "Penerima-tamu") {
    return <Navigate to={"/dashboard-penerima-tamu"} />;
  }
  if (getToken() !== null && getRole() == "Tamu") {
    return <Navigate to={"/dashboard-tamu"} />;
  }

  return children;
}
export function Tamu({ children }) {
  const { getToken, getRole } = Auth();
  if (getToken() !== null && getRole() == "Guru") {
    return <Navigate to={"/dashboard-guru"} />;
  }
  if (getToken() !== null && getRole() == "Penerima-tamu") {
    return <Navigate to={"/dashboard-penerima-tamu"} />;
  }
  if (getToken() !== null && getRole() == "Admin") {
    return <Navigate to={"/dashboard-admin"} />;
  }

  return children;
}
