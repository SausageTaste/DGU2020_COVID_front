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

                    service_description: 'COVIDGU is COVID-19 sequence analysis service, designed to be easy for nonprofessional population',
                    function_description: 'Here are the features',
                    single_seq_query_description: "Enter your nucleotide sequence and get virus data, whose sequence is similiar to yours.",
                    two_seq_comp_description: 'Enter two nucleotide sequences. We\'ll show you similarity scores and a mutation list.',
                    two_seq_comp_description_2: "Each mutation is labeled with a degree of danger.",
                    seq_list_in_db_description: `List of all virus data we have in DB can be found here. ` +
                                                `There is a small interactive sequence view.`,
                    seq_list_in_db_description_2: 'You can copy sequences to your clipboard.',
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
<<<<<<< HEAD
                    caution_description: "It is a mutation found only in one region(country).",
                    warning: "Warning",
                    warning_description: "It is a mutation found in several regions(countries) and needs attention.",
                    danger: "Danger",
                    danger_description: `It is a mutation found in several regions (countries) and 
                    affecting infection in regions (countries). It is very dangerous.`,
=======
                    caution_description: "The mutations found only in one region(country).",
                    warning: "Warning",
                    warning_description: "The mutations found in several regions. Attention required.",
                    danger: "Danger",
                    danger_description: `The mutations found in several regions. ` +
                                        `They have significant effect on infections in those regions, ` +
                                        `thus they are dangerous.`,
>>>>>>> main
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

<<<<<<< HEAD
=======
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

>>>>>>> main
                    algeria: 'Algeria',
                    andorra: 'Andorra',
                    china: 'China',
                    argentina: 'Argentina',
                    aruba: 'Aruba',
                    australia: 'Australia',
                    austria: 'Austria',
                    bahrain: 'Bahrain',
                    bangladesh: 'Bangladesh',
                    belarus: 'Belarus',
                    belgium: 'Belgium',
                    belize: 'Belize',
                    benin: 'benin',
                    'bosnia and herzegovina': 'bosnia and herzegovina',
                    botswana: 'botswana',
                    brazil: 'brazil',
                    brunei: 'brunei',
                    romania: 'romania',
                    bulgaria: 'bulgaria',
                    cambodia: 'cambodia',
                    cameroon: 'cameroon',
                    canada: 'canada',
                    'hong kong': 'hong kong',
                    'united kingdom': 'united kingdom',
                    france: 'france',
                    spain: 'spain',
                    chile: 'chile',
                    colombia: 'colombia',
                    'republic of the congo': 'republic of the congo',
                    'costa rica': 'costa rica',
                    "côte d'ivoire": "côte d'ivoire",
                    crimea: 'crimea',
                    croatia: 'croatia',
                    cuba: 'cuba',
                    curacao: 'curacao',
                    cyprus: 'cyprus',
                    'czech republic': 'czech republic',
                    denmark: 'denmark',
                    'dominican republic': 'dominican republic',
                    'democratic republic of the congo': 'democratic republic of the congo',
                    ecuador: 'ecuador',
                    egypt: 'egypt',
                    netherlands: 'netherlands',
                    uruguay: 'uruguay',
                    usa: 'usa',
                    estonia: 'estonia',
                    finland: 'finland',
                    gabon: 'gabon',
                    gambia: 'gambia',
                    georgia: 'georgia',
                    germany: 'germany',
                    ghana: 'ghana',
                    gibraltar: 'gibraltar',
                    greece: 'greece',
                    guadeloupe: 'guadeloupe',
                    guam: 'guam',
                    guatemala: 'guatemala',
                    hungary: 'hungary',
                    iceland: 'iceland',
                    india: 'india',
                    indonesia: 'indonesia',
                    iran: 'iran',
                    iraq: 'iraq',
                    ireland: 'ireland',
                    israel: 'israel',
                    italy: 'italy',
                    jamaica: 'jamaica',
                    japan: 'japan',
                    jordan: 'jordan',
                    kazakhstan: 'kazakhstan',
                    kenya: 'kenya',
                    kuwait: 'kuwait',
                    latvia: 'latvia',
                    lebanon: 'lebanon',
                    lithuania: 'lithuania',
                    luxembourg: 'luxembourg',
                    madagascar: 'madagascar',
                    malaysia: 'malaysia',
                    mali: 'mali',
                    malta: 'malta',
                    mexico: 'mexico',
                    moldova: 'moldova',
                    mongolia: 'mongolia',
                    montenegro: 'montenegro',
                    morocco: 'morocco',
                    myanmar: 'myanmar',
                    nepal: 'nepal',
                    'new zealand': 'new zealand',
                    nigeria: 'nigeria',
                    'north macedonia': 'north macedonia',
                    norway: 'norway',
                    oman: 'oman',
                    pakistan: 'pakistan',
                    palestine: 'palestine',
                    panama: 'panama',
                    peru: 'peru',
                    philippines: 'philippines',
                    poland: 'poland',
                    portugal: 'portugal',
                    qatar: 'qatar',
                    russia: 'russia',
                    rwanda: 'rwanda',
                    'saint barthélemy': 'saint barthélemy',
                    'saint martin': 'saint martin',
                    'saudi arabia': 'saudi arabia',
                    senegal: 'senegal',
                    serbia: 'serbia',
                    kosovo: 'kosovo',
                    'sierra leone': 'sierra leone',
                    singapore: 'singapore',
                    slovakia: 'slovakia',
                    slovenia: 'slovenia',
                    'south africa': 'south africa',
                    'south korea': 'south korea',
                    'sri lanka': 'sri lanka',
                    suriname: 'suriname',
                    sweden: 'sweden',
                    switzerland: 'switzerland',
                    taiwan: 'taiwan',
                    thailand: 'thailand',
                    'timor-leste': 'timor-leste',
                    tunisia: 'tunisia',
                    turkey: 'turkey',
                    uganda: 'uganda',
                    ukraine: 'ukraine',
                    'united arab emirates': 'united arab emirates',
                    venezuela: 'venezuela',
                    vietnam: 'vietnam',
                    zambia: 'zambia',

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

