import axios, { AxiosInstance } from "axios";
import { ls } from "utils";
import { apiConfig } from "config";
import interceptResponse from "../functions/intercept-response";

export default function createCustomizedRequest(method, api: string, config: ComplexObject = {}) {
	const { extraHeaders, data } = config || {};
	const token =
		ls.get(apiConfig.authTokenKey) ||
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoxNDQxOTMsImFwcF9pZCI6Mzg4NjAyMywiZXhwIjoxNjQxNjY2MTI5MCwiaG9zdF9pZCI6MzA4LCJqaXQiOiJlNTU2MzA3Zi1kZWMyLTQ0NzItODcyYi05YTE4NDdkMTc3ZDAiLCJtb2JpbGVfbm8iOiIwOTAxMTQxMjc1MyJ9.0esWE_hdKKkGH0dteIzUx7jUB4lGzASW4VpU-0LV5bc";
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
