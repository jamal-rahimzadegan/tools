/**
 * the `workerFile` is a worker file that is imported in your code -> import workerFile from "./"
 */

export default class WorkerService {
    constructor(workerFile) {
        if (typeof workerFile === 'undefined') {
            console.error('The worker file is malformed.');
            return;
        }

        if (typeof Worker === 'undefined') {
            console.error('Web Worker is not supported.');
            return;
        }

        const workerCode: string = workerFile.toString();
        const workerBlob: Blob = new Blob([`(${workerCode})()`]);
        return new Worker(URL.createObjectURL(workerBlob));
    }
}