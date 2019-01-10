class NotFoundException extends Error {
    constructor() {
        super("Item not found in collection");
    }
}

export default NotFoundException;
