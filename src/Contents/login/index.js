import React from 'react'
import firebase from 'firebase'
import axios from 'axios'
class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      viewLogin: undefined
    }
    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this)
  }

  handleChange (e) {
    const {name, value} = e.target
    this.setState({
      [name]: value
    })
  }
  componentWillMount () {
    const idToken = window.localStorage.idToken
    if (idToken) {
      axios.post('http://localhost:8081/validatelogin', {idToken})
        .then((res) => {
          const { role } = res.data
          window.location.href = this.isLogin(role)
        })
        .catch((error) => {
          this.setState({viewLogin: true})
          console.log(error)
        })
    } else {
      this.setState({viewLogin: true})
    }
  }
  async login () {
    const {email, pass} = this.state
    try {
      await firebase.auth().signInWithEmailAndPassword(email, pass)
      firebase.auth().currentUser.getIdToken(true).then((idToken) => {
        axios.post('http://localhost:8081/validatelogin', {idToken})
          .then((res) => {
            const { role } = res.data
            window.localStorage.idToken = idToken
            window.location.href = this.isLogin(role)
          })
          .catch((error) => {
            console.log(error)
          })
      }).catch(function (error) {
        console.log({error})
      })
    } catch (error) {
      console.log({error})
      if (error.code === 'auth/user-not-found' || 'auth/wrong-password') alert('Usuario o contraseña incorrectas')
    }
  }
  isLogin (role) {
    return (role === 'Admin' ? '/admin/preguntas' : '')
  }
  tamplateLogin () {
    return (
      <div className='loginMain'>
        <div className='decoration black-range one' />
        <div className='decoration black-range two' />
        <div className='decoration orange one' />
        <div className='decoration orange two' />
        {/* <div className='decoration' /> */}

        <div className='login-content'>
          <div className='img-content'>
            <img alt='logo' src='https://s3.amazonaws.com/clipdashboard/Logo_clip.png' />
          </div>
          <div className='form-content'>
            <div className='input-content'>
              <label> User </label>
              <input type='text' name='email' onChange={this.handleChange} />
            </div>
            <div className='input-content' >
              <label> Password </label>
              <input type='password' name='pass' onChange={this.handleChange} />
            </div>
            <div className='button-content' >
              <button onClick={() => { this.login() }}>
                <div className='arrow-right icon' />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    // const { from } = this.props.location.state || { from: { pathname: '/admin/preguntas' } }
    const {viewLogin} = this.state
    return (
      <React.Fragment>
        {viewLogin === true ? this.tamplateLogin() : ''}
      </React.Fragment>
    )
  }
}

export default Index
