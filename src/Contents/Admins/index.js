import React, { Component } from 'react'
import SideBar from './components/SideBar.js'
import Preguntas from './preguntas'
import Results from './uploadResults'

import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

class AdminPanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  isLogin () {
    const token = window.localStorage.idToken
    if (!token || token === '') return false
    return true
  }

  render () {
    return (
      this.isLogin()
        ? <div className='body-content'>
          <SideBar >
            <Switch>
              <Route
                path={`${this.props.match.url}/preguntas`}
                exact
                component={Preguntas}
              />
              <Route
                path={`${this.props.match.url}/uploadResult`}
                exact
                component={Results}
              />
            </Switch>
          </SideBar>
        </div>
        : <Redirect to={{
          pathname: '/',
          state: { from: this.props.location }
        }} />
    )
  }
}

export default AdminPanel
