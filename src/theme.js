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

  if (persist) {
    try {
      window.localStorage.setItem('theme', safeTheme);
    } catch {
      // Tema tetap aktif untuk sesi ini meskipun tidak dapat disimpan.
    }
  }
}