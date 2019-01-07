import Benchmark from "benchmark";
import {Queue} from "../../../src/index";

const limit = 10000;
const array: number[] = [];
const q = new Queue<number>();

const suite = new Benchmark.Suite("Dequeue", {
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

        while (array.length) {
            array.shift();
        }
    })
    .add('Queue', () => {

        while (q.size()) {
            q.dequeue();
        }
    });

export default suite;
