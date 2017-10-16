import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  Counter,
  RouterDemo,
  NotFoundPage
} from 'Containers'
export default class AppRoute extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/app/count" component={Counter}/>
        <Route exact path="/app/routerDemo" component={RouterDemo}/>
        <Route path='*' component={NotFoundPage}/>
      </Switch>
    )
  }
}

// export default [
//   {
//     path: '/',
//     component: LinkHead,
//     routes: [
//       {
//         path: '/',
//         exact: true,
//         component: Home
//       },
//       {
//         path: '/count',
//         exact: true,
//         component: Counter
//       },
//       {
//         path: '/routerDemo',
//         exact: true,
//         component: RouterDemo
//       }
//     ]
//   }
// ]
