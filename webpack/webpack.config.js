const path = require('path');
const webpack = require('webpack');

const PATHS = {
    src: path.join(__dirname, '..', 'src'),
    js: path.join(__dirname, '..', 'src', 'js'),
    style: path.join(__dirname, '..', 'src', 'style'),
    build: path.join(__dirname, '..', 'dist')
};

const config = {
    entry: [PATHS.js + '/index.js'],
    externals: {
        cheerio: 'window',
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
            umd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
            umd: 'react-dom'
        }
    },
    output: {
        path: PATHS.build,
        filename: 'main.js',
        library: 'reactJsonView',
        libraryTarget: 'umd'
    },
    plugins: [new webpack.optimize.UglifyJsPlugin()],
    resolve: {
        extensions: ['.js', '.json', '.css', '.scss']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                include: [PATHS.js]
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: 'isomorphic-style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    }
};

module.exports = config;
