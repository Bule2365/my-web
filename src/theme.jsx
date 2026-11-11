import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const DARK_COLOR = '#0a0a0b';
const LIGHT_COLOR = '#fafafa';

export function readTheme() {
  try {
    const saved = window.localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // Storage dapat diblokir; lanjutkan dengan preferensi OS.
  }

  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'dark';
  }
}

export function applyTheme(theme, { persist = true } = {}) {
  const safeTheme = theme === 'light' ? 'light' : 'dark';
  document.documentElement.dataset.theme = safeTheme;

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', safeTheme === 'light' ? LIGHT_COLOR : DARK_COLOR);
  }

  if (persist) {
    try {
      window.localStorage.setItem('theme', safeTheme);
    } catch {
      // Tema tetap aktif untuk sesi ini meskipun tidak dapat disimpan.
    }
  }
}

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const fromDom = document.documentElement.dataset.theme;
    if (fromDom === 'light' || fromDom === 'dark') return fromDom;
    return readTheme();
  });
  const hasInteracted = useRef(false);

  useEffect(() => {
    // Jangan simpan preferensi OS sebagai pilihan eksplisit saat mount.
    applyTheme(theme, { persist: hasInteracted.current });
  }, [theme]);

  const toggleTheme = useCallback(() => {
    hasInteracted.current = true;
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme harus dipakai di dalam ThemeProvider');
  }
  return context;
}
