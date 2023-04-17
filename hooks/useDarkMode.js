import { useState, useEffect, useCallback } from 'react';

/**
 * useDarkMode
 * 
 * Description: Manages state for our app theme and allows it be used inside the widgets
 *
 */

export function useDarkMode (initial = 'light') {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') || 'light';
    }
    return 'light';
  });

  const toggleDarkMode = useCallback(() => {
    const newMode = darkMode === 'light' ? 'dark' : 'light';
    localStorage.setItem('darkMode', newMode);
    setDarkMode(newMode);
  }, [darkMode]);

  return [
    darkMode,
    toggleDarkMode
  ]
}
