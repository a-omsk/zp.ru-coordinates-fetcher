const { createWriteStream } = require('fs');

const saveImage = path => result => new Promise(resolve => {
    const stream = createWriteStream(`${path}/${result.name}.png`);

    result.image.pipe(stream);
    result.image.on('end', () => resolve(result));
});

module.exports = saveImage;
