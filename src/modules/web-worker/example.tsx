import React, { useEffect, useState } from "react";
import WorkerTool from "./worker-tool";
const testWorkerFile = require("./test-worker");

export default function Index() {
	const [testWorker, setTestWorker] = useState<any>({});

	const handleWorker = () => {
		let tempWorker: any = new WorkerTool(testWorkerFile);

		tempWorker.onmessage = (e) => {
			console.log(`--- data ----> `, e.data);
		};

		setTestWorker(tempWorker);
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
