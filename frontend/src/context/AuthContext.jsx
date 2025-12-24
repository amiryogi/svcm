import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      // Verify token is still valid
      authAPI.getMe()
        .then((res) => {
          setUser(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        })
        .catch(() => {
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Login can accept either (email, password) or (userData, token) from AdminLogin
  const login = async (userDataOrEmail, tokenOrPassword) => {
    // If second arg looks like a JWT token, use direct assignment
    if (typeof tokenOrPassword === 'string' && tokenOrPassword.length > 50) {
      localStorage.setItem('token', tokenOrPassword);
      localStorage.setItem('user', JSON.stringify(userDataOrEmail));
      setToken(tokenOrPassword);
      setUser(userDataOrEmail);
      return userDataOrEmail;
    }
    
    // Otherwise, use API login
    const response = await authAPI.login({ email: userDataOrEmail, password: tokenOrPassword });
    const { token: newToken, user: userData } = response.data;
    
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    
    return userData;
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      // Ignore errors on logout
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
