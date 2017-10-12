import React from 'react'
import { observer, inject } from 'mobx-react'

@inject(stores => ({
  count: stores.count.count,
  increment: stores.count.increment,
  decrement: stores.count.decrement,
  setVal: (val) => stores.count.setValue(val)
}))

@observer
export default class Counter extends React.Component {
  render() {
    return (
      <div className='container-counter'>
        <h1> {this.props.count} </h1>
        <button onClick={()=>{
          this.props.increment()
        }}>
          increment
        </button>
        <button onClick={()=>{
          this.props.decrement()
        }}>
        decrement
        </button>
        <button onClick={()=>{
          this.props.setVal(0)
        }}>
        Reset
        </button>
      </div>
    )
  }
}
