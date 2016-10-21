const fetch = require('node-fetch');

function generateUrl(centroid) {
    if (!centroid) {
        throw new Error('cendroid missed');
    }

    const center = centroid.replace(' ', ',');
    return `https://static-maps.yandex.ru/1.x/?l=map&pt=${center}&z=8`;
}

module.exports = function fetchImages(centroid) {
    return fetch(generateUrl(centroid)).then(response => response.body);
};
