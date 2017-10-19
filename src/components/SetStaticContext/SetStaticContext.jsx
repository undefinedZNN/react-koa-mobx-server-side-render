import React from 'react'
import { Route } from 'react-router-dom'
export default ({ code, children, seoInfo }) => (
  <Route render={({ staticContext }) => {
    seoInfo = { title: '', keywords: '', description: '', ...seoInfo }

    if (staticContext) {
      staticContext.status = code ? code : 200
      staticContext.seoInfo = seoInfo
    }

    if (typeof window !== 'undefined') {
      // 在浏览器环境下却换页面时修改文档title, 达到与服务器一样的渲染结果
      document.title = seoInfo.title
    }
    return children
  }}/>
)
