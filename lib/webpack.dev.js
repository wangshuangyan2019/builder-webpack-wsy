const merge = require('webpack-merge')
const { HotModuleReplacementPlugin } = require('webpack')
const baseConfig = require('./webpack.base')

const devConfig = {
    mode: 'development',
    plugins: [
        new HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: './dist',
        hot: true,
        stats: 'errors-only',
    },
    devtool: 'source-map',
}

module.exports = merge(baseConfig, devConfig)
