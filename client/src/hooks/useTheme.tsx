import {useEffect, useState} from 'react';

export enum themeEnum {
  light = 'light',
  dark = 'dark',
}

export const useTheme = () => {
  const [theme, setTheme] = useState<themeEnum>(
    (localStorage.getItem('theme') as themeEnum) ?? themeEnum.light,
  );

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === themeEnum.light ? themeEnum.dark : themeEnum.light);
  };

  return {theme, toggleTheme};
};
