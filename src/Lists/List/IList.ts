import ICollection from "../../Collection/ICollection";

interface IList<Type> extends ICollection<Type> {

    insertAtEnd(value: Type): IList<Type>;

    insertAtBeginning(value: Type): IList<Type>;

    insertAt(index: number, value: Type): IList<Type>;

    insertAfter(search: Type, value: Type): IList<Type>;

    insertBefore(search: Type, value: Type): IList<Type>;

    delete(value: Type): Type;

    deleteAtEnd(): Type;

    deleteAtBeginning(): Type;
}

export default IList;
