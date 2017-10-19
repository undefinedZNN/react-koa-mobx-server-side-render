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
                  <use xlinkHref="#icon-router"></use>
                </svg>
              </div>
              <p className='app-name'>
                路由demo
              </p>
            </Link>
          </li>
          <li>
            <Link to="/app/md5" >
              <div className='app-icon'>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-jiami"></use>
                </svg>
              </div>
              <p className='app-name'>
                MD5
              </p>
            </Link>
          </li>
          <li>
            <Link to="/app/bodymovin" >
              <div className='app-icon'>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icon-donghuachahuasheji"></use>
                </svg>
              </div>
              <p className='app-name'>
                bodymovin
              </p>
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}
