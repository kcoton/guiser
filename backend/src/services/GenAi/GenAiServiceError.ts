export default class GenAiServiceError extends Error {
    constructor(message?: string) {
        super(message);
        Error.captureStackTrace(this, GenAiServiceError);
    }
}
