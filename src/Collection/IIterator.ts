interface IIterator<Type> {
    hasNext(): boolean;

    next(): Type;

    hasPrev(): boolean;

    prev(): Type;

    reset(): void;
}

export default IIterator;
