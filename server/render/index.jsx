import React from 'react'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { renderToString } from 'react-dom/server'
import Routes from '../../src/routes/index.jsx'
import { createServerState as stores } from '../../src/stores/index.js'
import serialize from 'serialize-javascript'

/**  react 服务端渲染路由绑定 end **/
export default async (ctx, next) => {
  const routerContext = {}
  // 渲染页面
  let html = renderToString(
    <Provider {...stores}>    
      <StaticRouter location={ctx.url} context={routerContext}>
        <Routes />
      </StaticRouter>
    </Provider>
  )
  // 判断状态
  if(typeof routerContext.status !== 'undefined') {
    if (routerContext.status == 404) {
      console.log(`当前路径[${ctx.url}]不存在页面`)
      // await ctx.render(
      //   'index',
      //   { root: '<h1>404</h1>', stores: '{}' }
      // )
    }
  }
  await ctx.render(
    'index',
    { root: html, stores: serialize(stores) }
  )
  return next()
}
