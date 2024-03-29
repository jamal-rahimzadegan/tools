import React, { useEffect, useState } from "react";
import WorkerTool from "./worker-tool";
const testWorkerFile = require("./test-worker");

xport default function Index() {
  const [mockWorker, setMockWorker] = useState<object>({});

  const handleWorker = () => {
    const tempWorker: any = new WorkerTool(testWorkerFile);
    tempWorker.onmessage = (e) => console.log(`--- data ----> `, e.data);
    setMockWorker(tempWorker);
  };

  useEffect(handleWorker, []);

  return (
    <>
      <button onClick={() => mockWorker.postMessage(0 ? 100_000 : 50)}>Run a heavy task</button>
      <p>Can you click and select me without problem?</p>
    </>
  );
}

