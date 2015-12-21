var path = require('path');

module.exports = {
    entry: './src/*.spec.js',
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'rulesengine-cli.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel?presets[]=es2015'}
        ]
    }

};