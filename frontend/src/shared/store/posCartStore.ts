import { create } from 'zustand';
import { CartLineItem, PaymentRecord } from '../types';

interface PosCartState {
  customerId: string | null;
  appointmentId: string | null;
  items: CartLineItem[];
  discountPct: number;
  discountAmount: number;
  payments: PaymentRecord[];
  setCustomer: (customerId: string | null) => void;
  setAppointment: (appointmentId: string | null) => void;
  addItem: (item: CartLineItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  setDiscount: (pct: number, amount: number) => void;
  addPayment: (payment: PaymentRecord) => void;
  clearCart: () => void;
  getSubtotal: () => number;
}

export const usePosCartStore = create<PosCartState>((set, get) => ({
  customerId: null,
  appointmentId: null,
  items: [],
  discountPct: 0,
  discountAmount: 0,
  payments: [],

  setCustomer: (customerId) => set({ customerId }),
  setAppointment: (appointmentId) => set({ appointmentId }),

  addItem: (item) => {
    const { items } = get();
    const existingIndex = items.findIndex((i) => i.itemId === item.itemId);
    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].quantity += item.quantity;
      set({ items: updated });
    } else {
      set({ items: [...items, item] });
    }
  },

  removeItem: (itemId) => {
    set({ items: get().items.filter((i) => i.itemId !== itemId) });
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }
    set({
      items: get().items.map((i) =>
        i.itemId === itemId ? { ...i, quantity } : i
      ),
    });
  },

  setDiscount: (discountPct, discountAmount) =>
    set({ discountPct, discountAmount }),

  addPayment: (payment) =>
    set({ payments: [...get().payments, payment] }),

  clearCart: () =>
    set({
      customerId: null,
      appointmentId: null,
      items: [],
      discountPct: 0,
      discountAmount: 0,
      payments: [],
    }),

  getSubtotal: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));
