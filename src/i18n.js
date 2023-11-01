import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en', // Язык по умолчанию, если перевод для выбранного языка не найден
        debug: true, // Режим отладки для вывода информации в консоль
        interpolation: {
            escapeValue: false, // Позволяет вставлять HTML-теги в переводы
        },
        backend: {
            // Настройки для загрузки переводов
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        detection: {
            // Определение языка пользователя
            order: ['querystring', 'cookie', 'localStorage', 'navigator'],
            caches: ['cookie'],
        },
    });

export default i18n;