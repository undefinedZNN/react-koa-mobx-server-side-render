import React from 'react'

export default class NotFoundPageContainer extends React.Component {
  render() {
    console.log('4000000000000000004', this.props.match)
    return (
      <h1 code={404}>
        :( 404 <br/>
        当前URL:{this.props.match.url}
      </h1>
    )
  }
}
