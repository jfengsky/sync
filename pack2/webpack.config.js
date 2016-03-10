var path = require('path');
console.log(__dirname)
console.log(path)
console.log(path.resolve(__dirname, 'app/main.js'))
console.log('======')
module.exports = {
  entry: './app/main.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'index.js',
    publicPath: "./build/"
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }],
  },
  resolve:{
      extensions:['','.js','.json']
  }
};