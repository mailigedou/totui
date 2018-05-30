const path = require('path'); //引入path
//const uglify = require('uglifyjs-webpack-plugin');
var extractTextPlugin = require("extract-text-webpack-plugin");
module.exports = { //暴露出来
    entry: {
        tot: './src/entry.js',
    }, //  入口文件配置     
    output: {
        path: path.resolve(__dirname, 'dist'), //dist绝对路径
        filename: '[name].js' //打包后的出口和入口文件名一模一样
    }, //  出口文件配置 
    module: {
        loaders: [
            {
                test: /\.js|jsx$/, //是一个正则，代表js或者jsx后缀的文件要使用下面的loader
                loader: "babel-loader",
                query: {
                    presets: ["es2015", { "loose": true }]
                }
            }
        ],
        rules: [{
            test: /\.less$|\.css$/,
            use: extractTextPlugin.extract({
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }],
                fallback: 'style-loader'
            })
        }, {
            test: /\.(png|jsp|gif)/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 500000
                }
            }]
        }]
    },
    plugins: [
        //new uglify(),压缩
        new extractTextPlugin("tot.css"),
    ], //  插件,多个插件，所以是数组
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '10.4.3.38',
        compress: true,
        port: 9001
    } //  配置webpack服务
}