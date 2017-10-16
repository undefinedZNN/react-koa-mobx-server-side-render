import React from 'react'

export default class RouterDemoContainer extends React.Component {

  render() {
    return (
      <div>
        当前路由: {this.props.match.path}
      </div>
    )
  }
}
