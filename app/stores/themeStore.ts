import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Theme {
  type: string;
  color: string;
}

const AvailableThemes: Theme[] = [{
  type: 'light',
  color: '#f8fafc'
}, {
  type: 'dark',
  color: '#0a0a0a'
}];

interface ThemeStore {
  themes: Theme[];
  theme: Theme;
  nextTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      themes: [...AvailableThemes],
      theme: AvailableThemes[0],
      nextTheme: () => {
        const themes = get().themes;
        const activeThemeIndex = themes.findIndex(theme => theme.type === get().theme.type);
        const nextThemeIndex = (activeThemeIndex + 1) % themes.length;
        const newTheme = themes[nextThemeIndex];

        // Sync tailwind classes
        if (typeof document !== 'undefined') {
          if (newTheme.type === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }

        set(() => ({ theme: newTheme }));
      },
    }),
    {
      name: "theme-storage",
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (typeof document !== 'undefined' && state?.theme) {
          if (state.theme.type === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      }
    }
  )
);
