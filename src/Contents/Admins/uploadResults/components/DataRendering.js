import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import XLSX from 'xlsx'

class DataRendering extends Component {
  constructor (props) {
    super(props)
    this.state = {
      headers: [],
      body: []
    }
    this.renderHeaders = this.renderHeaders.bind(this)
  }

  renderHeaders (headers) {
    return <React.Fragment>
      { headers.map((header, i) => {
        return <th scope='col' key={`header-${i + 1}`}>{header}</th>
      })}
    </React.Fragment>
  }

  renderBody (body) {
    return (
      body.map((row, i) => {
        return (
          <tr key={`row-${i + 1}`}>
            {row.map((cell, i) => {
              return (
                <td key={`${cell}-${i}`}>
                  {cell}
                </td>
              )
            })}
          </tr>
        )
      })
    )
  }

  // esta funcion se va a borrar
  render () {
    const {body, headers} = this.props
    return (
      <div className='content-uploads'>
        <table>
          <thead>
            <tr>
              {this.renderHeaders(headers)}
            </tr>
          </thead>
          <tbody>
            {this.renderBody(body)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default DataRendering

DataRendering.propTypes = {
  body: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)),
  headers: PropTypes.arrayOf(PropTypes.string)
}
