const commonConfig = require('../config/common.js')
const port = commonConfig.devPort
const Koa = require('koa')
const logger = require('koa-logger')
const webpack = require('webpack')

const serverRender = require('./middleware/ServerRender.js')
const webpackConfig = require('../webpack/webpack.dev.config')
const compilers = webpack(webpackConfig)

/**
 * 查找compiler
 */
function findCompiler (compilers, name) {
  return compilers.compilers.find(compiler => compiler.name === name)
}

// 创建koa实例
const app = new Koa()
app.use(logger())

serverRender(app, compilers)
.then((render) => {
  app.use(render)
  app.listen(port, (err) => {
    console.log(`\n Open http://localhost:${port}/ in your web browser.\n`)
  })
})
.catch((err) => {
  console.log('listen error :', err)
})
