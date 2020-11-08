import Axios, { AxiosInstance, AxiosResponse, CancelToken } from "axios";

import * as cst from "./konst";


const baseURL = "http://localhost:8000/api";

const instance: AxiosInstance = Axios.create({
    baseURL,
    timeout: 1000000,
});


/**
 * @param sequence looks like 'GCATACACTCGCTATGTCGATAACAACTTCTG...'
 * @param how_many specifies how many similar sequences you'd like to get
 *
 * @returns looks like this
 * {
 *     "EPI_ISL_449476": {
 *         "simil_identity": 98.46424,
 *         "simil_bit_score": 1234,
 *     },
 *     "blah blah": { ... },
 *     ...
 * }
 * For the key strings "simil_identity" and "simil_bit_score" use constant variables
 * defined in {root}/src/utils/konst.ts, which named KEY_SIMILARITY_IDENTITY, KEY_SIMILARITY_BIT_SCORE
 */
export function get_similar_seq_ids(sequence: string, how_many: number, cancelToken: CancelToken = null) {
    return instance.post("get_similar_seq_ids/", {
        [cst.KEY_SEQUENCE]: sequence,
        [cst.KEY_HOW_MANY]: how_many,
    }, {cancelToken});
}


/**
 * @param acc_id looks like 'EPI_ISL_449476'
 * @param column_list
 * use empty list to get all columns of the a sequence.
 * Or select specific columns by passing in something like ["acc_id", "gebank_accession", "division"]
 * The whole list of column names can be found in file {backend repo root}/extern/DGU2020_covid_database/database/setting.sql
 *
 * @returns dict[string, string]
 * Which looks like this
 * {
 *     "acc_id": "EPI_ISL_449476",
 *     "gebank_accession": "...",
 *     "division": "...",
 *     ...
 * }
*/
export function get_metadata_of_seq(acc_id: string, column_list: string[], cancelToken: CancelToken = null) {
    return instance.post("get_metadata_of_seq/", {
        [cst.KEY_ACC_ID]: acc_id,
        [cst.KEY_COLUMN_LIST]: column_list,
    }, {cancelToken});
}


/**
 * @param sequence_1 A DNA sequence of a covid19 to compare
 * @param sequence_2 Same
 * @returns
 * A dictionary that has
 * * error_code: int
 * * simil_identity: number
 * * simil_bit_score: number
 *
 * Use constant variables for the key
 * * cst.KEY_ERROR_CODE
 * * cst.KEY_SIMILARITY_IDENTITY
 * * cst.KEY_SIMILARITY_BIT_SCORE
 */
export function calc_similarity_of_two_seq(sequence_1: string, sequence_2: string, cancelToken: CancelToken = null) {
    return instance.post("calc_similarity_of_two_seq/", {
        [cst.KEY_SEQUENCE_LIST]: [sequence_1, sequence_2],
    }, {cancelToken});
}


/**
 *
 * @returns List of acc_id
 */
export function get_all_acc_ids(cancelToken: CancelToken = null) {
    return instance.get("get_all_acc_ids/", {cancelToken});
}


/**
 * @param sequence_1 A DNA sequence of a covid19 to compare
 * @param sequence_2 Same
 * @returns The structure of result values may change
 * A dictionary that has
 * * error_code: int
 * * mut_change_list: List[string, string, number]
 * * mut_indel_list: List[string, string]
 *
 * An element of 'mut_change_list' looks like `['A', 'G', 4]`.
 * The meanings of those are that first and second ones are amino acid
 * and the third one is location of the change, using 1 as the first index.
 *
 * An element of 'mut_indel_list' looks like `['19_20_INS', 'GTTGAAA']`.
 * The first element is composed like `{index of first seq}_{index of second seq}_{ins which means insert, or del which means delete}`.
 * The second one is obviously a string of the amino acid.
 */
export function find_mutations(sequence_1: string, sequence_2: string, cancelToken: CancelToken = null) {
    return instance.post("find_mutations/", {
        [cst.KEY_SEQUENCE_LIST]: [sequence_1, sequence_2],
    }, {cancelToken});
}
