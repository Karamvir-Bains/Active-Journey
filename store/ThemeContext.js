import React, {useState, useContext, useEffect} from "react"
import { palette } from "../helpers/data";

const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

export function useUpdateTheme() {
  return useContext(ThemeUpdateContext)
}

export function ThemeProvider({ children, initial }) {
  const [darkMode, setDarkMode] = useState(initial || 'light');
  //   () => {
  //   if (typeof window !== 'undefined') {
  //     return localStorage.getItem('darkMode') || 'light';
  //   }
  //   return 'light';
  // };
  const [colours, setColours] = useState({});

  useEffect(() => {
    setColours(prev => prev == 'light' ? palette.light : palette.dark )
  }, [darkMode]);

  function toggleDarkMode() {
    setDarkMode(prev => prev === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={darkMode}>
      <ThemeUpdateContext.Provider value={toggleDarkMode}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  )
}