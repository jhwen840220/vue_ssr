// webpack.config.js
const webpack = require('webpack');
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const TerserPlugin = require('terser-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const isProduction = process.env.NODE_ENV === 'production'
module.exports = merge(base, {
  entry: './src/entry-client.js',
  // mode: 'production',

  
  // 重要信息：這將 webpack 運行時分離到一個引導 chunk 中，
  // 以便可以在之後正確注入異步 chunk。
  // 這也為你的 應用程序/vendor 代碼提供了更好的緩存。
  // webpack 4 不支援 webpack.optimize.CommonsChunkPlugin，改用 optimization
  optimization: {
    minimizer: [new TerserPlugin()],
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
})

if (isProduction) {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    /*
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    */
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),

    // 此插件在輸出目錄中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin()
  ])
}
