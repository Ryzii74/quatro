const Fs = require('fs');
const Path = require('path');

const Routes = [];

module.exports.init = callback => {
    const routerFolder = Path.join(__dirname, 'routes');
    Fs.readdir(routerFolder, (err, files) => {
        if (err) {
            callback(err);
            return;
        }

        files.forEach(file =>
            /* eslint-disable */
            Routes.push(require(`./routes/${file}`))
            /* eslint-enable */
        );

        callback();
    });
};

module.exports.initSocketMethods = socket => {
    Routes.forEach(route => route(socket));
};
