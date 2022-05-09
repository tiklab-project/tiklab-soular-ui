/**
 * @name: webpack.electron
 * @author: mahai
 * @date: 2021-10-13 14:10
 * @description：webpack.electron
 * @update: 2021-10-13 14:10
 */
const path = require('path')
const baseWebpackConfig = require("./webpack.electton.base");

const webpackMerge = require('webpack-merge')

const mainConfig = {
    entry: path.resolve(__dirname, './src/main/electron.js'),
    target: 'electron-main',
    output: {
        filename: 'electron.js',
        path:path.resolve(__dirname, './build/main'),
    },
    devtool: 'inline-source-map',
    mode: 'development'
}

module.exports = webpackMerge.merge(baseWebpackConfig, mainConfig)
