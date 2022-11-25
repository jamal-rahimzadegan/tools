import { AxiosError } from "axios";

export default function handleError(error: AxiosError, api?: string) {
	// console.log(`-----${api}-----> `, error);
	const { message = "Unknown Error", request: { status } = "unknown" } = error || {};
	throw { message, status, error };
}
