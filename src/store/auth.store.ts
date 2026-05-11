import { create } from "zustand";
import { api } from "../services/api";

interface User {
  id: number;
  username: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (username, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.post("/auth/login", { username, password });
      const { token, user } = response.data;

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      set({ token, user, isAuthenticated: true, isLoading: false });
    } catch (err: any) {
      const message = err?.response?.data?.error || "Erro ao realizar login.";

      set({ error: message, isLoading: false });
      throw err;
    }
  },

  logout: () => {
    delete api.defaults.headers.common["Authorization"];
    set({ token: null, user: null, isAuthenticated: false, error: null });
  },

  clearError: () => set({ error: null }),
}));
