import ICloneable, {isCloneable} from "../Collection/ICloneable";

export type NodeValue<T> = Node<T> | null;

class Node<Type> implements ICloneable {

    public set value(value: Type) {
        this._value = value;
    }

    public get value(): Type {
        return this._value;
    }

    public get links(): string[] {
        const it = this._links.keys();
        const keys = [];
        for (const key in it) {
            if (key) {
                keys.push(key);
            }
        }
        return keys;
    }

    public set left(node: NodeValue<Type>) {
        this.setLink(Node.LEFT, node);
    }

    public get left() {
        return this._link(Node.LEFT);
    }

    public set right(node: NodeValue<Type>) {
        this.setLink(Node.RIGHT, node);
    }

    public get right() {
        return this._link(Node.RIGHT);
    }

    public static readonly LEFT = "left";
    public static readonly RIGHT = "right";
    private readonly _links: Map<string, NodeValue<Type>>;
    private _value: Type;

    constructor(value: Type) {
        this._value = value;
        this._links = new Map<string, NodeValue<Type>>();
    }

    public setLink(key: string, value: NodeValue<Type>) {
        this._links.set(key, value);
    }

    public unlink(key: string) {
        this._links.delete(key);
    }

    public clone(): Node<Type> {
        const value = this.value ? (isCloneable(this.value) ? this.value.clone() : this.value) : null;
        const node = new Node(value as Type);
        this._links.forEach((n, key) => node._links.set(key, n ? n.clone() : null));
        return node;
    }

    protected _link(key: string): NodeValue<Type> {
        if (this._links.has(key)) {
            return this._links.get(key) as Node<Type>;
        }
        return null;
    }
}

export default Node;
