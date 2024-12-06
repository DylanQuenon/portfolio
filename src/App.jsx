import React from 'react';
import './i18n'; // Assurez-vous que la configuration i18n est importée
import './App.scss'; // Assure-toi que les styles globaux Tailwind sont chargés
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/Navbar/NavBar';
import HomePage from './pages/Home/HomePage';
import { useTranslation } from 'react-i18next';
import About from './pages/About/About';

const App = () => {
  const { t } = useTranslation();

  return ( 
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path={t('navLinks.home.path')} element={<HomePage />} />
          <Route path={t('navLinks.about.path')} element={<About />} />
        </Routes>
      </Router>
    </> 
  );
}
 
export default App;

