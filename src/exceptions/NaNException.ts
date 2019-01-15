class NaNException extends Error {
    constructor() {
        super("Value is not a number");
    }
}

export default NaNException;
