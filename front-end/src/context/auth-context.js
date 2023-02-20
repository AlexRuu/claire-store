import axios from "axios";
import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const saveUser = (user) => {
    setUser(user);
  };
  const removeUser = () => {
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      // Might change the url for the get
      const { data } = await axios.get("/api/user/profile");
      saveUser(data.user);
    } catch (error) {
      removeUser();
    }
  };

  const logoutUser = async () => {
    try {
      await axios.delete("/api/auth/logout");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={{ saveUser, user, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider };
