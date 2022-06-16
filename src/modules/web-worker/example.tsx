import React, { useEffect } from "react";
import WorkerService from "./worker";
// @ts-ignore
import testWorkerFile from "./test-worker";

let testWorker;

export default function Index() {
	const handleWorker = () => {
		testWorker = new WorkerService(testWorkerFile);
		testWorker.onmessage = (e) => {
			console.log(`--- data ----> `, e.data);
		};
	};

	useEffect(handleWorker, []);

	return (
		<>
			<button onClick={() => testWorker.postMessage(0 ? 100_000 : 50)}>
				Run a heavy task
			</button>
			<p>Can you click and select me without problem?</p>
		</>
	);
}
