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
  error: string | null;
  debugInfo: {
    apiUrl: string;
    hasInitData: boolean;
    initDataLength: number;
    requestSent: boolean;
    responseStatus: number | null;
  };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  error: null,
  debugInfo: {
    apiUrl: "",
    hasInitData: false,
    initDataLength: 0,
    requestSent: false,
    responseStatus: null,
  },
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState({
    apiUrl: API_BASE_URL || "НЕ УСТАНОВЛЕН",
    hasInitData: false,
    initDataLength: 0,
    requestSent: false,
    responseStatus: null as number | null,
  });

  useEffect(() => {
    const authorize = async () => {
      const initData = window?.Telegram?.WebApp?.initData;
      
      setDebugInfo(prev => ({
        ...prev,
        hasInitData: !!initData,
        initDataLength: initData?.length || 0,
      }));

      if (!initData) {
        setError("Telegram initData отсутствует");
        setLoading(false);
        return;
      }

      try {
        const fullUrl = `${API_BASE_URL}/api/auth/telegram`;
        
        setDebugInfo(prev => ({ ...prev, requestSent: true }));

        const response = await fetch(fullUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ initData }),
        });

        setDebugInfo(prev => ({ ...prev, responseStatus: response.status }));

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();

        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("jwt", data.token);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
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
    <AuthContext.Provider value={{ user, token, loading, error, debugInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);