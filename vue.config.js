
const path = require('path')

const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,

  // 搭建服务器
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    https: false,
    compress: true,
    overlay: {
      warnings: true,
      errors: true
    },

    before(app) {
      app.get('/api/seller', function(req, res) {
        res.json( {
          errno: 0,
          data: seller
        })
      })
      app.get('/api/goods', function(req, res) {
        res.json({
          errno: 0,
          data: goods
        })
      })
      app.get('/api/ratings', function(req,res) {
        res.json({
          errno: 0,
          data: ratings
        })
      })
    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('header', resolve('src/views/header'))
      .set('goods', resolve('src/views/goods'))
      .set('seller', resolve('src/views/seller'))
      .set('ratings', resolve('src/views/ratings'))
  }
}