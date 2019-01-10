import {Node as AbstractNode} from "../../containers";

export type NodeValue<T> = Node<T> | null;

class Node<Type> extends AbstractNode<Type> {

    constructor(value: Type) {
        super(value);
    }

    public get link(): NodeValue<Type> {
        return this.right as NodeValue<Type>;
    }

    public set link(node: NodeValue<Type>) {
        this.right = node;
    }

    public clone(): Node<Type> {
        const root = super.clone() as Node<Type>;
        let temp: Node<Type> = root;
        while (temp.right) {
            temp.link = temp.right as Node<Type>;
            temp = temp.link;
        }
        return root;
    }
}

export default Node;
