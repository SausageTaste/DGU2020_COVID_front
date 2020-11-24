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
                    home: "Home",
                    home_page: "Home Page",

                    seq_search: "Sequence Search",
                    put_your_seq_here: "Put your sequence string here",
                    put_your_seq_or_fasta_here: "Put your sequence or fasta string here",
                    result_will_appear_here: "The result will appear here",
                    send: "Send",
                    no_data: "No data",

                    opengl_view: "OpenGL Test",

                    single_seq_query: "Single Sequence Query",
                    sequence_id: "Sequence ID",
                    bit_score: "Bitscore",
                    put_your_seq_count: "Input the number of sequences to search. (250 or less)",
                    howmany: "number of sequences",
                    index: "index",

                    two_seq_comp: "Two Sequence Comparison",
                    result: "Result",
                    similarity: "Similarity",
                    simi_bit_score: "Bit score",
                    simi_identity: "Identity",
                    mutation_list: "Mutataion List",
                    an_err_occured: "An error occured while processing sequences",
                    plz_fill_in_blanks: "Please provide with all needed data",

                    seq_list_in_db: "Sequences in Server Database",
                    btn_next: "Next",
                    btn_prev: "Previous",
                    label_metadata: "Metadata",
                    copy_seq_clipboard: "Copy sequence to clipboard",

                    meta_acc_id: "ACC ID",
                    meta_strain: "Strain",
                    meta_gebank_accession: "Gebank accession",
                    meta_virus: "Virus",
                    meta_date: "Date",
                    meta_region: "Region",
                    meta_country: "Country",
                    meta_division: "Division",
                    meta_location: "Location",
                    meta_region_exposure: "Region exposure",
                    meta_country_exposure: "Country exposure",
                    meta_division_exposure: "Division exposure",
                    meta_segment: "Segment",
                    meta_length: "Length",
                    meta_host: "Host",
                    meta_age: "Age",
                    meta_sex: "Sex",
                    meta_pangolin_lineage: "Pangolin Lineage",
                    meta_GISAID_clade: "GISAID clade",
                    meta_originating_lab: "Originating lab",
                    meta_submitting_lab: "Submitting lab",
                    meta_authors: "Authors",
                    meta_url: "URL",
                    meta_title: "Title",
                    meta_paper_url: "Paper URL",
                    meta_date_submitted: "Submitted date",
                    meta_sequence: "Sequence",
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
                    no_data: "데이터 없음",

                    opengl_view: "OpenGL 시험",

                    single_seq_query: "유사 시퀀스 조회",
                    sequence_id: "시퀀스 ID",
                    bit_score: "비트스코어",
                    put_your_seq_count: "조회할 시퀀스의 개수를 입력해주세요. (250 이하)",
                    howmany: "시퀀스의 개수",
                    index: "구분",

                    two_seq_comp: "두 시퀸스 비교",
                    result: "결과",
                    similarity: "유사도",
                    mutation_list: "돌연변이 목록",
                    an_err_occured: "시퀸스를 처리하는 중 오류가 발생했습니다",
                    plz_fill_in_blanks: "모든 빈칸에 데이터를 입력해 주세요",

                    seq_list_in_db: "서버 데이터베이스에 있는 시퀸스",
                    btn_next: "다음",
                    btn_prev: "이전",
                    label_metadata: "메타데이터",
                    copy_seq_clipboard: "시퀸스를 클립보드로 복사",

                    //meta_acc_id: "ACC ID",
                    //meta_strain: "Strain",
                    //meta_gebank_accession: "Gebank accession",
                    meta_virus: "바이러스",
                    meta_date: "날짜",
                    meta_region: "지역",
                    meta_country: "국가",
                    meta_division: "세부 지역",
                    meta_location: "장소",
                    //meta_region_exposure: "Region exposure",
                    //meta_country_exposure: "Country exposure",
                    //meta_division_exposure: "Division exposure",
                    //meta_segment: "Segment",
                    meta_length: "길이",
                    meta_host: "보균자",
                    meta_age: "나이",
                    meta_sex: "성별",
                    //meta_pangolin_lineage: "Pangolin Lineage",
                    //meta_GISAID_clade: "GISAID clade",
                    meta_originating_lab: "발견한 연구소",
                    meta_submitting_lab: "제출한 연구소",
                    meta_authors: "제출자",
                    //meta_url: "URL",
                    meta_title: "제목",
                    meta_paper_url: "논문 URL",
                    meta_date_submitted: "제출 날짜",
                    meta_sequence: "서열",
                },
            },

        },

    });

export default i18n;
