import {PropsWithChildren, createContext, useEffect, useState} from 'react';

export enum themeEnum {
  light = 'light',
  dark = 'dark',
}

type ThemeContextType = {theme: themeEnum; toggleTheme?: () => void};

export const ThemeContext = createContext<ThemeContextType>({
  theme: themeEnum.light,
});

export const ThemeProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [theme, setTheme] = useState<themeEnum>(
    (localStorage.getItem('theme') as themeEnum) ?? themeEnum.light,
  );

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === themeEnum.light ? themeEnum.dark : themeEnum.light);
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
