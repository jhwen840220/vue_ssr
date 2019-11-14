var webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
var webpackConfig = merge(base, {
  mode: 'production',
  // 將 entry 指向應用程序的 server entry 文件
  entry: {
    app: './src/entry-server.js'
  },
  // 這允許 webpack 以 Node 適用方式(Node-appropriate fashion)處理動態導入(dynamic import)，
  // 並且還會在編譯 Vue 組件時，
  // 告知 `vue-loader` 輸送面向服務器代碼(server-oriented code)。
  target: 'node',
  // 對 bundle renderer 提供 source map 支持
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2'  // 此處告知 server bundle 使用 Node 風格導出模塊(Node-style exports)
  },

  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // 外置化應用程序依賴模塊。可以使服務器構建速度更快，
  // 並生成較小的 bundle 文件。
  externals: nodeExternals({
    // 不要外置化 webpack 需要處理的依賴模塊。
    // 你可以在這裡添加更多的文件類型。例如，未處理 *.vue 原始文件，
    // 你還應該將修改 `global`（例如 polyfill）的依賴模塊列入白名單
    whitelist: /\.css$/
  }),
  // externals: Object.keys(require('../package.json').dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': 'production'
    }),

    // 這是將服務器的整個輸出
    // 構建為單個 JSON 文件的插件。
    // 默認文件名為 `vue-ssr-server-bundle.json`
    new VueSSRServerPlugin()
    /*
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })*/
  ]
})
module.exports = webpackConfig