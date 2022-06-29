const merge = require('webpack-merge')
const cssnano = require('cssnano')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const baseConfig = require('./webpack.base')

const prodConfig = {
    mode: 'production',
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

module.exports = merge(baseConfig, prodConfig)
