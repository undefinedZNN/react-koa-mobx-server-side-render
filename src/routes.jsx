import React from 'react'
import {BrowserRouter} from 'react-router-dom'
/** 引入路由文件 strat**/
import Routes from './routes/index.jsx'
/** 引入路由文件 end**/
// export default () => (
//   <BrowserRouter >
//     <Routes/>
//   </BrowserRouter>
// )
export default class Pilot extends React.Component {
  render() {
    return (
      <BrowserRouter >
        <Routes/>
      </BrowserRouter>
    )
  }
}
