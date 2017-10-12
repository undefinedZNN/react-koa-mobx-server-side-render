import Koa from 'koa'
import logger from 'koa-logger'
import router from './render/index.jsx'
import views from 'koa-views'
import { resolve } from 'path'
import serve from 'koa-static'
import conf from '../config/common.js'

const app = new Koa()
const port = conf.prot || 9001
// const prot = 9001
app.use(logger())
app.use(views(resolve(__dirname, '../template'), {map: {html: 'ejs'}}))
app.use(serve(resolve(__dirname, '../client')))
app.use(router)
app.listen(port, (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(`\n Open http://localhost:${port}/ in your web browser.\n`)
})