

const path = require('path');
const {merge} =require("webpack-merge")
const baseWebpackConfig = require("./webpack.electton.base");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const customEnv = process.env.CUSTOM_ENV;
const {webpackGlobal} = require('./environment/environment-' + customEnv)

module.exports = merge(baseWebpackConfig,{
    // 指定构建环境
    mode:"development",
    target: 'electron-renderer',
    entry: [
        path.resolve(__dirname, './src/index.js')
    ],
    output:{
        path: path.resolve(__dirname, './build'),
        filename: 'assets/js/[name].[hash].js',
        chunkFilename:'[name][chunkhash].js',
        publicPath: '/',
    },
    devtool: 'cheap-module-eval-source-map',
    // 插件
    plugins:[
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            title:'组织中心',
            template: path.resolve(__dirname, '../public/index.template.html'),
            hash: false,
            filename: 'index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        }),
        new webpack.DefinePlugin({ENV:JSON.stringify(customEnv), ...webpackGlobal}),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            ignoreOrder: true
        }),
        new CssMinimizerPlugin(),

    ],
    // 开发环境本地启动的服务配置
    devServer: {
        contentBase: path.join(__dirname, './build'),
        hot:true,
        compress:true,
        port:3001,
        host: 'localhost',
        historyApiFallback: true,
        disableHostCheck: true,
    }
});
