import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './i18n/en.json';
import frTranslation from './i18n/fr.json';
import './i18n'; // importez le fichier de configuration i18next

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      fr: {
        translation: frTranslation,
      },
    },
    fallbackLng: 'fr', // Langue par défaut
    interpolation: {
      escapeValue: false, // React gère déjà l'échappement
    },
  });

export default i18n;
