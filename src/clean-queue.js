const { CLEAN_QUEUE } = require('./constants');

const cleanQueue = queue => message => {
    if (message.type === CLEAN_QUEUE) {
        console.log(`Saved ${message.result.id}`);
        const index = queue.indexOf(message.result.id);

        if (index > -1) {
            queue.splice(index, 1);
        }

        if (!queue.length) {
            console.log('done!');
            console.timeEnd('time spent');
            process.exit();
        }
    }
};

module.exports = cleanQueue;
