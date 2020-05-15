import React, { Component } from 'react'
import CardPregunta from './CardPregunta'
import {PreguntasConsumer} from '../ContextPreguntas'

class ListPreguntas extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div className='content-ListPreguntas'>
        <div className='overflow-container'>
          <PreguntasConsumer>
            {(context) => {
              return context.dataPreguntas.filter((e) => {
                if (context.selectFilter === 'all') return true
                return context.selectFilter === e.relevancia
              }).map((pregunta, index) => {
                return (
                  <CardPregunta
                    editStatus={(context.editStatus === index)}
                    key={`card-${index + 1}`}
                    position={index}
                    clave={pregunta.clave}
                    deleteQuestion={context.deleteQuestion}
                    editQuestion={context.editQuestion}
                    {...pregunta}
                  />
                )
              })
            }}
          </PreguntasConsumer>
        </div>
      </div>
    )
  }
}

export default ListPreguntas
