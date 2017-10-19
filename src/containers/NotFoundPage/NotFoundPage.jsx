import React from 'react'
import { SetStaticContext } from 'Components'

export default class NotFoundPageContainer extends React.Component {
  render() {
    return (
      <SetStaticContext code={404}>
        <h1>
          :( 404 <br/>
          当前URL:{this.props.match.url}
        </h1>
      </SetStaticContext>
    )
  }
}
