import { create } from 'zustand';

interface UiState {
  selectedDate: string;
  isOffline: boolean;
  activeStaffFilter: string | null;
  setSelectedDate: (date: string) => void;
  setIsOffline: (offline: boolean) => void;
  setActiveStaffFilter: (staffId: string | null) => void;
}

export const useUiStore = create<UiState>((set) => ({
  selectedDate: new Date().toISOString().split('T')[0],
  isOffline: false,
  activeStaffFilter: null,
  setSelectedDate: (selectedDate) => set({ selectedDate }),
  setIsOffline: (isOffline) => set({ isOffline }),
  setActiveStaffFilter: (activeStaffFilter) => set({ activeStaffFilter }),
}));
