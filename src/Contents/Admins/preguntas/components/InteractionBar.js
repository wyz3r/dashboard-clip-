import React, { Component } from 'react'
import {PreguntasConsumer} from '../ContextPreguntas'
import Modal from 'react-modal'
import AddPreguntas from './AddPreguntas'

const customStyles = {
  content: {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}
class InteractionBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      stateModal: false
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount () {
    Modal.setAppElement('#addCreate')
  }

  openModal () {
    this.setState({stateModal: true})
  }

  closeModal () {
    this.setState({stateModal: false})
  }

  render () {
    return (
      <PreguntasConsumer>
        {(context) =>
          <div id='addCreate' className='interaction-content'>
            <Modal
              isOpen={context.stateModal}
              onRequestClose={context.openModal}
              style={customStyles}
            >
              <AddPreguntas
                editStatus={context.editStatus}
                dataPreguntas={context.dataPreguntas}
                updateQuestion={context.updateQuestion}
                editQuestion={context.editQuestion}
                addTableQuestion={context.addTableQuestion}
                closeModal={context.openModal}
              >
                <button className='material-button cancel' onClick={() => { context.openModal() }}> Cancelar</button>

              </AddPreguntas>
            </Modal>
            <select onChange={e => context.selectData(e.target.value)}>
              <option value=''>Todos</option>
              <option value='Filtro'>Filtro</option>
              <option value='No filtro'>No filtro</option>
            </select>
            <button className='material-button' onClick={() => { context.openModal() }}> Crear Pregunta</button>
          </div>
        }
      </PreguntasConsumer>

    )
  }
}

export default InteractionBar
