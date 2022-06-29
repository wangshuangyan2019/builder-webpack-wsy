const merge = require('webpack-merge')
const path = require('path')
const cssnano = require('cssnano')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const baseConfig = require('./webpack.base')

const ssrConfig = {
    mode: 'production',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]-server.js',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'ignore-loader',
            },
            {
                test: /\.less$/,
                use: 'ignore-loader',
            },
        ],
    },
    plugins: [
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano,
        }),
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'rect',
                    entry: 'https://unpkg.com/react@17/umd/react.production.min.js',
                    global: 'React',
                },
                {
                    module: 'rect-dom',
                    entry: 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
                    global: 'ReacDom',
                },
            ],
        }),
    ],
    optimization: {
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                commons: {
                    name: 'vendors',
                    chunks: 'all',
                    minChunks: 2,
                },
            },
        },
    },
}

module.exports = merge(baseConfig, ssrConfig)
