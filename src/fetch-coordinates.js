const fetch = require('node-fetch');
const head = require('lodash/head');
const flow = require('lodash/flow');
const get = require('lodash/fp/get');
const values = require('lodash/values');

function generateUrl(name) {
    if (!name) {
        throw new Error('city name missed');
    }

    return `https://geocode-maps.yandex.ru/1.x/?geocode=${encodeURIComponent(name)}&format=json`;
}

const findProperty = property => flow(
    get(`response.GeoObjectCollection.featureMember[0].GeoObject.${property}`),
    values
);

const findBoundingBox = findProperty('boundedBy.Envelope');
const findCentroid = findProperty('Point');

module.exports = function fetchCoordinates(geo) {
    return fetch(generateUrl(geo.name))
        .then(data => data.json())
        .then(result => ({
            centroid: head(findCentroid(result)),
            boundingBox: findBoundingBox(result)
        }));
};
