import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Navbar.scss';
import ToggleComponent from '../ToggleSwitch/ToggleSwitch';

export default function NavBar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { darkMode } = useContext(ThemeContext);

  const [menuOpen, setMenuOpen] = useState(false);


  const navLinks = t('navLinks', { returnObjects: true });

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang); // Change la langue
  };

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'; // Désactive le scroll
    } else {
      document.body.style.overflow = ''; // Réactive le scroll
    }
    
    // Nettoyage lors du démontage ou lorsque menuOpen change
    return () => {
      document.body.style.overflow = ''; // Toujours réactiver le scroll
    };
  }, [menuOpen]);

  useEffect(() => {
    // Fermer le menu burger si la fenêtre est redimensionnée
    const handleResize = () => {
      if (menuOpen) {
        setMenuOpen(false); // Ferme le menu si il est ouvert
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  return (
    <>
      {/* pre-header */}
      <div className={`pre-header relative z-[100] py-2 w-full ${darkMode ? "bg-quaternary-dark color-primary-dark" : " bg-quaternary-light color-primary-light"}`}>
        <div className="wrapper flex justify-between items-center">
          <a href="cv/CURRICULUM VITAE - Dylan QUENON.pdf" className='flex items-center text-lg nohemi gap-1' download>
            <span className='transition-all hover:underline underline-offset-4'>Télécharger le cv</span>
            <span className=" material-symbols-outlined">download</span>
          </a>
          <div className="preHeader_social_medias flex gap-3">
            <a href="https://github.com/DylanQuenon" className='text-xl hover:text-[#341087] transition-all ease-in-out' target='_blank' rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://www.instagram.com/devbydylan/" className='text-xl hover:text-[#341087] transition-all ease-in-out' target='_blank' rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://be.linkedin.com/in/dylan-quenon-a89596338" className='text-xl hover:text-[#341087] transition-all ease-in-out' target='_blank' rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </div>

      {/* header */}
      <header className={`sticky top-0 z-20 h-[88px] flex items-center py-2 ${darkMode ? "shadow-dark bg-primary-dark color-quaternary-dark" : "shadow-light bg-primary-light color-quaternary-light"}`}>
        <div className="wrapper flex justify-between items-center">
          {/* logo */}
          <div className="logo">
            <NavLink to="/" className=" flex items-center gap-2 text-2xl font-bold">
              <img src={darkMode ? "logo-light.svg" : "logo.svg"} alt="Logo - Dylan QUENON - Portfolio" className='w-10' />
              <div className="flex flex-col gap-1">
                <span className='text-lg nohemi'>Dylan Quenon</span>
                <span className='text-sm nohemi thin'>Webdeveloper & Design</span>
              </div>
            </NavLink>
          </div>

          {/* menu & switch */}
          <div className="menu-switch flex items-center gap-8">
            <nav className='desktopNav'>
              <ul className="flex gap-4">
                {Object.keys(navLinks).map((key) => {
                  const link = navLinks[key];

                  return (
                    <li key={link.path}>
                      <NavLink
                        to={link.path}
                        className={`text-lg nohemi px-3 py-2 rounded-md font-medium transition-all ${darkMode && location.pathname === link.path ? 'bg-[#4b4b4b] text-[#9D78F4]' : !darkMode && location.pathname === link.path ? 'bg-[#341087] text-[#f5f5f5]' : darkMode ? 'color-quaternary-dark hover:bg-[#9D78F4] hover:text-[#232323]' : 'color-quaternary-light hover:bg-[#341087] hover:text-[#f5f5f5]'}`}
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <ToggleComponent />
            <div className="z-10 relative flex gap-2 language">
              {['fr', 'en'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`
                    rounded-lg text-lg nohemi px-4 py-2 border transition-colors flex gap-2 items-center
                    ${darkMode ? 'border-gray-600' : 'border-gray-300'}
                    ${i18n.language === lang ? (darkMode ? 'bg-gray-100 text-black' : 'bg-gray-200 text-black') : ''}
                    ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}
                  `}
                >
                       {lang === 'fr' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                      <path fill="#fff" d="M10 4H22V28H10z"></path>
                      <path d="M5,4h6V28H5c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" fill="#092050"></path>
                      <path d="M25,4h6V28h-6c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" transform="rotate(180 26 16)" fill="#be2a2c"></path>
                      <path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path>
                      <path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#071b65"></rect><path d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z" fill="#fff"></path><path d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z" fill="#b92932"></path><path d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z" fill="#b92932"></path><path d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z" fill="#fff"></path><rect x="13" y="4" width="6" height="24" fill="#fff"></rect><rect x="1" y="13" width="30" height="6" fill="#fff"></rect><rect x="14" y="4" width="4" height="24" fill="#b92932"></rect><rect x="14" y="1" width="4" height="30" transform="translate(32) rotate(90)" fill="#b92932"></rect><path d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z" fill="#b92932"></path><path d="M2.328,26.957c.414,.374,.904,.656,1.447,.832l9.225-7.38v-1.408h-.75L2.328,26.957Z" fill="#b92932"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>
                  )}
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Burger menu */}
          <div id="burger" onClick={toggleMenu} className={`burger ${menuOpen ? 'open-burger' : ''}`}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          {/* Mobile menu */}
          <div id="menuMobile" className={`menu-mobile ${menuOpen ? 'open-menu' : ''} ${darkMode ? 'bg-primary-dark color-quaternary-dark' : 'bg-primary-light color-quaternary-light'}`}>
            <nav className='flex flex-col gap-5'>
              <ul className='flex flex-col gap-8 '>
                {Object.keys(navLinks).map((key) => {
                  const link = navLinks[key];

                  return (
                    <li key={link.path}>
                      <NavLink
                        to={link.path}
                        className={`display-md hanken uppercase px-3 py-2 rounded-md font-medium transition-all ${darkMode && location.pathname === link.path ? 'bg-[#4b4b4b] text-[#9D78F4]' : !darkMode && location.pathname === link.path ? 'bg-[#341087] text-[#f5f5f5]' : darkMode ? 'color-quaternary-dark hover:bg-[#9D78F4] hover:text-[#232323]' : 'color-quaternary-light hover:bg-[#341087] hover:text-[#f5f5f5]'}`}
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              <div className="z-10 relative flex gap-2 px-3">
                
              {['fr', 'en'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`
                    rounded-lg text-lg nohemi px-3 py-2 border transition-colors flex gap-2 items-center
                    ${darkMode ? 'border-gray-600' : 'border-gray-300'}
                    ${i18n.language === lang ? (darkMode ? 'bg-gray-100 text-black' : 'bg-gray-200 text-black') : ''}
                    ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-300'}
                  `}
                >
                       {lang === 'fr' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                      <path fill="#fff" d="M10 4H22V28H10z"></path>
                      <path d="M5,4h6V28H5c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" fill="#092050"></path>
                      <path d="M25,4h6V28h-6c-2.208,0-4-1.792-4-4V8c0-2.208,1.792-4,4-4Z" transform="rotate(180 26 16)" fill="#be2a2c"></path>
                      <path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path>
                      <path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#071b65"></rect><path d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z" fill="#fff"></path><path d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z" fill="#b92932"></path><path d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z" fill="#b92932"></path><path d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z" fill="#fff"></path><rect x="13" y="4" width="6" height="24" fill="#fff"></rect><rect x="1" y="13" width="30" height="6" fill="#fff"></rect><rect x="14" y="4" width="4" height="24" fill="#b92932"></rect><rect x="14" y="1" width="4" height="30" transform="translate(32) rotate(90)" fill="#b92932"></rect><path d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z" fill="#b92932"></path><path d="M2.328,26.957c.414,.374,.904,.656,1.447,.832l9.225-7.38v-1.408h-.75L2.328,26.957Z" fill="#b92932"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>
                  )}
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            </nav>
          </div>

        </div>
      </header>
    </>
  );
}
