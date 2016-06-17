var webpack = require('webpack')
//var env = process.env.NODE_ENV;
//console.log(process.env);
module.exports = {
  entry: {
    app: './entry.js',
    vendor:["jquery"]
  },
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by zhaoda'),
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
  ],
  resolve:{
    extensions:['','.js','.json']
  },
  devServer: {
    hot: true,
    inline: true,
    //其实很简单的，只要配置这个参数就可以了
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  }
}