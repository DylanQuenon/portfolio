import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext'; // Import du contexte
import { useTranslation } from 'react-i18next'; // Import du hook useTranslation
import './i18n'; // Assurez-vous que la configuration i18n est importée
import './App.scss'; // Assure-toi que les styles globaux Tailwind sont chargés

function Test() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext); // Accède au contexte du thème
  const { t, i18n } = useTranslation();
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const appElement = document.querySelector('.app-container');
      const rect = appElement.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top }); // Mets à jour la position de la souris
      }
    };

    // Ajouter l'écouteur d'événements pour suivre la souris
    window.addEventListener('mousemove', handleMouseMove);

    // Nettoyer l'écouteur d'événements au démontage du composant
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang); // Change la langue
  };

  return (
    <div className={`min-h-[200vh] ${darkMode ? 'bg-primary-dark color-quaternary-dark' : 'bg-primary-light color-quaternary-light'} transition-all`}>
    <div className={`app-container h-[600px] flex flex-col items-center justify-center transition-all `}>
      <h1 className="z-10 relative display-md nohemi text-center w-3/5 font-[400]">
        {t('title')}  <span className={`display-md nohemi bold ${darkMode ? 'color-secondary-dark' : 'color-secondary-light'}`}> {t('design')}</span>  {t('and')}   <span className={`display-md nohemi bold ${darkMode ? 'color-secondary-dark' : 'color-secondary-light'}`}> {t('solutions')} </span>      
      </h1>
      
      <button
        onClick={toggleDarkMode}
        className={`z-10 relative px-6 py-2 rounded-lg text-lg nohemi bg-blue-500 text-white hover:bg-blue-400 transition-colors`}
      >
        {t('toggleDarkMode', { mode: t(`mode.${darkMode ? 'light' : 'dark'}`) })}
      </button>

      <div className="z-10 relative flex gap-2 my-5">
        <button onClick={() => handleLanguageChange('en')} className="px-4 py-2 rounded-lg text-lg nohemi bg-blue-500 text-white hover:bg-blue-400 transition-colors">English</button>
        <button onClick={() => handleLanguageChange('fr')} className="px-4 py-2 rounded-lg text-lg nohemi bg-blue-500 text-white hover:bg-blue-400 transition-colors">Français</button>
      </div>
      
      <div
        className="tracking-element"
        style={{
          position: 'absolute',
          left: `${mousePosition.x - 100}px`,  // Ajuste la position pour centrer l'élément sur la souris
          top: `${mousePosition.y - 100}px`,   // Ajuste la position pour centrer l'élément sur la souris
          width: '200px',  // Taille de l'élément
          height: '200px',
          backgroundColor: darkMode ? '#012169' : '#CEBBFA', // Change la couleur en fonction du mode
          borderRadius: '50%', // Pour un effet circulaire
          filter: 'blur(30px)', // Applique un flou moins important sur l'élément
          zIndex: 1, // Place l'élément sous le contenu
        }}
      >
        {/* Contenu de l'élément */}
      </div>
    </div>


    </div>
  );
}

export default Test;
