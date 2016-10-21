const { createWriteStream } = require('fs');

const saveImage = (path, name, image) => new Promise(resolve => {
    const stream = createWriteStream(`${path}/${name}.png`);

    image.pipe(stream);
    image.on('end', resolve);
});

module.exports = saveImage;
