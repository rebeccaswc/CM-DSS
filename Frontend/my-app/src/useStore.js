// useStore.js
import { create }from 'zustand';

const useStore = create((set) => ({
  email: '',
  setCurrentEmail: (email) => set({ email }),
}));

export default useStore;
