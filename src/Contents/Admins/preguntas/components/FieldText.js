import React, { Component } from 'react'

class FieldText extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    const {label, handlerChange, repeatKey} = this.props
    return (
      <div className='add-input'>
        <div className='add-input-content'>
          <label>{label}</label>
          <input
            name={label}
            onChange={(e) => handlerChange(e)}
            value={this.props.valor}
          />
        </div>
        {repeatKey ? <label className='errorKey' >Llave existente</label> : ''}
      </div>
    )
  }
}

export default FieldText
