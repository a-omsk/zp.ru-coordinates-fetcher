const { createInterface } = require('readline');
const { createReadStream } = require('fs');

const queueGenerator = require('./queue-generator');

const readIds = (file, queue) => (workers) => {
    const currentWorker = queueGenerator(workers);
    const readStream = createReadStream(file);

    createInterface({ input: readStream }).on('line', line => {
        const { value } = currentWorker.next();
        const worker = workers[value];
        const intLine = parseInt(line, 10);

        worker.send(intLine);
        queue.push(intLine);
    });
};

module.exports = readIds;
