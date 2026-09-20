import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import localforage from 'localforage';

// Custom storage engine for Zustand using localforage
const storage = {
  getItem: async (name) => {
    const value = await localforage.getItem(name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name, value) => {
    await localforage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name) => {
    await localforage.removeItem(name);
  },
};

export const useHabitStore = create(
  persist(
    (set, get) => ({
      habits: [],
      addHabit: (habit) => set((state) => ({
        habits: [...state.habits, {
          ...habit,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          history: []
        }]
      })),
      removeHabit: (id) => set((state) => ({
        habits: state.habits.filter(h => h.id !== id)
      })),
      toggleHabitHistory: (habitId, dateStr) => set((state) => {
        const habits = state.habits.map(habit => {
          if (habit.id === habitId) {
            const history = habit.history || [];
            const index = history.indexOf(dateStr);
            if (index > -1) {
              return { ...habit, history: history.filter(d => d !== dateStr) };
            } else {
              return { ...habit, history: [...history, dateStr] };
            }
          }
          return habit;
        });
        return { habits };
      }),
      // App Settings
      theme: 'light',
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.setAttribute('data-theme', theme);
      },
      textSize: 'medium',
      setTextSize: (textSize) => set({ textSize })
    }),
    {
      name: 'one-percent-storage',
      storage,
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.setAttribute('data-theme', state.theme || 'light');
        }
      }
    }
  )
);
