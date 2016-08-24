const cluster = require('cluster');

const prepareImageDir = require('./prepare-image-dir');
const prepareWorkers = require('./prepare-workers');
const chainPromises = require('./chain-promises');

const fetchGeo = require('./fetch-geo');
const fetchCoordinates = require('./fetch-coordinates');
const fetchImages = require('./fetch-images');

const readIds = require('./read-ids');
const subscribeToData = require('./subscribe-to-data');
const writeOutput = require('./write-output');
const saveImage = require('./save-image');
const cleanQueue = require('./clean-queue');

const { WRITE_OUTPUT, CLEAN_QUEUE } = require('./constants');

const inputFile = process.argv[2];
const outputFile = process.argv[3] || 'output.txt';
const imageDir = process.argv[4] || 'img';

if (cluster.isWorker) {
    const sendMgs = type => result => {
        process.send({ type, result });
        return result;
    };

    process.on('message', id => {
        const pipes = [
            fetchGeo,
            fetchCoordinates,
            sendMgs(WRITE_OUTPUT),
            fetchImages,
            saveImage(imageDir),
            sendMgs(CLEAN_QUEUE)
        ];

        chainPromises(pipes, id).catch(err => console.error(err));
    });
}

if (cluster.isMaster) {
    const queue = [];

    if (inputFile) {
        const listenToOutputWrite = subscribeToData(writeOutput(outputFile));
        const listenToQueueManage = subscribeToData(cleanQueue(queue));

        console.time('time spent');

        prepareImageDir(imageDir)
            .then(prepareWorkers)
            .then(listenToOutputWrite)
            .then(listenToQueueManage)
            .then(readIds(inputFile, queue));
    } else {
        process.stderr.write('target file not selected\n');
        process.exit(1);
    }
}
