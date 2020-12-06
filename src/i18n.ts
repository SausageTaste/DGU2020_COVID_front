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
                    home: "COVIDGU",
                    home_page: "COVIDGU",

                    service_description: 'COVIDGU is a COVID19 sequence analysis service that can be easily used by the general public.',
                    function_description: 'We offer the following features:',
                    single_seq_query_description: 'You can look up the sequences that are similar to the ones you have, and check the detailed information.',
                    two_seq_comp_description: 'It shows the similarity of the two sequences and a list of mutations.',
                    two_seq_comp_description_2: 'You can check detailed information of the nucleotide sequence.',
                    seq_list_in_db_description: `You can see the list of sequences in the server database. 
                    Canvas to help you understand nucleotide sequences are shown together.`,
                    seq_list_in_db_description_2: 'You can also copy sequence strings and use it for other functions.',
                    map_description: 'You can easily check the maps around the world.',

                    seq_search: "Sequence Search",
                    put_your_seq_here: "Put your sequence string here",
                    put_your_seq_or_fasta_here: "Put your sequence or fasta string here",
                    result_will_appear_here: "The result will appear here",
                    send: "Input",
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
                    mutation_list: "Mutataion",
                    an_err_occured: "An error occured while processing sequences",
                    plz_fill_in_blanks: "Please provide with all needed data",
                    compare_with_refseq: "Compare with Wuhan's reference sequence",
                    clear: "Clear",
                    danger_level: "Risk",
                    caution: "Caution",
                    caution_description: "It is a mutation found only in one region(country).",
                    warning: "Warning",
                    warning_description: "It is a mutation found in several regions(countries) and needs attention.",
                    danger: "Danger",
                    danger_description: `It is a mutation found in several regions (countries) and 
                    affecting infection in regions (countries). It is very dangerous.`,
                    null: "Unknown",


                    seq_list_in_db: "Sequences in Server Database",
                    btn_next: "Next",
                    btn_prev: "Previous",
                    copied: "Copied",
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
                    home: "COVIDGU",
                    home_page: "COVIDGU",

                    service_description: 'COVIDGU는 일반인들도 쉽게 이용할 수 있는 COVID19 염기서열 분석 서비스입니다.',
                    function_description: 'COVIDGU는 다음과 같은 기능을 제공합니다.',
                    single_seq_query_description: '보유하고 있는 염기서열과 유사한 서열들을 조회하고, 자세한 정보를 확인할 수 있습니다.',
                    two_seq_comp_description: '두 염기서열의 유사도와 돌연변이 목록을 출력합니다.',
                    two_seq_comp_description_2: '염기서열의 자세한 정보를 확인할 수 있습니다.',
                    seq_list_in_db_description: `서버 데이터베이스가 보유하고 있는 염기서열들의 리스트를 확인해보세요. 
                    뉴클레오타이드 서열의 이해를 돕는 캔버스가 함께 보여집니다.`,
                    seq_list_in_db_description_2: '염기서열의 문자열을 복사하여 다른 기능에 활용할 수도 있습니다.',
                    map_description: '전 세계의 지도를 손쉽게 확인할 수 있습니다.',

                    seq_search: "염기서열 검색",
                    put_your_seq_here: "염기서열 문자열을 이곳에 입력하세요",
                    put_your_seq_or_fasta_here: "염기서열이나 fasta 문자열을 이곳에 입력하세요",
                    result_will_appear_here: "결과는 이곳에 출력됩니다",
                    send: "입력",
                    no_data: "데이터 없음",

                    opengl_view: "OpenGL 시험",

                    single_seq_query: "유사 염기서열 조회",
                    sequence_id: "염기서열 ID",
                    bit_score: "비트스코어",
                    put_your_seq_count: "조회할 염기서열의 개수를 입력해주세요. (250 이하)",
                    howmany: "염기서열의 개수",
                    index: "구분",

                    two_seq_comp: "두 염기서열 비교",
                    result: "결과",
                    similarity: "유사도",
                    mutation_list: "돌연변이",
                    an_err_occured: "처리 중 오류가 발생했습니다.",
                    plz_fill_in_blanks: "모든 빈칸에 데이터를 입력해 주세요.",
                    compare_with_refseq: "우한의 참조서열과 비교하기",
                    clear: "모두 지우기",
                    danger_level: "위험도",
                    caution: "주의",
                    caution_description: "한 지역(국가)에서만 발견된 돌연변이입니다.",
                    warning: "경고",
                    warning_description: "여러 지역(국가)에서 발견된 돌연변이로, 주의가 필요합니다.",
                    danger: "위험",
                    danger_description: "여러 지역(국가)에서 발견되고 지역(국가)의 감염에 영향을 미치는 돌연변이로, 매우 위험합니다.",
                    null: "알 수 없음",

                    seq_list_in_db: "서버 DB에 있는 염기서열",
                    btn_next: "다음",
                    btn_prev: "이전",
                    copied: "복사 완료",
                    label_metadata: "메타데이터",
                    copy_seq_clipboard: "염기서열을 클립보드로 복사",

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

                    map: '지도',
                },
            },

        },

    });

export default i18n;
