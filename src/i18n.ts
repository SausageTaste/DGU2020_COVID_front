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

                    map: 'Map',

                    describe_open: "▼ View How to Use and features",
                    describe_close: "▲ Close",
                    describe_feature_of_function: "Through this function, you can check the information below",
                    describe_method_single_seq: "How to use: Enter one nucleotide sequence",
                    describe_feature_1_single_seq: "1. You can check the similarity of the returned sequence.",
                    describe_feature_2_single_seq: "2. You can sort the returned sequence by similarity or sequence ID.",
                    describe_feature_3_single_seq: "3. You can check the metadata of the returned sequence.",
                    describe_feature_4_single_seq: "4. You can check the distribution of similar sequences through Google Map.",
                    describe_method_two_seq: "How to use: Enter two nucleotide sequences (default: provide Wuhan nucleotide sequences)",
                    describe_feature_1_two_seq: "1. You can check the similarity of the two entered sequences.",
                    describe_feature_2_two_seq: "2. You can check the list of mutations of the two entered sequences.",
                    describe_method_seq_list_in_db: "How to use: Click a nucleotide sequence from the list of provided nucleotide sequences to check information",
                    describe_feature_1_seq_list_in_db: "1. You can check the list of nucleotide sequences stored in the database.",
                    describe_feature_2_seq_list_in_db: "2. You can check the sequence and protein structure of the selected nucleotide sequence through the canvas.",
                    describe_feature_3_seq_list_in_db: "3. You can copy the selected nucleotide sequence to the clipboard.",
                    describe_feature_4_seq_list_in_db: "4. You can check the meta data of the selected nucleotide sequence.",
                    describe_feature_5_seq_list_in_db: "5. You can check the distribution of the nucleotide sequence stored in the database through Google Maps.",

                    example_seq_open: "▼ Example nucleotide sequence",
                    example_seq_close: "▲ Close",
                    example_seq_id: "Nucleotide sequence ID : SouthKorea/KCDC03/2020",
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
                    send: "전송",
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
                    mutation_list: "돌연변이 목록",
                    an_err_occured: "처리 중 오류가 발생했습니다.",
                    plz_fill_in_blanks: "모든 빈칸에 데이터를 입력해 주세요.",

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

                    describe_open: "▼ 사용방법 및 특징 보기",
                    describe_close: "▲ 접기",
                    describe_feature_of_function: "이 기능을 통해 아래의 정보 들을 확인할 수 있습니다.",
                    describe_method_single_seq: "사용 방법 : 하나의 염기서열 입력",
                    describe_feature_1_single_seq: "1. 반환받은 염기서열의 유사도를 확인할 수 있습니다.",
                    describe_feature_2_single_seq: "2. 반환받은 염기서열을 유사도 혹은 염기서열 ID로 정렬할 수 있습니다.",
                    describe_feature_3_single_seq: "3. 반환받은 염기서열의 메타 데이터를 확인할 수 있습니다.",
                    describe_feature_4_single_seq: "4. 구글 맵을 통해 유사한 염기서열의 분포를 확인할 수 있습니다.",
                    describe_method_two_seq: "사용 방법 : 두 개의 염기서열 입력(기본 값으로 : 우한 염기서열 제공)",
                    describe_feature_1_two_seq: "1. 입력한 두 서열의 유사도를 확인할 수 있습니다.",
                    describe_feature_2_two_seq: "2. 입력한 두 서열의 돌연변이 목록을 확인할 수 있습니다.",
                    describe_method_seq_list_in_db: "사용 방법 : 제공되는 염기서열 목록 중 염기서열을 클릭하여 정보 확인",
                    describe_feature_1_seq_list_in_db: "1. 데이터 베이스에 저장된 염기서열 목록을 확인할 수 있습니다.",
                    describe_feature_2_seq_list_in_db: "2. 선택된 염기서열의 서열 및 단백질 구조를 캔버스를 통해 확인할 수 있습니다.",
                    describe_feature_3_seq_list_in_db: "3. 선택된 염기서열을 클립보드에 복사할 수 있습니다.",
                    describe_feature_4_seq_list_in_db: "4. 선택된 염기서열의 메타 데이터를 확인할 수 있습니다.",
                    describe_feature_5_seq_list_in_db: "5. 구글 맵을 통해 데이터 베이스에 저장된 염기서열의 분포를 확인할 수 있습니다.",

                    example_seq_open: "▼ 예시 염기서열 확인",
                    example_seq_close: "▲ 접기",
                    example_seq_id: "시퀀스 ID : SouthKorea/KCDC03/2020",
                },
            },

        },

    });

export default i18n;
