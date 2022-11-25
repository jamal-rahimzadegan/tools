import axios, {AxiosInstance} from "axios";
import {apiConfig} from "config";
import interceptResponse from "../functions/intercept-response";

export default function createCustomizedRequest(method, api: string, config: Record<string, any> = {}) {
    const {extraHeaders, data} = config || {};
    const token = localStorage.get("token");

    const instance: AxiosInstance = axios.create({
        method,
        data,
        baseURL: process.env.REACT_APP_BASE_URL,
        url: api,
        timeout: apiConfig.apiTimeout,
        validateStatus: () => true,
        headers: {
            ...extraHeaders,
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "JWT " + token,
        },
    });

    interceptResponse(instance);

    return instance[method](api, data || null);
}
