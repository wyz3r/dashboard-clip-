import React, { Component } from 'react'
// import dataPreguntas from './dataPreguntas.json'
import axios from 'axios'

const AppContext = React.createContext('context-preguntas')

class ContextPreguntas extends Component {
  constructor (props) {
    super(props)
    this.state = {
      stateModal: false,
      dataPreguntas: [],
      editStatus: '',
      selectFilter: 'all',
      selectData: this.selectData.bind(this),
      editQuestion: this.editQuestion.bind(this),
      deleteQuestion: this.deleteQuestion.bind(this),
      addTableQuestion: this.addTableQuestion.bind(this),
      updateQuestion: this.updateQuestion.bind(this),
      openModal: this.openModal.bind(this)
    }
  }
  componentWillMount () {
    axios.get('http://localhost:8081/getquestions')
      .then((res) => {
        const dataPreguntas = res.data
        this.setState({dataPreguntas})
      })
      .catch((error) => {
        console.log(error)
      })
  }
  editQuestion (question) {
    this.setState({editStatus: question, stateModal: !this.state.stateModal})
  }
  selectData (typeQuestions) {
    if (typeQuestions === '') {
      this.setState({selectFilter: 'all'})
    } else {
      this.setState({selectFilter: typeQuestions})
    }
  }
  openModal () {
    this.setState({stateModal: !this.state.stateModal, editStatus: ''})
  }
  deleteQuestion (question) {
    const {dataPreguntas} = this.state
    dataPreguntas.splice(question, 1)
    this.setState({dataPreguntas})
  }
  addTableQuestion (question) {
    const payload = question
    axios.post('http://localhost:8081/addquestion', {payload})
      .then((res) => {
        const dataPreguntas = res.data
        this.setState({dataPreguntas})
      })
      .catch((error) => {
        console.log(error)
      })
  }
  updateQuestion (question) {
    axios.post('http://localhost:8081/addquestion', {payload: question})
      .then((res) => {
        const dataPreguntas = res.data
        this.setState({dataPreguntas, editStatus: ''})
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}
export const Provider = ContextPreguntas
export const PreguntasConsumer = AppContext.Consumer
