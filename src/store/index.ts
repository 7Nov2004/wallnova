import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Wallpaper } from '../types';

interface User {
  name: string;
  email: string;
}

interface WallnovaState {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  
  user: User | null;
  login: (user: User) => void;
  logout: () => void;

  favorites: Wallpaper[];
  toggleFavorite: (photo: Wallpaper) => void;
  
  downloadHistory: Wallpaper[];
  addDownload: (photo: Wallpaper) => void;

  searchHistory: string[];
  addSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
}

export const useStore = create<WallnovaState>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),

      favorites: [],
      toggleFavorite: (photo) => set((state) => {
        const exists = state.favorites.some(f => f.id === photo.id);
        if (exists) {
          return { favorites: state.favorites.filter(f => f.id !== photo.id) };
        }
        return { favorites: [...state.favorites, photo] };
      }),

      downloadHistory: [],
      addDownload: (photo) => set((state) => {
        const filtered = state.downloadHistory.filter(p => p.id !== photo.id);
        return { downloadHistory: [photo, ...filtered].slice(0, 50) };
      }),

      searchHistory: [],
      addSearchHistory: (query) => set((state) => {
        if (!query.trim()) return state;
        const filtered = state.searchHistory.filter(q => q !== query);
        return { searchHistory: [query, ...filtered].slice(0, 10) };
      }),
      clearSearchHistory: () => set({ searchHistory: [] }),
    }),
    {
      name: 'wallnova-storage',
    }
  )
);
