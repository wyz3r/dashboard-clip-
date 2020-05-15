import React, {Component} from 'react'
import axios from 'axios'
import {BarChart, Bar, XAxis, Tooltip, Legend, LabelList} from 'recharts'
class TotalAdRecall extends Component {
  constructor (props) {
    super(props)
    this.state = {
      totalAdRecallGraph: [{
        name: 'Total', Total: 0
      },
      {
        name: 'wave1', Ambos1: 0
      },
      {
        name: 'wave2', Ambos2: 0
      },
      {
        name: 'wave3', Ambos3: 0
      },
      {
        name: 'wave4', Ambos4: 0
      },
      {
        dummy: 100
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
      filters: JSON.stringify(filters)
    }
    axios.get(process.env.REACT_APP_URL + '/totaladrecall', {headers})
      .then((res) => {
        const {totalAdRecallGraph} = res.data
        this.setState({totalAdRecallGraph})
      }).catch((error) => {
        console.log(error)
      })
  }

  renderGraph (funnelPayload) {
  }

  render () {
    const {totalAdRecallGraph} = this.state
    return (
      <div className='card-graph-content'>
        <BarChart
          barCategoryGap='10%'
          width={800} height={320}
          data={totalAdRecallGraph}
          margin={{top: 20, right: 0, left: 0, bottom: 5}}>
          {/* <XAxis dataKey='name' stroke='white' axisLine={false} tickLine={false} /> */}
          <Tooltip />
          <XAxis dataKey='name' stroke='black' axisLine={false} tickLine={false} />
          <Legend margin={{right: 30, left: 30}} />
          <Bar dataKey='Total' stackId='a' fill='#FFDBCF' >
            <LabelList dataKey='Total' />
          </Bar>
          <Bar dataKey='Ambos1' stackId='a' fill='#FFDBCF' >
            <LabelList dataKey='Ambos1' />
          </Bar>
          <Bar dataKey='Ambos2' stackId='a' fill='#FF946A' >
            <LabelList dataKey='Ambos2' />
          </Bar>
          <Bar dataKey='Ambos3' stackId='a' fill='#FC4C02' >
            <LabelList dataKey='Ambos3' />
          </Bar>
          <Bar dataKey='Ambos4' stackId='a' fill='#FFDBCF' >
            <LabelList dataKey='Ambos4' />
          </Bar>
          <Bar dataKey='dummy' stackId='a' fill='#FFDBCF' >
            <LabelList dataKey='dummy' />
          </Bar>
        </BarChart>
      </div>
    )
  }
}

export default TotalAdRecall
