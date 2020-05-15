import React, {Component} from 'react'
import axios from 'axios'
import {PieChart, Pie, Cell, Legend} from 'recharts'

const COLORS = ['#008800', '#00C49F']
const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
      {`${(percent * 100).toFixed(0)}`}
    </text>
  )
}
class DigitalAdRecall extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tvPayload: {
        Total: [
          { name: 'si', value: 0 },
          { name: 'no', value: 0 }
        ],
        wave1: [
          { name: 'si', value: 0 },
          { name: 'no', value: 0 }
        ],
        wave2: [
          { name: 'si', value: 0 },
          { name: 'no', value: 0 }
        ],
        wave3: [
          { name: 'si', value: 0 },
          { name: 'no', value: 0 }
        ],
        wave4: [
          { name: 'si', value: 0 },
          { name: 'no', value: 0 }
        ]
      }
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
    axios.get(process.env.REACT_APP_URL + '/tvadrecall', {headers})
      .then((res) => {
        const {tvPayload} = res.data
        this.setState({tvPayload})
      }).catch((error) => {
        console.log(error)
      })
  }
  renderPieGraph (tvPayload) {
    const pieCharts = Object.keys(tvPayload).map((keyPie) => {
      return (
        <PieChart width={200} height={200} key={keyPie}>
          <Legend margin={{right: 30, left: 30}} />
          <Pie
            data={tvPayload[keyPie]}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill='#8884d8'
            dataKey='value'
            startAngle={90}
            endAngle={520}
          >
            {
              tvPayload[keyPie].map((entry, index) => {
                return (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              })
            }
          </Pie>
        </PieChart>
      )
    })
    return (pieCharts)
  }

  render () {
    const {tvPayload} = this.state
    return (
      <div className='card-graph-content'>
        <div className='waves-content'>
          {this.renderPieGraph(tvPayload)}
        </div>
      </div>
    )
  }
}

export default DigitalAdRecall
