import React, { Component } from 'react'
import logo from '../../../logo.svg'
import { Link } from 'react-router-dom'

class SideBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <React.Fragment>
        <div className='sidenav-content'>
          <div className='logo'>
            <img alt='imagen' src={logo} />
          </div>
          <div className='sidenav-list'>
            <Link to='/admin/preguntas'>Listado de preguntas</Link>
            <Link to='/admin/uploadResult'>Subir resultados </Link>
          </div>
        </div>
        <div className='work-area'>
          {this.props.children}
        </div>
      </React.Fragment>
    )
  }
}

export default SideBar
