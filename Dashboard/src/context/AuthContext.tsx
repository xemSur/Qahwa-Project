import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi } from "../services/api";

type AuthState = {
  token: string | null;
  name: string | null;
  email: string | null;
  role: string | null;
  loading: boolean;
};

type AuthContextType = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  token: null, name: null, email: null, role: null, loading: true,
  login: async () => {}, logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    token: null, name: null, email: null, role: null, loading: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const user = await authApi.verify();
          setState({ token, name: user.name, email: user.email, role: user.role, loading: false });
        } else {
          setState((s) => ({ ...s, loading: false }));
        }
      } catch {
        await AsyncStorage.multiRemove(["token", "name", "email", "role"]);
        setState({ token: null, name: null, email: null, role: null, loading: false });
      }
    })();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authApi.login(email, password);
    await AsyncStorage.multiSet([
      ["token", res.token],
      ["name", res.name],
      ["email", res.email],
      ["role", res.role],
    ]);
    setState({ token: res.token, name: res.name, email: res.email, role: res.role, loading: false });
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.multiRemove(["token", "name", "email", "role"]);
    setState({ token: null, name: null, email: null, role: null, loading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
