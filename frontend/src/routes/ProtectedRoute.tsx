import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }
      try {
        await axios.get("http://localhost:3000/api/user/perfil", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsValid(true);
      } catch {
        setIsValid(false);
      }
    };
    verifyToken();
  }, [token]);

  if (isValid === null) return <p>Cargando...</p>;
  return isValid ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;