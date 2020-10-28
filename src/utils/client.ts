import Axios, { AxiosInstance, AxiosResponse, CancelToken } from "axios";

import * as cst from "./konst";


const baseURL = "http://localhost:8000/api";

const instance: AxiosInstance = Axios.create({
    baseURL,
    timeout: 1000000,
});


export function get_similar_seq_ids(sequence: string, how_many: number, cancelToken: CancelToken = null) {
    return instance.post("get_similar_seq_ids/", {
        [cst.KEY_SEQUENCE]: sequence,
        [cst.KEY_HOW_MANY]: how_many,
    }, {cancelToken});
}

export function get_metadata_of_seq(acc_id: string, column_list: string[], cancelToken: CancelToken = null) {
    return instance.post("get_metadata_of_seq/", {
        [cst.KEY_ACC_ID]: acc_id,
        [cst.KEY_COLUMN_LIST]: column_list,
    }, {cancelToken});
}
