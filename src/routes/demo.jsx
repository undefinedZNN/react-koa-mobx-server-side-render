import React from 'react'
import { Home, Counter } from '../containers/index.js'
import { Route, Switch } from 'react-router-dom'
class LinkHead extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/count" component={Counter}/>
      </Switch>
    )
  }
}

export default [
  {
    path: '/',
    component: LinkHead,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/count',
        exact: true,
        component: Counter
      }
    ]
  }
]
