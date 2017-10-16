// import Router from 'koa-router'
import React from 'react'
import { StaticRouter, matchPath } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { matchRoutes, renderRoutes } from 'react-router-config'
import { renderToString } from 'react-dom/server'
import Routes from '../../src/routes/index.jsx'
import { createServerState as stores } from '../../src/stores/index.js'
import serialize from 'serialize-javascript'

/**
 * 对比react 路由配置判断 react 页面组件是否存在
 * @param  {String} path 路由地址
 * @return {[type]}      [description]
 */
// function match(path) {
//   return new Promise((resolve, reject) => {
//     const matchRes =  matchRoutes(Routes, path)
//     console.log('react 页面组件是否存在', matchRes)
//     if(matchRes.length < 1) {
//       return reject('Route not exist')
//     }
//     else {
//       resolve(path)
//     }
//   })
// }

function matchPathx(path) {
  Routes.map(route => {
    console.log('matchPathx-route', route)
  })
  // console.log('matchPathx==>', path)
  // console.log('matchPath===>', matchPath(path, rts))
  // console.log(match)
  // match(
  //   { rts, location: path },
  //   (error, redirectLocation, renderProps) => {
  //     if (error) {
  //       console.log('matchPathx', '500')
  //       // res.send(500, error.message)
  //     } else if (redirectLocation) {
  //       console.log('matchPathx', '302')
  //       // res.redirect(302, redirectLocation.pathname + redirectLocation.search)
  //     } else if (renderProps) {
  //       console.log('matchPathx', '200')
  //       // res.send(200, renderToString(<RoutingContext {...renderProps} />))
  //     } else {
  //       console.log('matchPathx', '404')
  //       // res.send(404, 'Not found')
  //     }
  //   }
  // )
}

/**  react 服务端渲染路由绑定 end **/
export default async (ctx, next) => {
  // matchPathx(ctx.url)
// export const render = async (ctx, next) => {
  // console.log('strat route ======>>>>>>>', ctx.url , '<<<<<======')
  // await match(ctx.url)
  // 路由正确渲染页面并输出
  // .then(async req => {
  const routerContext = {}
  let html = renderToString(
    <Provider {...stores}>    
      <StaticRouter location={ctx.url} context={routerContext}>
        <Routes />
      </StaticRouter>
    </Provider>
  )
  if (routerContext.status == 404) {
    await ctx.render(
      'index',
      { root: '<h1>404</h1>', stores: '{}' }
    )
  }
  else {  
    await ctx.render(
      'index',
      { root: html, stores: serialize(stores) }
    )
  }
  return next()
  // })
  // .catch(async error => {
  //   console.log(error, ctx.status)
  //   // ctx.status = 404
  //   await ctx.render(
  //     'index',
  //     { root: '<h1>404</h1>', stores: '{}' }
  //   )
  //   // await ctx.render('404')
  //   // return next()
  // })
}



// import React from 'react'
// import { StaticRouter } from 'react-router-dom'
// import { matchRoutes, renderRoutes  } from 'react-router-config'
// import { renderToString } from 'react-dom/server'
// import { RoutesConfig as Routes } from '../../src/routes/index.jsx'
// import { Provider } from 'mobx-react'
// import { createServerState as stores } from '../../src/stores/index.js'
// import serialize from 'serialize-javascript'

// /**
//  * 对比react 路由配置判断 react 页面组件是否存在
//  * @param  {String} path 路由地址
//  * @return {[type]}      [description]
//  */
// function match(path) {
//   return new Promise((resolve, reject) => {
//     const matchRes =  matchRoutes(Routes, path)
//     if(matchRes.length < 1) {
//       return reject('Route not exist')
//     }
//     else {
//       resolve(path)
//     }
//   })
// }
// /**  react 服务端渲染路由绑定 end **/
// export default async (ctx, next) => {
// // export const render = async (ctx, next) => {
//   console.log('strat route ======>>>>>>>', ctx.url , '<<<<<======')
//   await match(ctx.url)
//   // 路由正确渲染页面并输出
//   .then(async req => {
//     const context = {}
//     const html = renderToString(
//       <Provider {...stores}>    
//         <StaticRouter location={ctx.url} context={context}>
//           {renderRoutes(Routes)}
//         </StaticRouter>
//       </Provider>
//     )
//     await ctx.render(
//       'index',
//       { root: html, stores: serialize(stores) }
//     )
//   })
//   .catch(async error => {
//     console.log(error, ctx.status)
//     // ctx.status = 404
//     await ctx.render('404')
//     // return next()
//   })
// }
