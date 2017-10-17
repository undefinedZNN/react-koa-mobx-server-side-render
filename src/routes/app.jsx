import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  Counter,
  RouterDemo,
  NotFoundPage
} from 'Containers'

import { RedirectWithStatus } from 'Components'

export default class AppRoute extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/app/count" component={Counter}/>
        <Route path="/app/routerDemo" component={RouterDemo}/>
        {/** 路由组中想定义404页面请末尾加上18,19行代码 **/}
        <Route path='/404' component={NotFoundPage}/>
        <RedirectWithStatus status={404} from="*" to="/404" />
      </Switch>
    )
  }
}
