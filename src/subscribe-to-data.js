const subscribeToData = listener => workers => workers
    .map(worker => {
        worker.on('message', listener);

        return worker;
    });

module.exports = subscribeToData;
