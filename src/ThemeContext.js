import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Récupère le thème initial depuis localStorage ou utilise le thème clair par défaut
  const initialTheme = localStorage.getItem('theme') === 'dark';
  const [darkMode, setDarkMode] = useState(initialTheme);

  // Fonction pour basculer le thème
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);

  };

  // Applique la classe au body et sauvegarde dans localStorage
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
    console.log('darkMode', darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
