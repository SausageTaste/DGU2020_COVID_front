import Axios, { AxiosInstance, AxiosResponse, CancelToken } from "axios";


const baseURL = "http://192.168.0.105:8000/api";

const instance: AxiosInstance = Axios.create({
    baseURL,
    timeout: 1000000,
});


export interface Message {
    id?: string;
    body?: string;
    user?: {
        id?: string
        name?: string
        avatar?: string
    };
    date?: string;
};

export const fetchMessages = (channelName: string, params = {}, cancelToken: CancelToken = null): Promise<AxiosResponse<{ messages: Message[] }>> => {
    return instance.get(`channels/${channelName}/messages`, {
        params, cancelToken
    });
};

export const postMessage = (channelName: string, payload: Message, cancelToken: CancelToken = null): Promise<AxiosResponse<Message>> => {
    return instance.post(`/channels/${channelName}/messages`, payload, {cancelToken});
}

export const requestEcho = (message: string, cancelToken: CancelToken = null): Promise<AxiosResponse> => {
    return instance.post("echo/", {body: message}, {cancelToken});
}

export const similarSeqIDs = (sequence: string, how_many: number, cancelToken: CancelToken = null): Promise<AxiosResponse> => {
    return instance.post("similar_seq_ids/", {seq: sequence, how_many: how_many}, {cancelToken});
};
