

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
            title:'true',
            template: path.resolve(__dirname, './public/index.template.html'),
            favicon: path.resolve(__dirname, './public/easIcon.png'),
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
        new BundleAnalyzerPlugin(),
        new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/,
            /zh-cn|es/,
        ),
    ],
    optimization: {
        minimize: true,
        nodeEnv: process.env.NODE_ENV,
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 3,
            automaticNameDelimiter: '--', // 分包打包生成文件的名称的连接符
            name:true,
            cacheGroups: { //  cacheGroups 缓存组，如：将某个特定的库打包
                lodash: {
                    name: "chunk-lodash",
                    chunks:"all",
                    test: /[\\/]node_modules[\\/]lodash[\\/]/,
                    priority: 1,
                    reuseExistingChunk: true
                },
                thoughtwareSecurityUI: {
                    name: "chunk-thoughtware-security-ui",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]thoughtware-security-ui[\\/]/,
                    priority: 2,
                    reuseExistingChunk: true
                },
                thoughtwareTodoTaskUI: {
                    name: "chunk-thoughtware-todotask-ui",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]thoughtware-todotask-ui[\\/]/,
                    priority: 2,
                    reuseExistingChunk: true
                },
                thoughtwareMessageUI: {
                    name: 'chunk-thoughtware-message-ui',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]thoughtware-message-ui[\\/]/,
                    priority: 2,
                    reuseExistingChunk: true
                },
                thoughtwarePrivilegeUI: {
                    name: 'chunk-thoughtware-privilege-ui',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]thoughtware-privilege-ui[\\/]/,
                    priority: 2,
                    reuseExistingChunk: true
                },
                thoughtwareUserUI: {
                    name: "chunk-thoughtware-user-ui",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]thoughtware-user-ui[\\/]/,
                    priority: 2,
                    reuseExistingChunk: true
                },
                moment: {
                    name: "chunk-moment",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]moment[\\/]/,
                    priority: 2,
                    reuseExistingChunk: true
                },
                // thoughtwareLicenceUI: {
                //     name: "chunk-thoughtware-licence-ui",
                //     chunks: "all",
                //     test: /[\\/]node_modules[\\/]thoughtware-licence-ui[\\/]/,
                //     priority: 2,
                //     reuseExistingChunk: true
                // },
                zrender:{
                    name: "chunk-zrender",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]zrender[\\/]/,
                    priority: 3,
                    reuseExistingChunk: true
                },
                antIcon: {
                    name: 'chunk-antIcon',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]@ant-design[\\/]/,
                    priority: 3,
                    reuseExistingChunk: true
                },
                rcomponent: {
                    name: "chunk-rcomponent",
                    chunks: "all",
                    test: /(rc-[a-zA-Z])/,
                    priority: 3,
                    reuseExistingChunk: true
                },
                antdUI: {
                    name: 'chunk-antdUI',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]antd[\\/]/,
                    priority: 3,
                    reuseExistingChunk: true
                },
                /* 提取共用部分，一下提取的部分会议commons 命名 */
                commons: {
                    name: "commons",
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
                    chunks: "all",
                    minChunks: 2, //  提取公共部分最少的文件数
                    // minportal: 0 // 提取公共部分最小的大小
                    // enforce: true
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
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
