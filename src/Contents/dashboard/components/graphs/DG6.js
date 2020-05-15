import React, {Component} from 'react'
import axios from 'axios'
import {BarChart, Bar, XAxis, Tooltip, LabelList} from 'recharts'
class DG6 extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dg6Payload: [{
        name: 'DG6-2', 'DG6-2': 70
      },
      {
        name: 'DG6-5', 'DG6-5': 0
      },
      {
        name: 'DG6-1', 'DG6-1': 0
      },
      {
        name: 'DG6-3', 'DG6-3': 0
      },
      {
        name: 'DG6-4', 'DG6-4': 0
      },
      {
        name: 'DG6-6', 'DG6-6': 0
      },
      {
        name: 'DG6-7', 'DG6-7': 0
      },
      {
        name: 'DG6-8', 'DG6-8': 50
      },
      {
        name: 'DG6-9', 'DG6-9': 0
      },
      {
        name: 'DG6-10', 'DG6-10': 0
      },
      {
        name: 'DG6-11', 'DG6-11': 55
      },
      {
        name: 'DG6-12', 'DG6-12': 0
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
    axios.get(process.env.REACT_APP_URL + '/dg6', {headers})
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
        <Bar key={dataElement.name + index} dataKey={dataElement.name} stackId='a' fill='#FFDBCF' >
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
          barCategoryGap='10%'
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
