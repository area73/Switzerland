const webpack = require('webpack');
const Uglify = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        'core.js': './src/switzerland.js',
        './example/js/welcome-card/build.js': './example/js/welcome-card/index.js'
    },
    output: {
        filename: '[name]',
        libraryTarget: 'var'
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new Uglify({
            uglifyOptions: {
                ecma: 8
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/i
            }
        ]
    }
};