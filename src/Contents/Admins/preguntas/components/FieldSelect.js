import React, { Component } from 'react'

class FieldSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  renderOptions (options) {
    return (
      <React.Fragment>
        <option value=''>Elige una opción</option>
        {options.map((e) => {
          return (
            <option key={e} value={e}>{e}</option>
          )
        })}
      </React.Fragment>
    )
  }

  render () {
    const {label, handlerChange, options} = this.props
    return (
      <div className='add-select topandBottomMargin'>
        <label>{label}</label>
        <select
          name={label}
          onChange={(e) => handlerChange(e)}
          value={this.props.valor}
        >
          {this.renderOptions(options)}
        </select>
      </div>
    )
  }
}

export default FieldSelect
