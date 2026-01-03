import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [theme, setTheme] = useState("");
  const [fetching, setFetching] = useState(true);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const location = useLocation();

  const login = (userData: any, token?: string) => {
    setUser(userData);
    if (token) {
      setAuthToken(token);
      localStorage.setItem('authToken', token);
    }
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    setUser(null);
    setAuthToken(null);
  };

  const fetchUser = async (userId: string, token?: string) => {
    const activeToken = token || localStorage.getItem('authToken');

    if (!activeToken) {
      setFetching(false);
      setUser(null);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch(`${url}/users/${userId}`, {
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${activeToken}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        setAuthToken(activeToken);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        throw new Error(data.message);
      }
    } catch (error: any) {
      console.error('Fetch error:', error.message);
    } finally {
      clearTimeout(timeoutId);
      setFetching(false);
    }
  };

  useEffect(() => {
    setFetching(true);
    const storedToken = localStorage.getItem('authToken');
    const storageData = localStorage.getItem('user');

    if (storageData && storedToken) {
      try {
        const user = JSON.parse(storageData);
        if (user && user._id) {
          fetchUser(user._id, storedToken);
        } else {
          setUser(null);
          setFetching(false);
        }
      } catch (error) {
        console.error('Parse error:', error);
        setUser(null);
        setFetching(false);
      }
    } else {
      setUser(null);
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    const storageData = localStorage.getItem('user');
    const storedToken = localStorage.getItem('authToken');
    if (storageData) {
      try {
        const user = JSON.parse(storageData);
        if (user && location.pathname.includes('/dashboard') && storedToken) {
          fetchUser(user._id, storedToken);
        }
      } catch (error) {
        console.error('Parse error on pathname change:', error);
      }
    }
  }, [location.pathname]);

  return (
    <AuthContext.Provider value={{ user, fetching, fetchUser, login, logout, setTheme, theme, authToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);
export const contextData = useAuthContext;
