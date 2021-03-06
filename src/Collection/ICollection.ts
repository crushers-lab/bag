import ICloneable from "./ICloneable";
import Iterator from "./Iterator";

interface ICollection<Type> extends Iterable<Type>, ICloneable {
    size(): number;

    clear(): void;

    getIterator(): Iterator<Type>;

    entries(): Type[];

    isEmpty(): boolean;

    clone(): ICollection<Type>;
}

export default ICollection;
