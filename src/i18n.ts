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
                    put_your_seq_or_fasta_here: "Put your sequence or fasta string here",
                    result_will_appear_here: "The result will appear here",
                    send: "Send",

                    opengl_view: "OpenGL Test",

                    two_seq_comp: "Two Sequence Comparison",
                    result: "Result",
                    similarity: "Similarity",
                    simi_bit_score: "Bit score",
                    simi_identity: "Identity",
                    mutation_list: "Mutataion List",
                    au_err_occured: "An error occured while processing sequences",
                    plz_fill_in_blanks: "Please provide with all needed data",
                },
            },

            kr: {
                translation: {
                    home_page: "홈페이지",

                    seq_search: "시퀸스 검색",
                    put_your_seq_here: "시퀸스 문자열을 이곳에 입력하세요",
                    put_your_seq_or_fasta_here: "시퀸스나 fasta 문자열을 이곳에 입력하세요",
                    result_will_appear_here: "결과는 이곳에 출력됩니다",
                    send: "전송",

                    opengl_view: "OpenGL 시험",

                    two_seq_comp: "두 시퀸스 비교",
                    result: "결과",
                    similarity: "유사도",
                    mutation_list: "돌연변의 목록",
                    au_err_occured: "시퀸스를 처리하는 중 오류가 발생했습니다",
                    plz_fill_in_blanks: "모든 빈칸에 데이터를 입력해 주세요",
                },
            },

        },

    });

export default i18n;
