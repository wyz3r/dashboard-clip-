import React, { Component } from 'react'
import FieldText from './FieldText'
import FieldOptions from './FieldOptions'
import FieldSelect from './FieldSelect'
class AddPregunta extends Component {
  constructor (props) {
    super(props)
    this.state = {
      opciones: [''],
      repeatKey: false,
      clave: '',
      relevancia: '',
      tipo: '',
      titulo: ''
    }
    this.handlerChange = this.handlerChange.bind(this)
    this.handlerOptions = this.handlerOptions.bind(this)
    this.sendNewQuestion = this.sendNewQuestion.bind(this)
    this.addOption = this.addOption.bind(this)
    this.deleteOption = this.deleteOption.bind(this)
    this.sendEditQuestion = this.sendEditQuestion.bind(this)
    this.cancelQuestion = this.cancelQuestion.bind(this)
  }

  handlerOptions (event) {
    const {opciones} = this.state
    const {name, value} = event.target
    opciones[name] = value
    this.setState({opciones})
  }

  addOption (e) {
    const {opciones} = this.state
    if (e.charCode === 13 || e === 13) {
      opciones[parseInt(opciones.length, 10)] = ''
      this.setState({opciones})
    }
  }

  vlidateKey (keyQuestion) {
    const clavesMuchas = this.props.dataPreguntas.map(element => {
      return element.clave
    })
    return (clavesMuchas.indexOf(keyQuestion) !== -1)
  }

  handlerChange (event) {
    const {name, value} = event.target
    this.setState({[name]: value})
    if (name === 'tipo' && value === 'Abierta') {
      this.setState({opciones: []})
    } else if (name === 'tipo' && value !== 'Abierta') {
      this.setState({opciones: ['']})
    }
    if (name === 'clave') this.setState({repeatKey: this.vlidateKey(value.toUpperCase())})
  }

  sendNewQuestion () {
    const {clave, relevancia, tipo, titulo, opciones} = this.state
    const payload = {
      clave,
      titulo,
      opciones,
      tipo,
      relevancia
    }
    this.props.addTableQuestion(payload)
    this.props.closeModal()
  }

  deleteOption (key) {
    const {opciones} = this.state
    if (opciones.length !== 1) {
      opciones.splice(key, 1)
      this.setState({opciones})
    }
  }

  cancelQuestion () {
    this.setState({
      opciones: [''],
      repeatKey: false,
      clave: '',
      relevancia: '',
      tipo: '',
      titulo: ''
    })
    this.props.editQuestion('')
  }

  sendEditQuestion () {
    const {clave, relevancia, tipo, titulo, opciones} = this.state
    const payload = {
      clave,
      titulo,
      opciones,
      tipo,
      relevancia
    }
    this.props.updateQuestion(payload)
    this.props.closeModal()
  }
  componentWillMount () {
    const {editStatus, dataPreguntas} = this.props
    if (editStatus !== '') {
      const {clave, titulo, opciones, tipo, relevancia} = dataPreguntas[editStatus]
      this.setState({
        clave,
        titulo,
        opciones,
        tipo,
        relevancia
      })
    } else {
      this.setState({
        opciones: [''],
        repeatKey: false,
        clave: '',
        relevancia: '',
        tipo: '',
        titulo: ''
      })
    }
  }

  render () {
    const {opciones, tipo, repeatKey, clave, relevancia, titulo} = this.state
    return (
      <div className='content-addpregunta'>
        <label> Preguntas </label>
        <FieldText
          label='clave'
          handlerChange={this.handlerChange}
          repeatKey={repeatKey}
          valor={clave}
        />
        <FieldText
          label='titulo'
          handlerChange={this.handlerChange}
          valor={titulo}
        />
        <FieldSelect
          label='tipo'
          options={['Abierta', 'Multiple', 'Unica']}
          handlerChange={this.handlerChange}
          valor={tipo}
        />
        <FieldOptions
          label='opciones'
          options={opciones}
          handlerOptions={this.handlerOptions}
          addOption={this.addOption}
          enableOption={tipo}
          deleteOption={this.deleteOption}
        />
        <FieldSelect
          label='relevancia'
          options={['Filtro', 'No filtro']}
          handlerChange={this.handlerChange}
          valor={relevancia}
        />
        <div className='button-content'>
          {
            this.props.editStatus !== ''
              ? <button className='material-button edit' onClick={() => { this.sendEditQuestion() }}> Editar</button>
              : <button className='material-button' onClick={() => { this.sendNewQuestion() }}> Guardar </button>
          }
          {/* <button className='material-button cancel' onClick={() => { this.sendNewQuestion() }}> Cancelar</button> */}
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default AddPregunta
