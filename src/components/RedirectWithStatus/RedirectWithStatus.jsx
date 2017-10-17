import React from 'react'
import { Route, Redirect} from 'react-router-dom'

/**
 * 带页面状态的跳转(为了兼容服务端渲染能在context获取面状态)
 * @param  {String} options.from   匹配路由地址
 * @param  {String} options.to     跳转到路由地址
 * @param  {Number} options.status http状态码
 */
export default ({ from, to, status }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = status
    }
    return <Redirect from={from} to={to}/>
  }}/>
)
