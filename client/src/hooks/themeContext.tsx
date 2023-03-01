import {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
  useMemo,
} from "react";

interface Theme {
  textColor: string;
  textColorSoft: string;
  bg: string;
  bgSoft: string;
  logo: string;
  borderColor: string;
  substrate: string;
}

const themes: Record<ThemeEnum, Theme> = {
  light: {
    textColor: "#000000",
    textColorSoft: "#555555",
    bg: "white",
    bgSoft: "#f6f3f3",
    logo: "darkblue",
    borderColor: "lightgrey",
    substrate: "lightgrey",
  },
  dark: {
    textColor: "whitesmoke",
    textColorSoft: "lightgrey",
    bg: "#222222",
    bgSoft: "#333333",
    logo: "white",
    borderColor: "#444444",
    substrate: "grey",
  },
};

export const setCSSVariables = (theme: Theme) => {
  const values = Object.keys(theme) as UnionToTuple<keyof Theme>;

  values.forEach((value) => {
    document.documentElement.style.setProperty(`--${value}`, theme[value]);
  });
};

export enum ThemeEnum {
  light = "light",
  dark = "dark",
}

type ThemeContextType = { theme: ThemeEnum; toggleTheme?: () => void };

export const ThemeContext = createContext<ThemeContextType>({
  theme: ThemeEnum.light,
});
export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<ThemeEnum>(
    (localStorage.getItem("theme") as ThemeEnum) ?? ThemeEnum.light,
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    setCSSVariables(themes[theme]);
  }, [theme]);

  const context = useMemo(() => {
    const toggleTheme = () => {
      setTheme(theme === ThemeEnum.light ? ThemeEnum.dark : ThemeEnum.light);
    };
    return { theme, toggleTheme };
  }, [theme]);

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};
