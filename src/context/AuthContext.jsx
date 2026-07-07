import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const mockUser = {
  id: 1,
  name: 'Charitha Jayasinghe ',
  email: 'charith.nuwan@email.com',
  phone: '+94 71 5366314',
  avatar: 'https://i.pravatar.cc/150?img=12',
  addresses: [
    {
      id: 1,
      type: 'Home',
      line1: '54, 1st Cross Street',
      city: 'colombo',
      state: 'western',
      pincode: '6001',
      isDefault: true,
    },
  ],
  orders: [
    { id: 'ORD-2401', date: '2026-06-15', total: 499, status: 'Delivered', items: 2 },
    { id: 'ORD-2389', date: '2024-06-02', total: 199, status: 'Delivered', items: 1 },
    { id: 'ORD-2367', date: '2023-06-28', total: 898, status: 'Delivered', items: 3 },
    { id: 'ORD-2412', date: '2024-06-20', total: 249, status: 'Processing', items: 1 },
    { id: 'ORD-2418', date: '2024-06-22', total: 599, status: 'Shipped', items: 1 },
  ],
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800)); // simulate API call
    if (email && password) {
      setUser(mockUser);
      setLoading(false);
      return { success: true };
    }
    setLoading(false);
    return { success: false, error: 'Invalid credentials' };
  };

  const register = async (data) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setUser({ ...mockUser, name: data.name, email: data.email });
    setLoading(false);
    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
