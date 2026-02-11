import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      // Load standard namespaces from features folder, 'common' from common folder
      if (namespace === 'common') {
        return import(`./common/${language}.json`);
      }
      return import(`./features/${namespace}/${language}.json`);
    })
  )
  .init({
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    ns: ['common'], // Load common by default
    defaultNS: 'common', 
    interpolation: {
      escapeValue: false, // React escapes by default
    },
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
