import React from 'react'
import { Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Home } from '../containers/index.js'

/** 引入路由文件 strat**/
import demoRoute from './demo'
/** 引入路由文件 end**/

const baseRoute = [
  {
    path: '/home',
    component: Home
  }
]

export const RoutesConfig = [...baseRoute, ...demoRoute]

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        { renderRoutes(RoutesConfig) }
      </Switch>
    )
  }
}

