const { mkdir, statSync } = require('fs');

module.exports = function prepareImageDir(path) {
    return new Promise(resolve => {
        try {
            statSync(path);
        } catch (e) {
            if (e.code === 'ENOENT') {
                mkdir(path, resolve);
            }
        }
    });
};
