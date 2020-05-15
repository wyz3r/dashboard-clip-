import React, { Component } from 'react'
// import AddPreguntas from './components/AddPreguntas'
import InteractionBar from './components/InteractionBar'

import ListPreguntas from './components/ListPreguntas'
import {Provider} from './ContextPreguntas'
class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  // esta funcion se va a borrar
  render () {
    return (
      <div className='content-question'>
        <Provider>
          <InteractionBar />
          <ListPreguntas />
        </Provider>
      </div>
    )
  }
}

export default Index
