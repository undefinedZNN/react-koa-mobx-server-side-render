import React from 'react'
import Bodymovin from 'bodymovin'
import { SetStaticContext } from 'Components'
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
    // 渲染svg
    Bodymovin.loadAnimation(animationProperties)
  }
  render() {
    const seoInfo = {
      title: '(react 服务端渲染 bodymovin 示例) react server side render bodymovin demo',
      keywords: 'react server side render demo 服务端渲染示例 bodymovin',
      description: 'react server side render demo 服务端渲染示例 bodymovin'
    }
    return (
      <SetStaticContext code={200} seoInfo={seoInfo}>
        <div className='container-bodymovin'>
          <h3>Bodymovin demo</h3>
          <div className='cycle' ref='cycle'></div>
        </div>
      </SetStaticContext>
    )
  }
}
