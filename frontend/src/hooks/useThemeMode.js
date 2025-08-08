import { useEffect, useState } from 'react';

const useThemeMode = () => {
  const [theme, setTheme] = useState('dark');

  const setMode = (mode) => {
    window.localStorage.setItem('color-theme', mode);
    setTheme(mode);
  };

  const themeToggler = () =>
    theme === 'dark' ? setMode('light') : setMode('dark');

  useEffect(() => {
    const localTheme = window.localStorage.getItem('color-theme');
    localTheme && setTheme(localTheme);
  }, []);

  return { theme, themeToggler };
};

export default useThemeMode;
