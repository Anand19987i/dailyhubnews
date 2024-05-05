import spinner from './spinner.gif'
import React, { Component } from 'react'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={spinner} alt="loading" />
      </div>
    )
  }
}
