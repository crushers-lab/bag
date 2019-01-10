import { AbstractCollection } from "../Collection";
import IStack from "./IStack";
declare class Stack<Type> extends AbstractCollection<Type> implements IStack<Type> {
    /**
     * Handle to store the stack
     */
    private _stack;
    /**
     * Points to top of stack
     */
    private _top;
    constructor();
    clear(): void;
    clone(): Stack<Type>;
    entries(): Type[];
    pop(): Type;
    push(...items: Type[]): number;
    size(): number;
    /**
     * @function Assert stack is not empty
     * @throws {EmptyCollectionException} if stack is empty
     * @private
     */
    private _assertStack;
}
export default Stack;
