const webpack = require("webpack");
const { merge } = require('webpack-merge');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const baseWebpackConfig = require('./webpack.base');

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
                tiklabSecurityUI: {
                    name: "chunk-tiklab-security-ui",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]tiklab-security-ui[\\/]/,
                    priority: 2,
                    reuseExistingChunk: true
                },
                tiklabTodoTaskUI: {
                    name: "chunk-tiklab-todotask-ui",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]tiklab-todotask-ui[\\/]/,
                    priority: 2,
                    reuseExistingChunk: true
                },
                tiklabMessageUI: {
                    name: 'chunk-tiklab-message-ui',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]tiklab-message-ui[\\/]/,
                    priority: 2,
                    reuseExistingChunk: true
                },
                tiklabPrivilegeUI: {
                    name: 'chunk-tiklab-privilege-ui',
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]tiklab-privilege-ui[\\/]/,
                    priority: 2,
                    reuseExistingChunk: true
                },
                tiklabUserUI: {
                    name: "chunk-tiklab-user-ui",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]tiklab-user-ui[\\/]/,
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
                // tiklabLicenceUI: {
                //     name: "chunk-tiklab-licence-ui",
                //     chunks: "all",
                //     test: /[\\/]node_modules[\\/]tiklab-licence-ui[\\/]/,
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
