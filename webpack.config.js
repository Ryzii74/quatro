module.exports = {
    entry: './client/javascript/app.js',
    output: {
        path: './client/build',
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',

                loader: 'eslint-loader',
                options: {
                    emitWarning: true
                }
            }
        ]
    }
};