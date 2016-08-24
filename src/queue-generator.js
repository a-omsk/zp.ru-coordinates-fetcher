module.exports = function* queueGenerator(workers) {
    let index = 0;

    while (true) {
        const isLastWorker = index === workers.length;

        if (isLastWorker) {
            index = 0;
        }
        yield index++;
    }
};
