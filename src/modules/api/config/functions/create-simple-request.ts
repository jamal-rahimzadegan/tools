import axios, { AxiosRequestConfig } from "axios";
import interceptResponse from "./intercept-response";

export default function createSimpleRequest(config: AxiosRequestConfig) {
	const instance = axios.create(config);
	interceptResponse(instance);
	return instance[config.method.toLowerCase()](config.url);
}
