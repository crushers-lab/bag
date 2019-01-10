import {Queue} from "../../src";
import {IIterator} from "../../src/Collection";
import {EmptyCollectionException, OutOfBoundsException} from "../../src/exceptions";

describe("Tests on queue", () => {
    let queue: Queue<number>;
    const data: number[] = [];
    beforeAll(() => {
        for (let i = 0; i < 100; i++) {
            data.push(i);
        }
    });

    test("It should create a queue", () => {
        queue = new Queue<number>(100);
    });

    test("enqueue should work", () => {
        data.forEach((i) => queue.enqueue(i));
        expect(queue.size()).toEqual(data.length);
        expect(queue.entries()).toEqual(data);
    });

    test("Iterator should work", () => {
        const iterator: IIterator<number> = queue.getIterator();
        let i = 0;
        while (iterator.hasNext()) {
            expect(iterator.next()).toEqual(data[i++]);
        }
        expect(i).toBe(queue.size());
        while (iterator.hasPrev()) {
            expect(iterator.prev()).toEqual(data[--i]);
        }
        expect(i).toEqual(0);
    });

    test("Reset should work", () => {
        const iterator = queue.getIterator();
        while (iterator.hasNext()) {
            iterator.next();
        }
        iterator.reset();
        let i = 0;
        while (iterator.hasNext()) {
            expect(iterator.next()).toEqual(data[i++]);
        }
        expect(i).toBe(queue.size());
    });

    test("For of should work", () => {
        let i = 0;
        for (const num of queue) {
            expect(num).toEqual(data[i++]);
        }
        expect(i).toBe(data.length);
    });

    test("entries should work", () => {
        expect(queue.entries()).toEqual(data);
    });

    test("Dequeue should work", () => {
        const dup = [...data];
        const q = queue.clone();
        while (q.size()) {
            const num = dup.shift();
            expect(q.dequeue()).toEqual(num);
            expect(q.entries()).toEqual(dup);
        }
        expect(queue.entries()).toEqual(data);
    });

    test("DeQueue should throw if queue is empty", () => {
        const q = new Queue();
        expect(() => {
            q.dequeue();
        }).toThrowError(new EmptyCollectionException());
    });
    test("Queue can be cleared", () => {
        const q = queue.clone();
        expect(q.size()).toBeGreaterThan(0);
        q.clear();
        expect(q.size()).toBe(0);
    });

    test("Queue can be initialized with zero", () => {
        const q = new Queue(0);
        q.clear();
    });

    test("Copy to beginning", () => {
        Queue.MAX_EMPTY = 3;
        expect(Queue.MAX_EMPTY).toBe(3);
        const q = new Queue();
        q.enqueue(1, 2, 3, 4, 5, 6);
        q.dequeue();
        q.dequeue();
        q.dequeue();
        q.dequeue();
        q.enqueue(1);
    });

    test("Tests for iterator", () => {
        const it = queue.getIterator();
        it.start();
        expect(it.current).toBe(data[0]);
        it.end();
        expect(it.current).toBe(data[it.length - 1]);
        expect(it.hasNext()).toBe(false);
        expect(() => {
            it.next();
        }).toThrowError(new OutOfBoundsException());

        it.start();
        expect(it.hasPrev()).toBe(false);
        expect(() => {
            it.prev();
        }).toThrowError(new OutOfBoundsException());

        const q = new Queue();
        expect(() => {
            q.getIterator().start();
        }).toThrowError(new EmptyCollectionException());
    });
});
