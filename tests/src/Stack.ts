import {Stack} from "../../src";
import {IIterator} from "../../src/Collection";
import {EmptyCollectionException} from "../../src/exceptions";

describe("Tests on stack", () => {
    let stack: Stack<number>;
    const data: number[] = [];
    beforeAll(() => {
        for (let i = 0; i < 100; i++) {
            data.push(i);
        }
    });

    test("It should create a stack", () => {
        stack = new Stack<number>();
    });

    test("push should work", () => {
        data.forEach((i) => stack.push(i));
        expect(stack.size()).toEqual(data.length);
        expect(stack.entries()).toEqual(data);
    });

    test("Iterator should work", () => {
        const iterator: IIterator<number> = stack.getIterator();
        let i = 0;
        while (iterator.hasNext()) {
            expect(iterator.next()).toEqual(data[i++]);
        }
        expect(i).toBe(stack.size());
        while (iterator.hasPrev()) {
            expect(iterator.prev()).toEqual(data[--i]);
        }
        expect(i).toEqual(0);
    });

    test("Reset should work", () => {
        const iterator = stack.getIterator();
        while (iterator.hasNext()) {
            iterator.next();
        }
        iterator.reset();
        let i = 0;
        while (iterator.hasNext()) {
            expect(iterator.next()).toEqual(data[i++]);
        }
        expect(i).toBe(stack.size());
    });

    test("For of should work", () => {
        let i = 0;
        for (const num of stack) {
            expect(num).toEqual(data[i++]);
        }
        expect(i).toBe(data.length);
    });

    test("entries should work", () => {
        expect(stack.entries()).toEqual(data);
    });

    test("Empty exception should work", () => {
        const s = new Stack();
        expect(() => {
            s.pop();
        }).toThrowError(new EmptyCollectionException());
    });

    test("Pop should work", () => {
        const dup = [...data];
        const s = stack.clone();
        while (s.size()) {
            const num = dup.pop();
            expect(s.pop()).toEqual(num);
            expect(s.entries()).toEqual(dup);
        }
        expect(stack.entries()).toEqual(data);
    });
    test("Stack can be cleared", () => {
        const s = stack.clone();
        expect(s.size()).toBeGreaterThan(0);
        s.clear();
        expect(s.size()).toBe(0);
    });
});
