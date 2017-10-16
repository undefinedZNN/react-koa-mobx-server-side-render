import React from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
// import { renderRoutes } from 'react-router-config'
import {
  Home,
  NotFoundPage
} from 'Containers'
/** 引入路由文件 strat**/
import AppRoute from './app'
/** 引入路由文件 end**/

// const baseRoute = [
//   {
//     path: '/home',
//     component: Home
//   }
// ]

// export const RoutesConfig = [...appRoute, ...baseRoute]
const RedirectWithStatus = ({ from, to, status }) => (
  <Route render={({ staticContext }) => {
    // there is no `staticContext` on the client, so
    // we need to guard against that here
    if (staticContext) {
      staticContext.status = status
    }
    console.log('staticContext', staticContext)
    return <Redirect from={from} to={to}/>
  }}/>
)

export default class Routes extends React.Component {
  render() {
    console.log(NotFoundPage)
    // <Route path='*' component={NotFoundPage}/>
    // <Redirect from='*' to='/404'/>
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

