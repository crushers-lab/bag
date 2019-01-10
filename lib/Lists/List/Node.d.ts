import { Node as AbstractNode } from "../../containers";
export declare type NodeValue<T> = Node<T> | null;
declare class Node<Type> extends AbstractNode<Type> {
    constructor(value: Type);
    link: NodeValue<Type>;
    clone(): Node<Type>;
}
export default Node;
