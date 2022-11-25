import { AxiosError, AxiosResponse } from "axios";

type ApiResponseType =
	| Pick<AxiosResponse, "data">
	| {
			status: number;
			message: string;
			error: Pick<AxiosError, "config" | "request">;
	  };

export default function handleResponse(res: AxiosResponse, api?: string): Promise<ApiResponseType> {
	const { status, data, statusText, request, config } = res || {};
	// console.log(`-----${api}-----> `, res);

	return new Promise((resolve, reject) => {
		status >= 200 && status < 300
			? resolve(data)
			: reject({
					status,
					message: statusText || "Unknown Error",
					error: { request, config },
			  });
	});
}
