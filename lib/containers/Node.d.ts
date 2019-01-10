import ICloneable from "../Collection/ICloneable";
export declare type NodeValue<T> = Node<T> | null;
declare class Node<Type> implements ICloneable {
    value: Type;
    readonly links: string[];
    left: NodeValue<Type>;
    right: NodeValue<Type>;
    static readonly LEFT = "left";
    static readonly RIGHT = "right";
    private readonly _links;
    private _value;
    constructor(value: Type);
    setLink(key: string, value: NodeValue<Type>): void;
    unlink(key: string): void;
    clone(): Node<Type>;
    protected _link(key: string): NodeValue<Type>;
}
export default Node;
