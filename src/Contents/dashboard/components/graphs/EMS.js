import React, {Component} from 'react'
import axios from 'axios'
import {BarChart, Bar, XAxis, Tooltip, LabelList} from 'recharts'
class DG6 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dg6Payload: [{
        name: 'EM1', 'EM1': 70
      },
      {
        name: 'EM4', 'EM4': 0
      },
      {
        name: 'EM7', 'EM7': 0
      },
      {
        name: 'EM5', 'EM5': 0
      },
      {
        name: 'EM6', 'EM6': 0
      },
      {
        name: 'dummy', dummy: 100
      }
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
      filters: JSON.stringify(filters),
      especificwave: 1
    }
    axios.get(process.env.REACT_APP_URL + '/ems', {headers})
      .then((res) => {
        const {dg6Payload} = res.data
        this.setState({dg6Payload})
      }).catch((error) => {
        console.log(error)
      })
  }

  renderBarGraph (dg6Payload) {
    const barsElements = dg6Payload.map((dataElement, index) => {
      return (
        <Bar key={'bar' + index} dataKey={dataElement.name} stackId='a' fill='#FFDBCF' >
          <LabelList dataKey={dataElement.name} />
        </Bar>
      )
    })
    return barsElements
  }

  render () {
    const {dg6Payload} = this.state
    return (
      <div className='card-graph-content'>
        <BarChart
          barCategoryGap='30%'
          width={1200} height={320}
          data={dg6Payload}
          margin={{top: 20, right: 0, left: 0, bottom: 5}}>
          {/* <XAxis dataKey='name' stroke='white' axisLine={false} tickLine={false} /> */}
          <Tooltip />
          <XAxis dataKey='name' stroke='black' axisLine={false} tickLine={false} />
          {this.renderBarGraph(dg6Payload)}
        </BarChart>
      </div>
    )
  }
}

export default DG6
