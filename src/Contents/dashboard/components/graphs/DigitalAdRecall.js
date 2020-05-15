import React, {Component} from 'react'
import axios from 'axios'
import {BarChart, Bar, XAxis, Tooltip, Legend, LabelList} from 'recharts'
// digital ad recall corresponde a la grafica de dg2
class DigitalAdRecall extends Component {
  constructor (props) {
    super(props)
    this.state = {
      digitalAdRecallGraph: [{
        name: 'Total', twitter: 0, instagram: 0, youtube: 0, linkedin: 0, facebook: 0
      },
      {
        name: 'wave1', facebook: 0, twitter: 0, instagram: 0, youtube: 0, linkedin: 0
      },
      {
        name: 'wave2', facebook: 0, twitter: 0, instagram: 0, youtube: 0, linkedin: 0
      },
      {
        name: 'wave3', facebook: 0, twitter: 0, instagram: 0, youtube: 0, linkedin: 0
      },
      {
        name: 'wave4', facebook: 0, twitter: 0, instagram: 0, youtube: 0, linkedin: 0
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
    axios.get(process.env.REACT_APP_URL + '/digitaladrecall', {headers})
      .then((res) => {
        const {digitalAdRecallGraph} = res.data
        this.setState({digitalAdRecallGraph})
      }).catch((error) => {
        console.log(error)
      })
  }
  renderGraph (funnelPayload) {
  }

  render () {
    const {digitalAdRecallGraph} = this.state
    return (
      <div className='card-graph-content'>
        <BarChart
          barCategoryGap='10%'
          width={600} height={320}
          data={digitalAdRecallGraph}
          margin={{top: 20, right: 0, left: 0, bottom: 5}}>
          <XAxis dataKey='name' stroke='white' axisLine={false} tickLine={false} />
          <Tooltip />
          <XAxis dataKey='name' stroke='black' axisLine={false} tickLine={false} />
          <Legend margin={{right: 30, left: 30}} />
          <Bar dataKey='linkedin' stackId='a' fill='#0e76a8' >
            <LabelList dataKey='linkedin' />
          </Bar>
          <Bar dataKey='youtube' stackId='a' fill='#c4302b' >
            <LabelList dataKey='youtube' />
          </Bar>
          <Bar dataKey='instagram' stackId='a' fill='#fb3958' >
            <LabelList dataKey='instagram' />
          </Bar>
          <Bar dataKey='twitter' stackId='a' fill='#00aced' >
            <LabelList dataKey='twitter' />
          </Bar>
          <Bar dataKey='facebook' stackId='a' fill='#3B5998' >
            <LabelList dataKey='facebook' />
          </Bar>
        </BarChart>
      </div>
    )
  }
}

export default DigitalAdRecall
