/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { auth } from "../component/firebase/config";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      const check = { user };
      if (check) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });
        setIsLoading(false);
        navigate("/");
      } else {
        navigate("/login");
      }
    });

    //Clean function
    return () => {
      unsubscribed();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={user}>
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
