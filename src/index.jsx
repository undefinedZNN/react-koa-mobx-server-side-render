import React from 'react'
import ReactDOM from 'react-dom'
import Pilot from './routes.jsx'
import { Provider } from 'mobx-react'
import { createClientState as stores } from './stores/index.js'

const render = (Component) => {
  ReactDOM.render(
    <Provider { ...stores }>
      <Component/>
    </Provider>,
    document.getElementById('root')
  )
}

render(Pilot)

if (module.hot) {
  module.hot.accept(
    './routes.jsx',
    () => {
      const Routes = require('./routes.jsx')
      render(Routes)
    }
  )
}
