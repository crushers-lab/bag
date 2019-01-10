import { AbstractCollection } from "../../Collection";
import IList from "./IList";
declare class List<Type> extends AbstractCollection<Type> implements IList<Type> {
    private readonly root;
    private _root;
    private _length;
    clear(): void;
    clone(): List<Type>;
    delete(value: Type): Type;
    deleteAtBeginning(): Type;
    deleteAtEnd(): Type;
    entries(): Type[];
    insertAfter(search: Type, value: Type): IList<Type>;
    insertAt(index: number, value: Type): IList<Type>;
    insertAtBeginning(value: Type): IList<Type>;
    insertAtEnd(value: Type): IList<Type>;
    insertBefore(search: Type, value: Type): IList<Type>;
    size(): number;
    private getNode;
    private _assertRoot;
}
export default List;
