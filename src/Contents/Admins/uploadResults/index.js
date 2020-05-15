import React, { Component } from 'react'
import UploadField from './components/UploadFile'
class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  // esta funcion se va a borrar
  render () {
    return (
      <div className='content-upload'>
        <UploadField />
      </div>
    )
  }
}

export default Index
