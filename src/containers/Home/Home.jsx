import React from 'react'
import './style.less'

export default class Home extends React.Component {
  render() {
    const smile = require('Assets/img/smile.png')
    return (
      <div className='container-home'>
        <h1> welcome to demo <span className='smile'>:)</span></h1>
        <img src={smile}/>
        <h1>===:) </h1>
        <input type='text' />
      </div>
    )
  }
}
