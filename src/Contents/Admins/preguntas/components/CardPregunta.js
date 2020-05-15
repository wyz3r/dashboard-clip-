import React from 'react'
import PropTypes from 'prop-types'

// Components
import ShowOptions from './ShowOptions'

class CardPregunta extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  renderItemCard (title, content) {
    return (
      <div className='item'>
        <p className='title-item'>{title}</p>
        <div className='content-item'>{content}</div>
      </div>
    )
  }

  render () {
    const {clave, titulo, tipo, opciones, relevancia, editStatus, position} = this.props
    return (
      <div className={'card-pregunta ' + (editStatus ? 'edit' : '')}>
        <div className='content'>
          {this.renderItemCard('clave', clave)}
          {this.renderItemCard('titulo', titulo)}
          {this.renderItemCard('tipo', tipo)}
          {this.renderItemCard('opciones', <ShowOptions optionsData={opciones} />)}
          {this.renderItemCard('relevancia', relevancia)}
        </div>
        <div className='actions'>
          <div className='trash-solid icon' onClick={() => this.props.deleteQuestion(this.props.position)} />
          <div className='edit-solid icon' onClick={() => this.props.editQuestion(position)} />
        </div>
      </div>
    )
  }
}

export default CardPregunta

CardPregunta.propTypes = {
  clave: PropTypes.string,
  deleteQuestion: PropTypes.func,
  editQuestion: PropTypes.func,
  editStatus: PropTypes.bool,
  opciones: PropTypes.array,
  position: PropTypes.number,
  relevancia: PropTypes.string,
  tipo: PropTypes.string,
  titulo: PropTypes.string
}
