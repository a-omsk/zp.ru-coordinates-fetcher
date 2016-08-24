const cluster = require('cluster');
const { cpus } = require('os');

module.exports = function prepareWorkers() {
    const workers = [];

    return new Promise(resolve => {
        const numWorkers = cpus().length;

        console.log(`Master cluster setting up ${numWorkers} workers...`);

        for (let i = 0; i < numWorkers; i++) {
            cluster.fork();
        }

        cluster.on('online', worker => {
            console.log(`Worker ${worker.process.pid} is online`);
            workers.push(worker);

            if (workers.length === numWorkers) {
                resolve(workers);
            }
        });
    });
};
