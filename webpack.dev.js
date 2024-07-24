const path = require('path');
const {merge} =require("webpack-merge")
const baseWebpackConfig = require("./webpack.base");

module.exports = merge(baseWebpackConfig,{
    // 指定构建环境
    mode:"development",
    devtool: 'cheap-module-eval-source-map',
    plugins:[
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        // contentBase: path.join(__dirname, 'plugin'),
        hot:true,
        compress:true,
        port:3010,
        host: '0.0.0.0',
        historyApiFallback: true,
        disableHostCheck: true,
    }
});
