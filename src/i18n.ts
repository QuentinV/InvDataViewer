import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';

i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    lng: window.localStorage.getItem('lng') || "de",
    fallbackLng: "en",
    ns: ['common'],
    defaultNS: 'common',
    backend: {
        loadPath: "/InvDataViewer/locales/{{lng}}/{{ns}}.json",
        crossDomain: true
    },
    interpolation: {
      escapeValue: false 
    }
  });