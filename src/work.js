const co = require('co');

const fetchGeo = require('./fetch-geo');
const fetchCoordinates = require('./fetch-coordinates');
const fetchImage = require('./fetch-images');

const writeOutput = require('./write-output');
const saveImage = require('./save-image');

const { WRITE_OUTPUT, CLEAN_QUEUE } = require('./constants');

const imageDir = process.argv[4] || 'img';

module.exports = co.wrap(function* (id) {
    try {
        const geo = yield fetchGeo(id);
        const coordinates = yield fetchCoordinates(geo);

        const image = yield fetchImage(coordinates.centroid);

        process.send({ type: WRITE_OUTPUT, result: {
            id: geo.id,
            name: geo.name,
            boundingBox: coordinates.boundingBox
        }});

        yield saveImage(imageDir, geo.name, image)

    } catch(e) {
        console.log(e);
    } finally {
        return process.send({ type: CLEAN_QUEUE, result: { id }});
    }        
})