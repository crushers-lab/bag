import Benchmark from "benchmark";
import {Queue} from "../../../src/index";

const suite = new Benchmark.Suite("Enqueue");

const limit = 10000;

suite
    .add('Array', () => {
        const array = [];
        for (let i = 0; i < limit; i++) {
            array.unshift(i);
        }
    })
    .add('Queue', () => {
        const q = new Queue<number>();
        for (let i = 0; i < limit; i++) {
            q.enqueue(i);
        }
    });

export default suite;
