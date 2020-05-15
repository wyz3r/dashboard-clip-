import React, {Component} from 'react'
import axios from 'axios'
import {BarChart, Bar, XAxis, Tooltip, Legend, LabelList} from 'recharts'
// digital ad recall corresponde a la grafica de dg4

class EngageAdRecall extends Component {
  constructor (props) {
    super(props)
    this.state = {
      engagePayload: [{
        name: 'Total', dos: 0, tres: 0, cuatro: 0, cinco: 0, uno: 0
      },
      {
        name: 'wave1', uno: 0, dos: 0, tres: 0, cuatro: 0, cinco: 0
      },
      {
        name: 'wave2', uno: 0, dos: 0, tres: 0, cuatro: 0, cinco: 0
      },
      {
        name: 'wave3', uno: 0, dos: 0, tres: 0, cuatro: 0, cinco: 0
      },
      {
        name: 'wave4', uno: 0, dos: 0, tres: 0, cuatro: 0, cinco: 0
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
    axios.get(process.env.REACT_APP_URL + '/engageadrecall', {headers})
      .then((res) => {
        const {engagePayload} = res.data
        this.setState({engagePayload})
      }).catch((error) => {
        console.log(error)
      })
  }
  renderGraph (funnelPayload) {
  }

  render () {
    const {engagePayload} = this.state
    return (
      <div className='card-graph-content'>
        <BarChart
          barCategoryGap='10%'
          width={600} height={320}
          data={engagePayload}
          margin={{top: 20, right: 0, left: 0, bottom: 5}}>
          <XAxis dataKey='name' stroke='white' axisLine={false} tickLine={false} />
          <Tooltip />
          <XAxis dataKey='name' stroke='black' axisLine={false} tickLine={false} />
          <Legend margin={{right: 30, left: 30}} />
          <Bar dataKey='cinco' stackId='a' fill='#B39DDB' >
            <LabelList dataKey='cinco' />
          </Bar>
          <Bar dataKey='cuatro' stackId='a' fill='#9575CD' >
            <LabelList dataKey='cuatro' />
          </Bar>
          <Bar dataKey='tres' stackId='a' fill='#7E57C2' >
            <LabelList dataKey='tres' />
          </Bar>
          <Bar dataKey='dos' stackId='a' fill='#673AB7' >
            <LabelList dataKey='dos' />
          </Bar>
          <Bar dataKey='uno' stackId='a' fill='#5E35B1' >
            <LabelList dataKey='uno' />
          </Bar>
        </BarChart>
      </div>
    )
  }
}

export default EngageAdRecall
