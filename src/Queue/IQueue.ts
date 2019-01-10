import {ICollection} from "../Collection";

interface IQueue<Type> extends ICollection<Type> {
    enqueue(item: Type): number;

    dequeue(): Type;
}

export default IQueue;
