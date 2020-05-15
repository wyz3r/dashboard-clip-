import React, { Component } from 'react'
import XLSX from 'xlsx'
import axios from 'axios'
// import axios from 'axios'
// import './DragDropFile.css'

class DragDropFile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      stateModal: false,
      active: false,
      loaderActive: false
    }
    this.onDrop = this.onDrop.bind(this)
    this.handlerFile = this.handlerFile.bind(this)
    this.cancelTable = this.cancelTable.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.sendDataPayload = this.sendDataPayload.bind(this)
  }

  parseExcelToTable (files) {
    const reader = new FileReader() // leyendo archivo
    const rABS = !!reader.readAsBinaryString // true or false (?)
    rABS ? reader.readAsBinaryString(files[0]) : reader.readAsArrayBuffer(files[0])
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result // excel como en etiquetas html
      const wb = XLSX.read(bstr, {type: rABS ? 'binary' : 'array'}) // objecto con información del libro
      /* Get first worksheet */
      const ws = wb.Sheets[wb.SheetNames[0]] // data por cada celda de la primer hoja del libro
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, {header: 1}) // array por filas
      /* Update state */
      if (data.length !== 0) {
        const filtro = data.filter((item, i) => i > 0)
        const newBody = filtro.map((element) => {
          let newrow = []
          for (let index = 0; index < data[0].length; index++) {
            newrow[index] = element[index] ? element[index] : ''
          }
          return newrow
        })
        console.log(filtro)
        this.setState({active: true, header: data[0], tbody: newBody})
        this.props.updateTable(data[0], newBody)
      }
    }
  }
  suppress (e) {
    e.stopPropagation()
    e.preventDefault()
  }
  handlerFile (FileList) {
    const files = FileList
    if (files.length) this.parseExcelToTable(files)
  }
  cancelTable () {
    this.props.updateTable([], [])
    this.setState({active: false})
  }
  onDrop (e) {
    e.stopPropagation()
    e.preventDefault()
    const files = e.dataTransfer.files
    this.parseExcelToTable(files)
  }

  handleSelect (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  sendDataPayload () {
    const {header, tbody, mes, year, loaderActive} = this.state
    this.setState({loaderActive: !loaderActive})
    axios.post('http://localhost:8081/saveinformantes', {mes, year, header, tbody})
      .then((res) => {
        this.setState({loaderActive: false})
      }).catch((error) => {
        console.log(error)
      })
  }
  render () {
    const {active, loaderActive} = this.state
    return (
      <div className='content-uploadFile' >
        <div className='interaction-container'>
          <div id='upload-file' onDrop={this.onDrop} onDragEnter={this.suppress} onDragOver={this.suppress}>
            Sube aquí tu archivo
          </div>
          <div className='input-file-container' >
            <input className='input-file' id='my-file' type='file' onChange={(e) => this.handlerFile(e.target.files)} />
            <label htmlFor='my-file' className='input-file-trigger'>Select a file...</label>
            <label className={'input-file-trigger-cancel ' + (active ? 'active' : '')} onClick={e => this.cancelTable()}>Cancel</label>
            <label className={'input-file-trigger-save ' + (active ? 'active' : '')} onClick={() => { this.sendDataPayload() }}>Guardar</label>
          </div>
        </div>
        <div className='dates-containners'>
          {loaderActive ? <img alt='missing' src='https://s3.amazonaws.com/clipdashboard/loading.gif' width='42' height='42' />
            : ''
          }
        </div>
      </div>
    )
  }
}

export default DragDropFile
