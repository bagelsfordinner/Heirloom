import { create } from 'zustand';

export type Toast = {
  id: string;
  type: 'success' | 'error';
  message: string;
};

type ToastState = {
  toasts: Toast[];
  addToast: (type: Toast['type'], message: string) => void;
  removeToast: (id: string) => void;
};

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  addToast: (type, message) => {
    const id = `${Date.now()}-${Math.random()}`;
    const toast: Toast = { id, type, message };

    set((state) => ({
      toasts: [...state.toasts, toast],
    }));

    // Auto-remove after 5 seconds
    setTimeout(() => {
      get().removeToast(id);
    }, 5000);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
