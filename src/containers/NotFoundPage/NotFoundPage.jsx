import React from 'react'
import { Route } from 'react-router-dom'

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = code
    }
    return children
  }}/>
)

export default class NotFoundPageContainer extends React.Component {
  render() {
    return (
      <Status code={404}>
        <h1>
          :( 404 <br/>
          当前URL:{this.props.match.url}
        </h1>
      </Status>
    )
  }
}
