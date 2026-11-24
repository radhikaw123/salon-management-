import { create } from 'zustand';
import { UserProfile, UserRole } from '../types';
import { storage } from '../utils/storage';

interface AuthState {
  user: UserProfile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: UserProfile, accessToken: string, refreshToken: string) => Promise<void>;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: async (user, accessToken, refreshToken) => {
    await storage.setAccessToken(accessToken);
    await storage.setRefreshToken(refreshToken);
    set({
      user,
      role: user.role,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  logout: async () => {
    await storage.clearTokens();
    set({
      user: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
    });
  },

  setLoading: (loading) => set({ isLoading: loading }),
}));
