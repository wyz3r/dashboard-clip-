import React, { Component } from 'react'

class FieldOptions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      num: 0
    }
    this.renderOptions = this.renderOptions.bind(this)
  }
  renderOptions (options) {
    const {handlerOptions, addOption, deleteOption, enableOption} = this.props
    return (
      <React.Fragment>
        {options.map((el, k) => {
          return (
            <div className='container-options ' key={k}>
              <input
                id={`options-${k}`}
                value={el}
                name={k}
                onChange={(e) => handlerOptions(e)}
                onKeyPress={e => addOption(e)}
                disabled={enableOption === 'Abierta'}
              />
              <div className='button-add' onClick={() => { addOption(13) }}>
                <div className='plus icon' />
              </div>
              <div className='button-delete' onClick={() => { deleteOption(k) }}>
                <div className='trash-solid icon' />
              </div>
            </div>
          )
        })
        }
      </React.Fragment>
    )
  }
  render () {
    const {label, options, enableOption} = this.props
    return (
      <div className={'topandBottomMargin add-options' + (enableOption === 'abierta' ? 'block' : '')}>
        <label>{label}</label>
        <div className='options-content'>
          {this.renderOptions(options)}
        </div>
      </div>
    )
  }
}

export default FieldOptions
