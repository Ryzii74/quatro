const Fs = require('fs');
const Path = require('path');

const Routes = [];

module.exports.init = () => {
    const routerFolder = Path.join(__dirname, 'routes');
    Fs.readdirSync(routerFolder).forEach(file =>
        /* eslint-disable */
        Routes.push(require(`./routes/${file}`))
        /* eslint-enable */
    );
};

module.exports.initSocketMethods = socket => {
    Routes.forEach(route => route(socket));
};