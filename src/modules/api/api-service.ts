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

    protected createAdvancedRequest(method: Method, api: string, config: AxiosRequestConfig) {
        return createCustomizedRequest(method, api, config);
    }

    simple(config: AxiosRequestConfig) {
        return createSimpleRequest(config);
    }

   async refreshToken() {
    const { newToken } = await this.createAdvancedRequest.post("refresh-token",
    { refreshToken: "YOUR_REFRESH_TOKEN"} );

    // Update the old token 
    // this.token=newToken
    // localStorage.setItem("token", newToken); // or cookie or maybe with intercept
  }
}
