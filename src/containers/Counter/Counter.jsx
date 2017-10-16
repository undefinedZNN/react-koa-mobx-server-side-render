import React from 'react'
import { observer, inject } from 'mobx-react'
import './style.less'

@inject(stores => ({
  count: stores.count.count,
  increment: stores.count.increment,
  decrement: stores.count.decrement,
  setVal: (val) => stores.count.setValue(val)
}))

@observer
export default class CounterContainer extends React.Component {
  render() {
    return (
      <div className='container-counter'>
        <div className='counter-wrap'>
          <div className='count-result'>
            <h1> {this.props.count} </h1>
          </div>
          <div className='count-option'>
            <button className='big' onClick={()=>{
              this.props.increment()
            }}>
              +
            </button>
            <div className='count-option-standby'>
              <button onClick={()=>{
                this.props.decrement()
              }}>
              -
              </button>
              <button onClick={()=>{
                this.props.setVal(0)
              }}>
              Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
