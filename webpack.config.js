const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'production',
  // set this to your entry point
  entry: {
    App: './app/assets/scripts/App.js'
    // Vendor: './app/assets/scripts/Vendor.js'
  },

  // change this to your output path
  output: {
    path: path.resolve(__dirname, './app/temp/scripts'),
    filename: '[name].js',
    publicPath: '/assets/'
  },

  // create a map file for debugging
  //devtool: 'source-map',

  // configure the loaders
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules,|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },

  ///////////  uncomment this for production ////////////////
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false
  //     }
  //   }),
  //   new webpack.DefinePlugin({
  //     'process.env': {'NODE_ENV': JSON.stringify('production')}
  //   })
  // ],////////////////////////////////////////////////////////

  watch: false // change this to true to keep webpack running
};
