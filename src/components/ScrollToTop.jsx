import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Défile jusqu'en haut
  }, [pathname]); // Exécute à chaque changement de route

  return null; // Ce composant ne rend rien
};

export default ScrollToTop;
