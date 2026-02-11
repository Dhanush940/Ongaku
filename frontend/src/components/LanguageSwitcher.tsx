import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage('te')}
        className={`px-3 py-1 rounded ${
          i18n.language === 'te' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        తెలుగు
      </button>
    </div>
  );
};

export default LanguageSwitcher;
