import React from 'react'
import PropTypes from 'prop-types'
class ShowOptions extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false
    }
    this.showItems = this.showItems.bind(this)
    this.closedOptions = this.closedOptions.bind(this)
  }

  showItems () {
    this.setState({ show: true })
  }

  closedOptions () {
    this.setState({ show: false })
  }

  render () {
    const {optionsData} = this.props
    if (optionsData.length === 0) {
      return 'No hay opciones'
    }
    return (
      <div className='show-options' tabIndex='0' onBlur={this.closedOptions}>
        <button className='show-button' onClick={this.showItems}>
          <p>Ver las opciones</p>
          <p>▼</p>
        </button>
        {
          this.state.show &&
          <div className='content-options'>
            {
              optionsData.map(option => {
                return <p key={option} className='option'>{option}</p>
              })
            }
          </div>
        }
      </div>
    )
  }
}

export default ShowOptions

ShowOptions.propTypes = {
  optionsData: PropTypes.arrayOf(PropTypes.string)
}
