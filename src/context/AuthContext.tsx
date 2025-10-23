import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData: string;
        initDataUnsafe?: object;
        expand: () => void;
        ready: () => void;
        close: () => void;
      };
    };
  }
}

interface User {
  id: number;
  username: string;
  name: string;
  photoUrl?: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authorize = async () => {
      const initData = window?.Telegram?.WebApp?.initData;
      
      if (!initData) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/telegram`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ initData }),
        });

        if (!response.ok) throw new Error("Auth failed");
        
        const data = await response.json();

        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("jwt", data.token);
      } catch (error) {
        // Авторизация не удалась
      } finally {
        setLoading(false);
      }
    };

    authorize();
  }, []);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("jwt");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);