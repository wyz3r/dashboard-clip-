import React, {Component} from 'react'
import axios from 'axios'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

class KeyCopyPoints extends Component {
  constructor (props) {
    super(props)
    this.state = {
      keypointPayload: [
        {name: 'wave1', 'EM18-1': 75, 'EM18-2': 34, 'EM18-3': 89, 'EM18-4': 13},
        {name: 'wave2', 'EM18-1': 13, 'EM18-2': 13, 'EM18-3': 80, 'EM18-4': 81},
        {name: 'wave3', 'EM18-1': 90, 'EM18-2': 40, 'EM18-3': 40, 'EM18-4': 90},
        {name: 'wave4', 'EM18-1': 88, 'EM18-2': 10, 'EM18-3': 48, 'EM18-4': 35}
      ]
    }
  }
  componentWillReceiveProps (nextProps) {
    const {filters} = nextProps
    this.requestFuntion(filters)
  }

  componentDidMount () {
    const {filters} = this.props
    this.requestFuntion(filters)
  }

  requestFuntion (filters) {
    const headers = {
      filters: JSON.stringify(filters)
    }
    axios.get(process.env.REACT_APP_URL + '/keyCopyPoints', {headers})
      .then((res) => {
        const {keypointPayload} = res.data
        this.setState({keypointPayload})
      }).catch((error) => {
        console.log(error)
      })
  }

  render () {
    const {keypointPayload} = this.state
    return (
      <div className='card-graph-content'>
        <div className='waves-content'>
          <LineChart width={600} height={300} data={keypointPayload}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey='name' />
            <YAxis />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='EM18-1' stroke='#8884d8' activeDot={{r: 8}} />
            <Line type='monotone' dataKey='EM18-2' stroke='#82ca9d' />
            <Line type='monotone' dataKey='EM18-3' stroke='#99Aa9d' />
            <Line type='monotone' dataKey='EM18-4' stroke='#8884d8' activeDot={{r: 8}} />x
          </LineChart>
        </div>
      </div>
    )
  }
}

export default KeyCopyPoints
