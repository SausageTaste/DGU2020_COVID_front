import i18n from "i18next";


i18n
    .init({
        lng: "en",
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
                    home: "Home",
                    home_page: "Home Page",

                    seq_search: "Sequence Search",
                    put_your_seq_here: "Put your sequence string here",
                    result_will_appear_here: "The result will appear here",
                    send: "Send",

                    opengl_view: "OpenGL Test",
                },
            },

            kr: {
                translation: {
                    home_page: "홈페이지",

                    seq_search: "시퀸스 검색",
                    put_your_seq_here: "시퀸스 문자열을 이곳에 입력하세요",
                    result_will_appear_here: "결과는 이곳에 출력됩니다",
                    send: "전송",

                    opengl_view: "OpenGL 시험",
                },
            },

        },

    });

export default i18n;
