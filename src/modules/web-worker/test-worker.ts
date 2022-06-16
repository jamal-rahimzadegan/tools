function testWorker() {
	this.onmessage = (e) => {
		for (let i = 0; i < e.data; i++) postMessage(`from worker: ${i + 1}`);
	};
}

testWorker();

module.exports = testWorker;
