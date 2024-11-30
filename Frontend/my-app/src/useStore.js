// useStore.js
import { create }from 'zustand';

const useStore = create((set) => ({
  email: 'CSC666@ntust.pokemon.master.com.tw',
  alertID:'',
  image: [],
  setCurrentEmail: (email) => set({ email }),
  setAlertID: (alertID) => set({ alertID }),
  setImage: (image) => set({ image }),
}));

export default useStore;