<<<<<<< HEAD
=======
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

>>>>>>> main
                    algeria: '알제리',
                    andorra: '안도라',
                    china: '중국',
                    argentina: '아르헨티나',
                    aruba: '아루바',
                    australia: '호주',
                    austria: '오스트리아',
                    bahrain: '바레인',
                    bangladesh: '방글라데시',
                    belarus: '벨로루시',
                    belgium: '벨기에',
                    belize: '벨리즈',
                    benin: '베닌',
                    'bosnia and herzegovina': '보스니아 헤르체고비나 ',
                    botswana: '보츠나와',
                    brazil: '브라질',
                    brunei: '브루나이',
                    romania: '루마니아',
                    bulgaria: '불가리아',
                    cambodia: '캄보디아',
                    cameroon: '카메룬',
                    canada: '캐나다',
                    'hong kong': '홍콩',
                    'united kingdom': '영국',
                    france: '프랑스',
                    spain: '스페인',
                    chile: '칠레',
                    colombia: '콜롬비아',
                    'republic of the congo': '콩고',
                    'costa rica': '코스타리카',
                    "côte d'ivoire": '코트디부아르',
                    crimea: '크림 반도',
                    croatia: '크로아티아',
                    cuba: '쿠바',
                    curacao: '큐라소 섬',
                    cyprus: '사이프러스',
                    'czech republic': '체코',
                    denmark: '덴마크',
                    'dominican republic': '도미니카공화국',
                    'democratic republic of the congo': '콩고민주공화국',
                    ecuador: '에콰도르',
                    egypt: '이집트',
                    netherlands: '네덜란드',
                    uruguay: '우루과이',
                    usa: '미국',
                    estonia: '에스토니아',
                    finland: '핀란드',
                    gabon: '가봉',
                    gambia: '감비아',
                    georgia: '조지아',
                    germany: '독일',
                    ghana: '가나',
                    gibraltar: '지브롤터',
                    greece: '그리스',
                    guadeloupe: '과들루프',
                    guam: '괌',
                    guatemala: '과테말라',
                    hungary: '헝가리',
                    iceland: '아이슬란드',
                    india: '인도',
                    indonesia: '인도네시아',
                    iran: '이란',
                    iraq: '이라크',
                    ireland: '아일랜드',
                    israel: '이스라엘',
                    italy: '이탈리아',
                    jamaica: '자메이카',
                    japan: '일본',
                    jordan: '요르단',
                    kazakhstan: '카자흐스탄',
                    kenya: '케냐',
                    kuwait: '쿠웨이트',
                    latvia: '라트비아',
                    lebanon: '레바논',
                    lithuania: '리투아니아',
                    luxembourg: '룩셈부르크',
                    madagascar: '마다가스카르',
                    malaysia: '말레이시아',
                    mali: '말리',
                    malta: '몰타',
                    mexico: '멕시코',
                    moldova: '몰도바',
                    mongolia: '몽골',
                    montenegro: '몬테네그로',
                    morocco: '모로코',
                    myanmar: '미얀마',
                    nepal: '네팔',
                    'new zealand': '뉴질랜드',
                    nigeria: '나이지리아',
                    'north macedonia': '북마케도니아',
                    norway: '노르웨이',
                    oman: '오만',
                    pakistan: '파키스탄',
                    palestine: '팔레스타인',
                    panama: '파나마',
                    peru: '페루',
                    philippines: '필리핀',
                    poland: '폴란드',
                    portugal: '포르투갈',
                    qatar: '카타르',
                    russia: '러시아',
                    rwanda: '르완다',
                    'saint barthélemy': '생바르텔레미',
                    'saint martin': '세인트마틴 섬',
                    'saudi arabia': '사우디아라비아',
                    senegal: '세네갈',
                    serbia: '세르비아',
                    kosovo: '코소보',
                    'sierra leone': '시에라리온',
                    singapore: '싱가포르',
                    slovakia: '슬로바키아',
                    slovenia: '슬로베니아',
                    'south africa': '남아프리카공화국',
                    'south korea': '대한민국',
                    'sri lanka': '스리랑카',
                    suriname: '수리남',
                    sweden: '스웨덴',
                    switzerland: '스위스',
                    taiwan: '대만',
                    thailand: '태국',
                    'timor-leste': '동티모르',
                    tunisia: '튀니지',
                    turkey: '터키',
                    uganda: '우간다',
                    ukraine: '우크라이나',
                    'united arab emirates': '아랍에미리트',
                    venezuela: '베네수엘라',
                    vietnam: '베트남',
                    zambia: '잠비아',

                },
            },

        },

    });

export default i18n;
