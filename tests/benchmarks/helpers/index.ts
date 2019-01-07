import logger from "./logger";
import Benchmark from "benchmark";

async function run(suite: Benchmark.Suite) {
    return new Promise((resolve) => {
        logger.debug("Running suite", (suite as any).name);
        const array: any = {complete: [], cycle: []};
        suite
            .on('complete', () => {
                array.complete.push(`Fastest is  ${suite.filter('fastest').map((data: any) => data.name).join(",")}`);
                resolve(array);
            })
            .on('cycle', (event: any) => {
                array.complete.push(String(event.target));
            })
            .run({async: false});
    });
}

async function start(suites: any) {
    logger.debug("Running on", Benchmark.platform.toString());
    logger.debug("*********************************************");
    const keys = Object.keys(suites);
    const result: any = {};
    for (let key of keys) {
        logger.debug(".........................................");
        logger.debug("Running suites for", key);
        result[key] = {};
        for (let suite of suites[key]) {
            result[key][(suite as any).name] = await run(suite);
        }
        logger.debug(".........................................");
    }
    logger.debug("*********************************************");
    prepareReport(result);
}

function prepareReport(obj: any) {
    const tests = Object.keys(obj);
    tests.forEach((test) => {
        const suites = Object.keys(obj[test]);
        logger.info("========================SUITE START==============================");
        logger.debug("Suite For:", test);
        suites.forEach((suite) => {
            logger.info("====================================================================");
            logger.debug("Suite :", suite);
            const {complete, cycle} = obj[test][suite];
            cycle.forEach((c: any) => {
                logger.info(c);
            });
            complete.forEach((c: any) => {
                logger.info(c);
            });
            logger.info("====================================================================");
        });
        logger.info("=========================SUITE END=================================");
    });
}

export {logger, start, run};
