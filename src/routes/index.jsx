import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {
  Home,
  NotFoundPage
} from 'Containers'

import { RedirectWithStatus } from 'Components'
/** 引入路由组文件 strat**/
import AppRoute from './app'
/** 引入路由组文件 end**/

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path='/app' component={AppRoute}/>
        <Route path='/404' component={NotFoundPage}/>
        <RedirectWithStatus status={404} from="*" to="/404" />
      </Switch>
    )
  }
}

