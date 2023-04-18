import React, {useState, useContext} from "react"

const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()

export function useTheme() {
  return useContext(ThemeContext)
}

export function useUpdateTheme() {
  return useContext(ThemeUpdateContext)
}

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState('light');

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