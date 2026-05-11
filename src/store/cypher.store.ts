import { create } from "zustand";
import { api } from "../services/api";

interface EncryptState {
  message: string;
  step: string;
  encryptedText: string;
  hash: string;
  isLoading: boolean;
  error: string | null;

  setMessage: (message: string) => void;
  setStep: (step: string) => void;
  encrypt: () => Promise<void>;
  reset: () => void;
  clearError: () => void;
}

export const useEncryptStore = create<EncryptState>((set, get) => ({
  message: "",
  step: "",
  encryptedText: "",
  hash: "",
  isLoading: false,
  error: null,

  setMessage: (message) => set({ message }),
  setStep: (step) => set({ step }),

  encrypt: async () => {
    const { message, step } = get();

    const numericStep = Number(step);

    set({ isLoading: true, error: null, encryptedText: "", hash: "" });

    try {
      const response = await api.post("/encrypt", {
        message,
        step: numericStep,
      });

      set({
        encryptedText: response.data.encryptedText,
        hash: response.data.hash,
        isLoading: false,
      });
    } catch (err: any) {
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Erro ao criptografar.";

      set({ error: message, isLoading: false });
      throw err;
    }
  },

  reset: () =>
    set({ message: "", step: "", encryptedText: "", hash: "", error: null }),

  clearError: () => set({ error: null }),
}));

interface DecryptState {
  encryptedText: string;
  hash: string;
  decryptedText: string;
  isLoading: boolean;
  error: string | null;

  setEncryptedText: (text: string) => void;
  setHash: (hash: string) => void;
  decrypt: () => Promise<void>;
  reset: () => void;
  clearError: () => void;
}

export const useDecryptStore = create<DecryptState>((set, get) => ({
  encryptedText: "",
  hash: "",
  decryptedText: "",
  isLoading: false,
  error: null,

  setEncryptedText: (encryptedText) => set({ encryptedText }),
  setHash: (hash) => set({ hash }),

  decrypt: async () => {
    const { encryptedText, hash } = get();

    set({ isLoading: true, error: null, decryptedText: "" });

    try {
      const response = await api.post("/decrypt", { encryptedText, hash });

      set({ decryptedText: response.data.decryptedText, isLoading: false });
    } catch (err: any) {
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Erro ao descriptografar.";

      set({ error: message, isLoading: false });
      throw err;
    }
  },

  reset: () =>
    set({ encryptedText: "", hash: "", decryptedText: "", error: null }),

  clearError: () => set({ error: null }),
}));
