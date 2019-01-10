import {AbstractCollection} from "../../Collection";
import {EmptyCollectionException, NotFoundException, OutOfBoundsException} from "../../exceptions";
import IList from "./IList";
import Node from "./Node";

class List<Type> extends AbstractCollection<Type> implements IList<Type> {

    private get root() {
        return this._root as Node<Type>;
    }
    private _root: Node<Type> | null = null;
    private _length: number = 0;

    public clear(): void {
        this._root = null;
        this._length = 0;
    }

    public clone(): List<Type> {
        const root = this._root ? this._root.clone() : null;
        const list = new List<Type>();
        list._root = root;
        list._length = this._length;
        return list;
    }

    public delete(value: Type): Type {
        this._assertRoot();
        let temp = this.root;
        if (temp.value === value) {
            this._root = temp.link;
            this._length--;
            return temp.value;
        }
        while (temp.link) {
            if (temp.link.value === value) {
                this._length--;
                temp.link = temp.link.link;
                return value;
            }
            temp = temp.link;
        }
        throw new NotFoundException();
    }

    public deleteAtBeginning(): Type {
        this._assertRoot();
        const n = this.root;
        this._root = n.link;
        this._length--;
        return n.value;
    }

    public deleteAtEnd(): Type {
        this._assertRoot();
        let node = this.root;
        if (node.link === null) {
            this._root = null;
            this._length--;
            return node.value;
        }
        while ((node.link as Node<Type>).link) {
            node = node.link as Node<Type>;
        }
        const last = node.link as Node<Type>;
        node.link = null;
        this._length--;
        return last.value;
    }

    public entries(): Type[] {
        let root = this._root;
        if (root === null) {
            return [];
        }
        const entries: Type[] = [];
        do {
            entries.push(root.value);
            root = root.link;
        } while (root);
        return entries;
    }

    public insertAfter(search: Type, value: Type): IList<Type> {
        const res = this.getNode(search);
        const next = res.link;
        const node = new Node<Type>(value);
        res.link = node;
        node.link = next;
        this._length++;
        return this;
    }

    public insertAt(index: number, value: Type): IList<Type> {
        if (index >= this._length) {
            throw new OutOfBoundsException();
        }
        const node = new Node<Type>(value);
        if (index === 0) {
            node.link = this.root;
            this._root = node;
            this._length++;
            return this;
        }
        let i = index;
        let root = this.root;
        while (i > 1) {
            root = root.link as Node<Type>;
            i--;
        }
        this._length++;
        const next = root.link;
        root.link = node;
        node.link = next;
        return this;
    }

    public insertAtBeginning(value: Type): IList<Type> {
        this._length++;
        const node = new Node<Type>(value);
        node.link = this._root;
        this._root = node;
        return this;
    }

    public insertAtEnd(value: Type): IList<Type> {
        const node = new Node<Type>(value);
        if (this._root === null) {
            this._root = node;
            this._length++;
            return this;
        }
        let root = this.root;
        while (root.link) {
            root = root.link;
        }
        root.link = node;
        this._length++;
        return this;
    }

    public insertBefore(search: Type, value: Type): IList<Type> {
        this._assertRoot();
        let root = this.root;
        if (root.link === null && search !== root.value) {
            throw new NotFoundException();
        }
        while (root.link && (root.link as Node<Type>).value !== search) {
            root = root.link as Node<Type>;
        }
        if (root.link === null) {
            throw new NotFoundException();
        }
        const found = root.link;
        const node = new Node<Type>(value);
        root.link = node;
        node.link = found;
        this._length++;
        return this;
    }

    public size(): number {
        return this._length;
    }

    private getNode(value: Type): Node<Type> {
        this._assertRoot();
        let root: Node<Type> | null = this.root;
        do {
            if (root.value === value) {
                return root;
            }
            root = root.link;
        } while (root);
        throw new NotFoundException();
    }

    private _assertRoot() {
        if (this._root === null) {
            throw new EmptyCollectionException();
        }
    }

}

export default List;
