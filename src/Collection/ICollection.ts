import Iterator from "./Iterator";

interface ICollection<Type> extends Iterable<Type> {
    size(): number;

    clear(): void;

    getIterator(): Iterator<Type>;

    entries(): Type[];

    clone(): ICollection<Type>;
}

export default ICollection;
