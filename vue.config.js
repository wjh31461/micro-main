const path = require('path')
var webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  publicPath: '/',

  transpileDependencies: ['ant-design-vue'],

  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        'moment': 'moment'
      })
    ]
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('public', resolve('public'))
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
  },

  devServer: {
    open: true,
    inline: true,
  },
}
