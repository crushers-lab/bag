import Benchmark from "benchmark";
import {Queue} from "../../../src/index";

const limit = 10000;

const array: number[] = [];
const q = new Queue<number>();
const suite = new Benchmark.Suite("Iterator", {
    setup: () => {
        for (let i = 0; i < limit; i++) {
            array.unshift(i);
        }

        for (let i = 0; i < limit; i++) {
            q.enqueue(i);
        }
    }
});


suite
    .add('Array', () => {
        for (const num of array) {
            num.toString();
        }
    })
    .add('Queue', () => {
        for (const num of q) {
            num.toString();
        }
    })
    .add('Queue using iterable', () => {
        const it = q.getIterator();
        while (it.hasNext()) {
            it.next().toString();
        }
    });

export default suite;
