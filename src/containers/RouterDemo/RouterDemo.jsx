import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import './style.less'

const BaseRouteDemo = () => {
  return <h1>基础路由</h1>
}

const SubRouteDemo = () => {
  return <h1>子路由</h1>
}

class BandParam extends React.Component {
  render() {
    return (
      <div>
        <h1>带参路由</h1>
        <p>路由参数: {this.props.match.params.value}</p>
      </div>
    )
  }
}

export default class RouterDemoContainer extends React.Component {
  render() {
    return (
      <div className='router-demo-container'>
        <h3> React route 4.x 简单实例 </h3>
        <p>
          <a href='https://reacttraining.com/react-router/web/guides/philosophy'>官方文档</a>
        </p>

        <h3>路由链接</h3>
        <div className='router-links'>
          <Link to='/app/routerDemo'>无参数路由</Link>
          <Link to='/app/routerDemo/sub'>子路由</Link>
          <Link to='/app/routerDemo/123'>带参数路由</Link>
        </div>

        <div className='router-wrap'>
          <Switch>
            <Route exact path='/app/routerDemo' component={BaseRouteDemo}/>
            <Route exact path='/app/routerDemo/sub' component={SubRouteDemo}/>
            <Route exact path='/app/routerDemo/:value' component={BandParam}/>
          </Switch>
        </div>

        <p>当前路由: {this.props.location.pathname}</p>
      </div>
    )
  }
}
