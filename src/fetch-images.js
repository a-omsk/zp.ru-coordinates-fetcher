const fetch = require('node-fetch');

function generateUrl(centroid) {
    if (!centroid) {
        throw new Error('cendroid missed');
    }

    const center = centroid.replace(' ', ',');
    return `https://static-maps.yandex.ru/1.x/?l=map&pt=${center}&z=8`;
}

const prepareResult = data => response => Object.assign(data, {
    image: response.body
});

module.exports = function fetchImages(data) {
    return fetch(generateUrl(data.centroid))
        .then(prepareResult(data));
};
