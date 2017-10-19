import React from 'react'
import Bodymovin from 'bodymovin'
import './style.less'
export default class BodymovinContainer extends React.Component {
  componentDidMount () {
    const animationData = require('Assets/bodymovin/react_logo.json')
    const animationProperties = {
      container: this.refs.cycle,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData
    }
    Bodymovin.loadAnimation(animationProperties)
  }
  render() {
    return (
      <div className='container-bodymovin'>
        <h3>Bodymovin demo</h3>
        <div className='cycle' ref='cycle'></div>
      </div>
    )
  }
}
