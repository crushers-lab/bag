class EmptyCollectionException extends Error {
    constructor() {
        super("AbstractCollection is empty");
    }
}

export default EmptyCollectionException;
