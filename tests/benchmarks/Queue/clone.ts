import Benchmark from "benchmark";
import {Queue} from "../../../src/index";

const limit = 10000;

const array: number[] = [];
const q = new Queue<number>();
const suite = new Benchmark.Suite("Clone", {
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
        const clone = [...array];
        clone.length;
    })
    .add('Queue', () => {
        const clone = q.clone();
        clone.size();
    });

export default suite;
