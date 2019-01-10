import {List} from "../../../src";
import {EmptyCollectionException, NotFoundException, OutOfBoundsException} from "../../../src/exceptions";

describe("Tests on List operation", () => {
    test("Should be able to create List", () => {
        new List<number>();
    });
    test("Should be able to insert at beginning", () => {
        const list = new List<number>();
        list.insertAtBeginning(100);
        expect(list.size()).toBe(1);
        list.insertAtBeginning(50);
        expect(list.size()).toBe(2);
        const it = list.getIterator();
        expect(it.length).toBe(2);
        expect(it.next()).toBe(50);
        expect(it.next()).toBe(100);
        expect(it.hasNext()).toBe(false);
    });

    test("Should be able to delete at beginning", () => {
        const list = new List<number>();
        list.insertAtBeginning(100);
        expect(list.size()).toBe(1);
        list.insertAtBeginning(50);
        expect(list.size()).toBe(2);
        expect(list.deleteAtBeginning()).toBe(50);
        const it = list.getIterator();
        expect(it.length).toBe(1);
        expect(it.next()).toBe(100);
        expect(it.hasNext()).toBe(false);
        expect(list.deleteAtBeginning()).toBe(100);
        expect(() => {
            list.deleteAtBeginning();
        }).toThrowError(new EmptyCollectionException());
    });

    test("It should be able to insert at end", () => {
        const list = new List<number>();
        list.insertAtEnd(100);
        expect(list.size()).toBe(1);
        list.insertAtEnd(50);
        expect(list.size()).toBe(2);
        const it = list.getIterator();
        expect(it.length).toBe(2);
        expect(it.next()).toBe(100);
        expect(it.next()).toBe(50);
        expect(it.hasNext()).toBe(false);
    });

    test("It should be able to delete at end", () => {
        const list = new List<number>();
        list.insertAtEnd(100);
        list.insertAtEnd(50);
        list.insertAtEnd(25);
        expect(list.deleteAtEnd()).toBe(25);
        const it = list.getIterator();
        expect(it.length).toBe(2);
        expect(it.next()).toBe(100);
        expect(it.next()).toBe(50);
        expect(it.hasNext()).toBe(false);
        expect(list.deleteAtEnd()).toBe(50);
        expect(list.deleteAtEnd()).toBe(100);
        expect(() => {
            list.deleteAtEnd();
        }).toThrowError(new EmptyCollectionException());

    });

    test("Should be able to insert after", () => {
        const list = new List<number>();
        list.insertAtEnd(100);
        list.insertAtEnd(50);
        list.insertAtEnd(25);
        list.insertAtEnd(30);
        list.insertAfter(50, -1);
        expect(list.size()).toBe(5);
        const it = list.getIterator();
        expect(it.length).toBe(5);
        it.next();
        while (it.current !== 50) {
            it.next();
        }
        expect(it.next()).toBe(-1);
        expect(() => {
            list.insertAfter(-100, 101);
        }).toThrowError(new NotFoundException())
    });

    test("Should be able to insert before", () => {
        const list = new List<number>();
        list.insertAtEnd(100);
        list.insertAtEnd(50);
        list.insertAtEnd(25);
        list.insertAtEnd(30);
        list.insertBefore(50, -1);
        expect(list.size()).toBe(5);
        const it = list.getIterator();
        expect(it.length).toBe(5);
        it.next();
        while (it.current !== 50) {
            it.next();
        }
        it.prev();
        expect(it.prev()).toBe(-1);

        expect(() => {
            list.insertBefore(-100, 10);
        }).toThrowError(new NotFoundException());

        list.clear();
        expect(list.size()).toBe(0);

        expect(() => {
            list.insertBefore(1, 2);
        }).toThrowError(new EmptyCollectionException());

        list.insertAtBeginning(2);

        expect(() => {
            list.insertBefore(1, 2);
        }).toThrowError(new NotFoundException());

    });

    test("Insert at should work", () => {
        const list = new List<number>();
        list.insertAtEnd(100);
        list.insertAtEnd(50);
        list.insertAtEnd(25);
        list.insertAtEnd(30);
        list.insertAt(3, -1);
        expect(list.size()).toBe(5);
        let it = list.getIterator();
        expect(it.length).toBe(5);
        for (let i = 0; i <= 3; i++) {
            it.next();
        }
        expect(it.current).toBe(-1);
        list.insertAt(0, 10);
        it = list.getIterator();
        expect(it.next()).toBe(10);
        list.clear();

        expect(list.getIterator().length).toBe(0);

        expect(() => {
            list.insertAt(1, 10);
        }).toThrowError(new OutOfBoundsException())
    });

    test("Delete should work", () => {
        const list = new List<number>();
        list.insertAtEnd(100);
        list.insertAtEnd(50);
        list.insertAtEnd(25);
        list.insertAtEnd(30);
        list.insertAtEnd(40);
        list.delete(100);
        let it = list.getIterator();
        expect(it.length).toBe(4);
        expect(it.next()).toBe(50);
        list.delete(30);
        it = list.getIterator();
        expect(it.length).toBe(3);
        expect(it.next()).toBe(50);
        expect(it.next()).toBe(25);
        expect(it.next()).toBe(40);
        expect(it.hasNext()).toBe(false);
        expect(() => {
            list.delete(100);
        }).toThrowError(new NotFoundException())
    });

    test("Should be able to clone", () => {
        const list = new List<number>();
        list.insertAtEnd(100);
        list.insertAtEnd(50);
        list.insertAtEnd(25);
        list.insertAtEnd(30);
        list.insertAtEnd(40);
        let clone = list.clone();
        expect(clone.size()).toBe(list.size());
        expect(clone.entries()).not.toBe(list.entries());
        expect(clone.entries()).toEqual(list.entries());
        clone.deleteAtEnd();
        expect(clone.size()).toBe(list.size() - 1);
        clone.clear();
        clone = clone.clone();
        expect(clone.size()).toBe(0);
    });
});
