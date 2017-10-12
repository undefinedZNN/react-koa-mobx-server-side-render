import React from 'react'
import { Home, Counter } from '../containers/index.js'
import { Route, Switch, Link } from 'react-router-dom'
class LinkHead extends React.Component {
  render() {
    return (
      <div className='link'>
        <div className='link-menu'></div>
        <Link to="/"><h3>Home</h3></Link>
        <Link to="/count" ><h3>Ccounter</h3></Link>
        <hr/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/count" component={Counter}/>
        </Switch>
        {this.props.children}
      </div>
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
