import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const [appLoading, setAppLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [role, setRole] = useState(null);

  const fetchUser = async () => {
    setAppLoading(true);
    try {
      const { data } = await api.get(`/auth/logged-in-user`);
      const role = data.session.role;

      setRole(role);
      setIsAdmin(role === "Admin");
      setCurrentUser(data.session);
    } catch (error) {
      console.error("Error fetching current user", error);
    } finally {
      setAppLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <ContextApi.Provider
      value={{
        currentUser,
        setCurrentUser,
        role,
        appLoading,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(ContextApi);
  if (!context) {
    throw new Error("useMyContext must be used within a ContextProvider");
  }
  return context;
};
