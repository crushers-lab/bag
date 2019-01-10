interface IIterator<Type> {
    hasNext(): boolean;
    next(): Type;
    hasPrev(): boolean;
    prev(): Type;
    reset(): void;
    start(): void;
    end(): void;
}
export default IIterator;
