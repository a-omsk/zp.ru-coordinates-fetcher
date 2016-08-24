const { createWriteStream } = require('fs');
const { WRITE_OUTPUT } = require('./constants');

const writeOutput = path => {
    const outputStream = createWriteStream(path);

    return message => {
        if (message.type === WRITE_OUTPUT) {
            const { id, name, boundingBox } = message.result;
            outputStream.write(`${id} -> ${name} -> ${boundingBox.join(', ')}\n`);
        }
    };
};

module.exports = writeOutput;
