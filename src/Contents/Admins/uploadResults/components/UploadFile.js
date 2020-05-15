import React, { Component } from 'react'
import DragDropFile from './DragDropFile'
import DataRendering from './DataRendering'

// import XLSX from 'xlsx'

class UploadFile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      headers: [],
      body: []
    }
    this.updateTable = this.updateTable.bind(this)
  }
  updateTable (headers, body) {
    this.setState({headers, body})
  }
  // esta funcion se va a borrar
  render () {
    const {headers, body} = this.state
    return (
      <div className='content-upload'>
        <DragDropFile updateTable={this.updateTable} />
        <DataRendering headers={headers} body={body} />
      </div>
    )
  }
}

export default UploadFile
