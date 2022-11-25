import handleError from "./handle-error";
import handleResponse from "./handle-response";

export default function interceptResponse(instance) {
	return instance.interceptors.response.use(handleResponse, handleError);
}
