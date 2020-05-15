import React, {Component} from 'react'
// import axios from 'axios'
// import {BarChart, Bar, XAxis, Tooltip, Legend, LabelList} from 'recharts'

class CardGraph extends Component {
  constructor (props) {
    super(props)
    this.state = {
      paymentTools: [],
      terminal: []
    }
  }
  componentWillReceiveProps (nextProps) {
  }
  componentWillMount () {
    // const {filters} = this.props
  }

  render () {
    // const {letering} = this.props
    const {title, titleSize} = this.props
    return (
      <div className='content-graph-info' >
        <div className='graphs-content'>
          <h1 className='general-titulo' style={{width: titleSize}}>{title}</h1>
          <div className='decoration' />
        </div>
        <div className='body-card'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default CardGraph
