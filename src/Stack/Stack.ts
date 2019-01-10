import {AbstractCollection} from "../Collection";
import {EmptyCollectionException} from "../exceptions";
import IStack from "./IStack";

class Stack<Type> extends AbstractCollection<Type> implements IStack<Type> {
    /**
     * Handle to store the stack
     */
    private _stack: Type[];

    /**
     * Points to top of stack
     */
    private _top: number = -1;

    constructor() {
        super();
        this._stack = [];
    }

    public clear(): void {
        this._top = -1;
        this._stack = [];
    }

    public clone(): Stack<Type> {
        const stack = new Stack<Type>();
        stack._stack = [...this._stack];
        stack._top = this._top;
        return stack;
    }

    public entries(): Type[] {
        if (this._top === -1) {
            return [];
        }
        return this._stack.slice(0, this.size());
    }

    public pop(): Type {
        this._assertStack();
        return this._stack[this._top--];
    }

    public push(...items: Type[]): number {
        items.forEach((item) => {
            this._stack[++this._top] = item;
        });
        return this.size();
    }

    public size(): number {
        return this._top + 1;
    }

    /**
     * @function Assert stack is not empty
     * @throws {EmptyCollectionException} if stack is empty
     * @private
     */
    private _assertStack() {
        if (this.isEmpty()) {
            throw new EmptyCollectionException();
        }
    }

}

export default Stack;
