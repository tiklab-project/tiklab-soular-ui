

const webpack = require("webpack");
const { merge } = require('webpack-merge');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const baseWebpackConfig = require('./webpack.base');
const customEnv = process.env.CUSTOM_ENV;
const {webpackGlobal} = require('./environment/environment-' + customEnv)

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    entry: [
        path.resolve(__dirname, './src/index.js')
    ],
    plugins: [
        new optimizeCss({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                safe: true,
                discardComments: {
                    removeAll: true
                }
            }
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            title:'门户中心',
            template: path.resolve(__dirname, './public/index.template.html'),
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
            filename: 'css/[name].[contenthash:8].css',
            ignoreOrder: true
        }),
        new CssMinimizerPlugin(),
        new ProgressBarPlugin(),
        new BundleAnalyzerPlugin()
    ],
    optimization: {
        minimize: true,
        nodeEnv: process.env.NODE_ENV,
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests:5,
            automaticNameDelimiter: '--', // 分包打包生成文件的名称的连接符
            name:true,
            cacheGroups: { //  cacheGroups 缓存组，如：将某个特定的库打包
                antdUI: {
                    name: 'chunk-antdUI',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]antd[\\/]/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                antIcon: {
                    name: 'chunk-antIcon',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]@ant-design[\\/]/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                doublekitUserUI: {
                    name: 'chunk-doublekit-User-ui',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]doublekit-user-ui[\\/]/,
                    priority: 30,
                    reuseExistingChunk: true
                },

                doublekitPluginUI: {
                    name: 'chunk-doublekit-Plugin-ui',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]doublekit-plugin-ui[\\/]/,
                    priority: 30,
                    reuseExistingChunk: true
                },
                doublekitEamUI: {
                    name: 'chunk-doublekit-eam-ui',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]doublekit-eam-ui[\\/]/,
                    priority: 30,
                    reuseExistingChunk: true
                },
                doublekitCoreUI: {
                    name: 'chunk-doublekit-core-ui',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]doublekit-core-ui[\\/]/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                doublekitMessageUI: {
                    name: 'chunk-doublekit-Message-ui',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]doublekit-message-ui[\\/]/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                mobx: {
                    name: 'chunk-mobx',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]mobx[\\/]/,
                    priority: 0,
                    reuseExistingChunk: true
                },
                /* 提取共用部分，一下提取的部分会议commons 命名 */
                commons: {
                    name: 'commons',
                    test: function (module, chunks) {
                        if (
                            /src\/components\//.test(module.context) ||
                            /src\/util\//.test(module.context) ||
                            /react/.test(module.context) ||
                            /react-dom/.test(module.context) ||
                            /redux/.test(module.context)
                        ) {
                            return true
                        }
                    },
                    chunks: 'all',
                    minChunks: 2, //  提取公共部分最少的文件数
                    // minportal: 0 // 提取公共部分最小的大小
                    // enforce: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        minimizer: [
            new TerserPlugin({  // 压缩js
                cache: true,
                parallel: true,
                terserOptions: {
                    compress: {
                        drop_console: false,
                        drop_debugger: false // 去除console.log 和debuger
                    },
                }
            })
        ]
    }
});
