import React, {Component} from 'react'
import axios from 'axios'
import {BarChart, Bar, XAxis, Tooltip, Legend, LabelList} from 'recharts'

class GeneralInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      paymentTools: [],
      terminal: []
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
    axios.get(process.env.REACT_APP_URL + '/infogeneral', {headers})
      .then((res) => {
        const {paymentTools, terminal} = res.data
        this.setState({paymentTools, terminal})
      }).catch((error) => {
        console.log(error)
      })
  }

  render () {
    // const {letering} = this.props
    const {terminal, paymentTools} = this.state
    const renderCustomizedLabelWhite = (props) => {
      const { x, y, width, value, height } = props
      return (
        <g>
          {/* <circle cx={x + width / 2} cy={y - radius} r={radius} fill='#8884d8' /> */}
          <text style={{fontWeight: 400}} x={x + width / 2} y={y + height / 2} fill='#fff' textAnchor='middle'>
            {value}
          </text>
        </g>
      )
    }
    const renderCustomizedLabelBlack = (props) => {
      const { x, y, width, value, height } = props
      return (
        <g>
          {/* <circle cx={x + width / 2} cy={y - radius} r={radius} fill='#8884d8' /> */}
          <text style={{fontWeight: 400}} x={x + width / 2} y={y + height / 2} fill='#2E3033' textAnchor='middle'>
            {value}
          </text>
        </g>
      )
    }

    return (
      <div className='general-info' >
        <h1 className='general-titulo' >GENERAL INFORMATION</h1>
        <div className='graphs-content'>
          <div className='decoration' />
          <div className='payment-graph'>
            <h2 className='sub-titulo'>Payment Tools</h2>
            <div className='justify-graph-content'>
              <BarChart
                barCategoryGap='20%'
                width={600} height={320} data={paymentTools}
                margin={{top: 20, right: 0, left: 0, bottom: 5}}>
                {/* <XAxis dataKey='name' stroke='white' axisLine={false} tickLine={false} /> */}
                <Tooltip />
                <XAxis dataKey='name' stroke='white' axisLine tickLine />
                <Legend />
                <Bar dataKey='Ambos' stackId='a' fill='#FFDBCF' >
                  <LabelList dataKey='Ambos' content={renderCustomizedLabelBlack} />
                </Bar>
                <Bar dataKey='Lector' stackId='a' fill='#FF946A' >
                  <LabelList dataKey='Lector' content={renderCustomizedLabelWhite} />
                </Bar>
                <Bar dataKey='Terminal bancaria' stackId='a' fill='#FC4C02' >
                  <LabelList color='Terminal bancaria' dataKey='Terminal bancaria' content={renderCustomizedLabelWhite} />
                </Bar>
              </BarChart>
            </div>
          </div>
          <div className='payment-graph'>
            <h2 className='sub-titulo'>TERMINAL TYPE</h2>
            <div className='justify-graph-content'>
              <BarChart
                barCategoryGap='20%'
                width={600} height={320} data={terminal}
                margin={{top: 20, right: 0, left: 0, bottom: 5}}>
                <XAxis dataKey='name' stroke='white' axisLine tickLine />
                <Tooltip />
                <Legend margin={{right: 30, left: 30, top: 15}} />
                <Bar dataKey='Ambos' stackId='a' fill='#FFDBCF' >
                  <LabelList dataKey='Ambos' content={renderCustomizedLabelBlack} />
                </Bar>
                <Bar dataKey='Lector' stackId='a' fill='#FF946A' >
                  <LabelList dataKey='Lector' content={renderCustomizedLabelWhite} />
                </Bar>
                <Bar dataKey='Terminal bancaria' stackId='a' fill='#FC4C02' >
                  <LabelList color='Terminal bancaria' dataKey='Terminal bancaria' content={renderCustomizedLabelWhite} />
                </Bar>
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GeneralInfo
