import React, { Component } from 'react'
import './styles/App.css'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import firebase from 'firebase'

// import Login from './Contents/login'
import AdminPanel from './Contents/Admins/'
import dashboard from './Contents/dashboard/'

import Results from './Contents/Admins/uploadResults'

let config = {
  apiKey: 'AIzaSyCwUJbiZkpke_gcOciBMHCEHex_HuX-okQ',
  authDomain: 'clip-dashboard.firebaseapp.com',
  databaseURL: 'https://clip-dashboard.firebaseio.com',
  projectId: 'clip-dashboard',
  storageBucket: 'clip-dashboard.appspot.com',
  messagingSenderId: '815482082511'
}

firebase.initializeApp(config)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Results} />
          <Route path='/admin' component={AdminPanel} />
          <Route path='/dash' component={dashboard} />
          {/* <Route exact path='/imagen' component={Image} />
          <Route path='/admins' component={Admins} />
          <Route exact path='/finish-test' component={UserData} />
          <Route
            exact path='/:estimuloid' component={Video} /> */}
        </Switch>
      </Router>
    )
  }
}

export default App
