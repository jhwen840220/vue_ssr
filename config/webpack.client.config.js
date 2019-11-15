// webpack.config.js
const webpack = require('webpack');
const merge = require('webpack-merge')
const path = require('path')
const base = require('./webpack.base.config')
const TerserPlugin = require('terser-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const isProduction = process.env.NODE_ENV === 'production'

let config = merge(base, {
  entry: './src/entry-client.js',

  
  // 重要信息：這將 webpack 運行時分離到一個引導 chunk 中，
  // 以便可以在之後正確注入異步 chunk。
  // 這也為你的 應用程序/vendor 代碼提供了更好的緩存。
  // webpack 4 不支援 webpack.optimize.CommonsChunkPlugin，改用 optimization
  optimization: {
    minimizer: [new TerserPlugin({ sourceMap: true })],
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
  plugins:[
    // 此插件在輸出目錄中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin()
  ],
  resolve: {
    alias: {
      'vue': isProduction ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  performance: {
    hints: false
  },
})

if (!isProduction) {
  config = merge(config, {
    output: {
      filename: '[name].js',
      publicPath: 'http://localhost:9999/dist/',
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devtool: 'source-map',
    devServer: {
      writeToDisk: true,
      contentBase: path.resolve(__dirname, '../dist'),
      publicPath: 'http://localhost:9999/dist/',
      hot: true,
      inline: true,
      // historyApiFallback: true,
      port: 9999,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  })
}

module.exports = config