import {AxiosRequestConfig, Method} from "axios";
import {METHODS} from "./config/constant";
import createCustomizedRequest from "./config/functions/create-customized-request";
import createSimpleRequest from "./config/functions/create-simple-request";

export default class ApiService {
    post: (api: string, config?: AxiosRequestConfig) => any;
    get: (api: string, config?: Omit<AxiosRequestConfig, "data">) => any;

    constructor() {
        METHODS.forEach((method) => (this[method] = this.createAdvancedRequest.bind(this, method)));
    }

    protected handleTokenRefresh = () => {
    };

    protected createAdvancedRequest(method: Method, api: string, config: AxiosRequestConfig) {
        return createCustomizedRequest(method, api, config);
    }

    simple(config: AxiosRequestConfig) {
        return createSimpleRequest(config);
    }

    refreshToken() {
        //    You can add it here
    }
}
