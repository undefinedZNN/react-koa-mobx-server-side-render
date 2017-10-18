import React from 'react'
import MD5 from 'crypto-js/md5'
import './style.less'
// 
export default class Md5Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      plaintext: '',
      ciphertext: 'd41d8cd98f00b204e9800998ecf8427e',
      ciphertextCapital: 'D41D8CD98F00B204E9800998ECF8427E',
      ciphertext16: '8f00b204e9800998',
      ciphertextCapital16: '8F00B204E9800998'
    }
  }

  plaintextChange = (event) => {
    let state = {...this.state}
    state.plaintext = event.target.value
    state.ciphertext = MD5(state.plaintext).toString()
    state.ciphertextCapital = state.ciphertext.toUpperCase()
    state.ciphertext16 = state.ciphertext.substr(8, 16)
    state.ciphertextCapital16 = state.ciphertextCapital.substr(8, 16)
    this.setState(state)
  }

  render() {
    return (
      <div className='container-md5'>
        <div className='md5-wrap'>
          <h3>MD5 加密</h3>
          <div className='md5-input-wrap'>
            <input type='text' onChange={this.plaintextChange} />
            <button>加密</button>
          </div>
          <div className='md5-result'>
            <p>16位 小写: {this.state.ciphertext16}</p>
            <p>16位 大写: {this.state.ciphertextCapital16}</p>
            <p>32位 小写: {this.state.ciphertext}</p>
            <p>32位 大写: {this.state.ciphertextCapital}</p>
          </div>
        </div>
      </div>
    )
  }
}
