"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Define the type for ThemeContext
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

// Define a default value for the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme Provider component props type
interface ThemeProviderProps {
  children: ReactNode;
}

// Theme Provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Load the initial theme from localStorage
  useEffect(() => {
    const storedMode = localStorage.getItem("theme");
    if (storedMode) {
      setDarkMode(storedMode === "dark");
      document.documentElement.classList.toggle("dark", storedMode === "dark");
    }
  }, []);

  // Toggle dark mode and update localStorage
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext with type checking
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
