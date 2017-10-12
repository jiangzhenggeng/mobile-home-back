
var path = require('path');
var webpack = require('webpack');
var common = require('./webpack.common');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var v = 'v1.0.0';

common.output.path = '/Users/jiangzg/PhpstormProjects/JIGUO/cdn/static@2.0/mb/'+v
common.output.publicPath = 'http://cdn.jiguo.com/static@2.0/mb/'+ v +'/';
common.module.loaders.forEach((item,index)=>{
    if( item.loader && item.loader.indexOf('publicPath=../&outputPath=images/')>-1 ){
      common.module.loaders[index].loader = [
        {
          loader: 'url-loader',
          options:{
            limit: 8192,
            name:'[hash:8].[name].[ext]',
            publicPath: common.output.publicPath ,
            outputPath:'images/',
          }
        }
      ];
    }
});


common.plugins = [
    ...common.plugins,

    // 配置环境变量到Production，防止控制台警告
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    }),
    //优化压缩
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        //这里的soucemap 不能少，可以在线上生成soucemap文件，便于调试
        // sourceMap: true,
        // mangle: true
    }),
    // new webpack.SourceMapDevToolPlugin({
    //     filename: '[name].js.map',
    //     exclude: ['vendor.js']
    // })
    new HtmlWebpackPlugin({
      template:'./src/pages/index/index.js',
      favicon: './src/style/images/favicon.ico',
      filename:'../jiguo/protected/modules/mb/views/index/index.php',
      minify: {
        //压缩HTML文件
        collapseWhitespace: true, //删除空白符与换行符
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
      }
    }),
];

module.exports = common;






