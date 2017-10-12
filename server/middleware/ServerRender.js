'use strict'

const path = require('path')
const views = require('koa-views')
const requireFromString = require('require-from-string')
const wdm = require('./webpack/dev.js')
const whm = require('./webpack/hot.js')
let cache

module.exports = run

/**
 * 查找compiler
 */
function findCompiler (compilers, name) {
  return compilers.compilers.find(compiler => compiler.name === name)
}

/**
 * 读取webpack输出结果 
 * @param {*} compiler
 */
function handleChanges (compiler) {
  const middlewares = {}
  const outputFileSystem = compiler.outputFileSystem
  const outputPath = compiler.outputPath
  const filename = compiler.options.output.filename
  const file = `${outputPath}/${filename}`
  const buffer = outputFileSystem.readFileSync(file)

  cache = requireFromString(buffer.toString())
  return async function() { await cache(...arguments) }
}

/**
 * 监听服务端渲染服务
 * @param  {[type]} compilers [description]
 * @return {[type]}           [description]
 */
function listen (compilers) {
  return new Promise((resolve, reject) => {
    compilers.plugin('done' , () => {
      const render = handleChanges(findCompiler(compilers, 'server'))
      resolve(render)
    })
    compilers.plugin('failed', (err) => {
      reject(err)
    })
  })
}

/**
 * 启动服务
 * @param  {Object} app       Koa项目实例
 * @param  {Object} compilers webpack编译器
 */
function run(app, compilers) {
  const clientCompiler = findCompiler(compilers, 'client')
  // 注入webpack dev中间件
  app.use(wdm(
    compilers,
    {
      noInfo: false,
      quiet: true,
      serverSideRender: true,
      publicPath: clientCompiler.options.output.publicPath
    }
  ))
  // 注入webpack hot中间件
  app.use(whm(clientCompiler, {}))

  return new Promise((resolve, reject) => {
    listen(compilers)
    .then((render) => {
      // 读取内存中的入口文件摸版
      const entryEJSTp = clientCompiler.outputFileSystem.readFileSync(
        clientCompiler.context + '/dist/template/index.html'
      )
      // 写入开发环境摸版
      require('fs').writeFile(path.resolve(__dirname, '../template/index.html'), entryEJSTp)
      // 设置项目摸版路径
      app.use(views(path.resolve(__dirname, '../template'), {map: {html: 'ejs'}}))

      resolve(render)
    })
    .catch((err) => {
      reject(err)
    })
  })
}



