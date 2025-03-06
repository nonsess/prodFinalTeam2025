"use client"
import { createContext, useState, useEffect, useContext } from 'react';
import { getUser } from "@/services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && storedToken !== "undefined") {
      setIsAuth(true);
      setToken(storedToken);
      getUser(storedToken)
        .then(userData => {
          setUser(userData);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken && isTokenExpired(storedToken)) {
        localStorage.removeItem('token');
        setIsAuth(false);
        setToken(null);
        setUser(null);
      }
    };

    checkTokenExpiration();

    const interval = setInterval(checkTokenExpiration, 180000);

    return () => clearInterval(interval);
  }, []);

  const login = async (newToken) => {
    setToken(newToken);
    setIsAuth(true);
    localStorage.setItem('token', newToken);
    const userData = await getUser(newToken);
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        isAuth,
        user,
        setUser,
        isLoading,
        setUserData,
        userData
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(AuthContext)
}

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > exp;
  } catch (e) {
    return true;
  }
};