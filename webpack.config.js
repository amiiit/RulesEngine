var path = require('path');

module.exports = {
    entry: './src/index.js',
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'rulesengine-cli.js'
    },
    resolve: {
        root: path.resolve(__dirname),
        extensions: ['', '.js', '.jsx'],
        alias: {
            re: 'src',
            assets: 'assets'
        }
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel?presets[]=es2015'},
            {test: /\.json$/, exclude: /node_modules/, loader: 'json'}
        ]
    }

};