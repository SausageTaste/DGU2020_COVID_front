import i18n from "i18next";


i18n
    .init({
        lng: "kr",
        fallbackLng: "en",

        detection: {
            order: ['queryString', 'cookie'],
            cache: ['cookie']
        },

        interpolation: {
            escapeValue: false, // not needed for react!!
        },

        resources: {

            en: {
                translation: {
                    home_page: "Home Page",
                },
            },

            kr: {
                translation: {
                    home_page: "홈페이지",
                },
            },

        },

    });

export default i18n;
