const fetch = require('node-fetch');
const get = require('lodash/get');

function generateUrl(id) {
    if (!id) {
        throw new Error('geo id missed');
    }

    return `http://api.zp.ru/v1/geo/${id}?fields=name,parent.id,parent.name`;
}

const prepareResult = id => result => ({
    id,
    name: get(result, 'geo[0].name')
});

module.exports = function fetchGeo(id) {
    return fetch(generateUrl(id))
        .then(data => data.json())
        .then(prepareResult(id));
};
