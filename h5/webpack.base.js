const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//压缩css

const DIST_PATH = path.resolve(__dirname, 'dist');
// const CheckVersion = require('check-package-version')



const customEnv = process.env.CUSTOM_ENV;
const {webpackGlobal} = require('../environment/environment-' + customEnv)


const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;


module.exports = {
    output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[hash:8].js',
        path: DIST_PATH,
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },

    },
    target: "web",
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [{
                    // loader: "happypack/loader?id=portal"
                    loader: 'babel-loader'
                }],
                exclude: /node_modules/
            },
            {
                oneOf: [
                    {
                        test: cssRegex,
                        exclude: cssModuleRegex,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                },
                            },
                            {
                                loader: 'postcss-loader',
                            }
                        ],
                        sideEffects: true,
                    },
                    {
                        test: cssModuleRegex,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    modules: {
                                        localIdentName: '[local]--[hash:base64:5]',
                                    },
                                },
                            },
                            {
                                loader: 'postcss-loader',
                            }
                        ],
                    },

                    {
                        test: sassRegex,
                        exclude: sassModuleRegex,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 3,
                                },
                            },
                            {
                                loader: 'postcss-loader',
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true,
                                },
                            }
                        ]
                    },
                    {
                        test: sassModuleRegex,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 3,
                                    modules: {
                                        localIdentName: '[local]--[hash:base64:5]',
                                    },
                                },
                            },
                            {
                                loader: 'postcss-loader',
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true,
                                },
                            }
                        ],
                    },

                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)/,
                // exclude: /node_modules/,
                use: {
                    loader: 'url-loader',
                    options: {
                        // publicPath: 'images',
                        outputPath: 'images/',
                        name: '[name].[ext]', // 图片输出的路径
                        limit: 8*1024,
                    }
                }
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].min.[ext]',
                            limit: 5000, // fonts file portal <= 5KB, use 'base64'; else, output svg file
                            outputPath: 'fonts/',
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({ENV:JSON.stringify(customEnv), ...webpackGlobal}),

        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            ignoreOrder: true
        }),
        new CssMinimizerPlugin(),
    ]
};
