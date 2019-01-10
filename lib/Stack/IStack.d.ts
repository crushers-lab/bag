import ICollection from "../Collection/ICollection";
interface IStack<Type> extends ICollection<Type> {
    /**
     * @function To push elements to end of list
     * @param {Type[]} items
     */
    push(...items: Type[]): number;
    /**
     * @function get last element in list
     * @returns returns the last element
     * @throws {EmptyCollectionException} if stack is empty
     */
    pop(): Type;
}
export default IStack;
