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
      document.title = seoInfo.title
    }
    return children
  }}/>
)
