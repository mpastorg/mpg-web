var webpack = require('webpack');

new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' })

module.exports = {
  externals: {
    './config': 'config'
  }
};