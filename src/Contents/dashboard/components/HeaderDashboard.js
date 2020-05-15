import React from 'react'
class HeaderDashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <div className='dashboard-header'>
        <div className='left'>
          <h1 className='header-title'>AD 2 TRACK DIGITAL</h1>
        </div>
        <div className='right'>
          <div className='logo' />
        </div>
      </div>
    )
  }
}

export default HeaderDashboard
