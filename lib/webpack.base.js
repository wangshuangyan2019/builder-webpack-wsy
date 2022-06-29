
const glob = require('glob')
const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const projectRoot = process.cwd()

const getFiles = () => {
    const filePaths = glob.sync(path.join(projectRoot, './src/*/index.js'))
    const entry = {}
    const htmlWebpackPlugins = []
    filePaths.forEach((filePath) => {
        const file = filePath.match(/src\/(.*)\/index\.js/)
        const pageName = file && file[1]
        entry[pageName] = filePath
        htmlWebpackPlugins.push(new HtmlWebpackPlugin({
            inlineSource: '.css$',
            template: path.join(projectRoot, `/src/${pageName}/index.html`),
            filename: `${pageName}.html`,
            chunks: ['vendors', pageName],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false,
            },
        }))
    })
    return { entry, htmlWebpackPlugins }
}

const { entry, htmlWebpackPlugins } = getFiles()

module.exports = {
    entry,
    output: {
        path: path.join(projectRoot, 'dist'),
        filename: '[name]_[chunkhash:8].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                autoprefixer({
                                    browsers: ['last 2 version', '>1%', 'ios 7'],
                                }),
                            ],
                        },
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            name: '[name]_[hash:8].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        ...htmlWebpackPlugins,
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
        // @ts-ignore
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        // 捕获build失败状态
        function errorsPlugin() {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
                    process.exit(1)
                }
            })
        },
    ],
    stats: 'errors-only',
}
