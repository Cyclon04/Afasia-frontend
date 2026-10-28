// src/hooks/useTheme.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';

import {
    COLORS_DARK,
    COLORS_LIGHT,
    type AppColors,
    type ColorScheme,
} from '../styles/theme';

const STORAGE_KEY = '@app:theme';

interface ThemeContextValue {
  colors: AppColors;
  scheme: ColorScheme;
  isDark: boolean;
  /** true hasta que terminó de cargar el tema guardado */
  isReady: boolean;
  toggleTheme: () => void;
  setScheme: (scheme: ColorScheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
  initialScheme?: ColorScheme;
}

export function ThemeProvider({
  children,
  initialScheme = 'light',
}: ThemeProviderProps) {
  const [scheme, setScheme] = useState<ColorScheme>(initialScheme);
  const [isReady, setIsReady] = useState(false);

  // 1) Cargar el tema guardado al arrancar
  useEffect(() => {
    let mounted = true;

    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (!mounted) return;
        if (saved === 'dark' || saved === 'light') {
          setScheme(saved);
        }
      })
      .finally(() => {
        if (mounted) setIsReady(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // 2) Guardar cada cambio en caché
  useEffect(() => {
    if (!isReady) return; // no guardar antes de cargar
    AsyncStorage.setItem(STORAGE_KEY, scheme).catch(() => {
      // opcional: log silencioso
    });
  }, [scheme, isReady]);

  const value = useMemo<ThemeContextValue>(() => {
    const isDark = scheme === 'dark';
    return {
      colors: isDark ? COLORS_DARK : COLORS_LIGHT,
      scheme,
      isDark,
      isReady,
      toggleTheme: () => setScheme(isDark ? 'light' : 'dark'),
      setScheme,
    };
  }, [scheme, isReady]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error(
      'useTheme() debe usarse dentro de <ThemeProvider>. ' +
        'Asegúrate de envolver tu app en app/_layout.tsx.'
    );
  }
  return ctx;
}