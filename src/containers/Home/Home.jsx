import React from 'react'
import './style.less'
import { Link } from 'react-router-dom'

export default class Home extends React.Component {
  render() {
    // const smile = require('Assets/img/smile.png')
    return (
      <div className='container-home'>

        <ul className='app-wrap'>
          <li>
            <Link to="/app/count" >
              <div className='app-icon'>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-xitongjishuqi"></use>
                </svg>
              </div>
              <p className='app-name'>
                计数器
              </p>
            </Link>
          </li>
          <li>
            <Link to="/app/routerDemo" >
              <div className='app-icon'>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-xitongjishuqi"></use>
                </svg>
              </div>
              <p className='app-name'>
                路由demo
              </p>
            </Link>
          </li>
          <li>
            <div className='app-icon'>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-todo"></use>
              </svg>
            </div>
            <p className='app-name'>
              todo
            </p>
          </li>
        </ul>
      </div>
    )
  }
}
