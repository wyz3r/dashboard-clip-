import React, {Component} from 'react'
import axios from 'axios'
import {BarChart, Bar, XAxis, Tooltip, Legend, LabelList} from 'recharts'
class Consideration extends Component {
  constructor (props) {
    super(props)
    this.state = {
      consGraphs: []
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
    axios.get(process.env.REACT_APP_URL + '/consideration', {headers})
      .then((res) => {
        const {consGraphs} = res.data
        this.setState({consGraphs})
      }).catch((error) => {
        console.log(error)
      })
  }
  render () {
    const {consGraphs} = this.state
    return (
      <div className='card-graph-content'>
        <BarChart
          barCategoryGap='20%'
          width={600} height={320}
          data={consGraphs}
          margin={{top: 20, right: 0, left: 0, bottom: 5}}>
          {/* <XAxis dataKey='name' stroke='white' axisLine={false} tickLine={false} /> */}
          <Tooltip />
          <XAxis dataKey='name' stroke='white' axisLine={false} tickLine={false} />
          <Legend margin={{right: 30, left: 30}} />
          <Bar dataKey='nunca' stackId='a' fill='#FFDBCF' >
            <LabelList dataKey='nunca' />
          </Bar>
          <Bar dataKey='nosecond' stackId='a' fill='#FF946A' >
            <LabelList dataKey='nosecond' />
          </Bar>
          <Bar dataKey='nofirst' stackId='a' fill='#FC4C02' >
            <LabelList dataKey='nofirst' />
          </Bar>
          <Bar dataKey='unica marca' stackId='a' fill='#FFDBCF' >
            <LabelList dataKey='unica marca' />
          </Bar>
        </BarChart>
      </div>
    )
  }
}

export default Consideration
