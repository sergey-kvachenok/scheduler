import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import common from '../translations/en/common.json';
import slots from '../translations/en/slots.json';
import basket from '../translations/en/basket.json';

const resources = {
  en: {
    common,
    slots,
    basket,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
