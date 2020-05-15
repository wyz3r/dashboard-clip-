import React, {Component} from 'react'
import axios from 'axios'
import {BarChart, Bar, XAxis, YAxis, LabelList} from 'recharts'
class FunnelKnowandUse extends Component {
  constructor (props) {
    super(props)
    this.state = {
      scroll: 0,
      funnelPayload: {
        total: [{
          'preferida': 0,
          'last month': 0,
          'last 3m': 0,
          'familiaridad': 0,
          'awareness': 0,
          'dummy': 0
        }],
        waves: {
          wave: [{
            'preferida': 0,
            'familiaridad': 0,
            'last month': 0,
            'last 3m': 0,
            'awareness': 0,
            'dummy': 0
          }],
          wave2: [{
            'preferida': 0,
            'familiaridad': 0,
            'last month': 0,
            'last 3m': 0,
            'awareness': 0
          }],
          wave3: [{
            'preferida': 0,
            'familiaridad': 0,
            'last month': 0,
            'last 3m': 0,
            'awareness': 0
          }],
          wave4: [{
            'preferida': 0,
            'familiaridad': 0,
            'last month': 0,
            'last 3m': 0,
            'awareness': 0
          }]
        }
      }
    }
    this.scrollPosition = 0
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
    axios.get(process.env.REACT_APP_URL + '/funnel', {headers})
      .then((res) => {
        const {funnelPayload} = res.data
        this.setState({funnelPayload})
      }).catch((error) => {
        console.log(error)
      })
  }

  scrolright () {
    const scrollDiv = document.getElementById('scrolldiv')
    const {scroll} = this.state
    // validar algoritmo
    if (scrollDiv.offsetWidth > scroll) {
      this.scrollPosition = this.scrollPosition + 367
      scrollDiv.scrollLeft = parseInt(this.scrollPosition, 10)
    } else {
      scrollDiv.scrollLeft = parseInt(this.scrollPosition, 10)
    }
  }
  scrolleft () {
    this.scrollPosition = (this.scrollPosition === 0 ? 0 : parseInt(this.scrollPosition - 367, 10))
    // console.log(this.scrool)
    const scrollDiv = document.getElementById('scrolldiv')
    scrollDiv.scrollLeft = parseInt(this.scrollPosition, 10)
  }
  renderGraph (funnelPayload) {
    const renderCustomizedLabelBlack = (props) => {
      const { x, y, width, value, height } = props
      return (
        <g>
          {/* <circle cx={x + width / 2} cy={y - radius} r={radius} fill='#8884d8' /> */}
          <text style={{fontWeight: 700}} x={x + width / 2} y={y + height / 2} fill='#FFFFFF' textAnchor='middle'>
            {value}
          </text>
        </g>
      )
    }
    const element = Object.keys(funnelPayload.waves).map((graphKey, index) => {
      return (
        <div key={'graph' + graphKey} className='wave-graph'>
          <div className='title-graph'>{graphKey}</div>
          <BarChart
            maxBarSize={10}
            layout='vertical'
            width={280} height={300} data={funnelPayload.waves[graphKey]}
            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <XAxis type='number' hide />
            <YAxis type='category' dataKey='name' hide />
            <Bar dataKey='preferida' barSize={40} fill='#F1C42C' >
              <LabelList dataKey='preferida' content={renderCustomizedLabelBlack} />
            </Bar>
            <Bar dataKey='last month' barSize={40} fill='#FC4C02' >
              <LabelList dataKey='last month' content={renderCustomizedLabelBlack} />
            </Bar>
            <Bar dataKey='last 3m' barSize={40} fill='#D20505' >
              <LabelList dataKey='last 3m' content={renderCustomizedLabelBlack} />
            </Bar>
            <Bar maxBarSize={1200} dataKey='familiaridad' barSize={40} fill='#721503' >
              <LabelList dataKey='familiaridad' content={renderCustomizedLabelBlack} />
            </Bar>
            <Bar dataKey='awareness' barSize={40} fill='#9E1E00' onMouseOut={(e) => { console.log(e) }} onMouseOver={(e) => { console.log(e) }}>
              <LabelList dataKey='awareness' content={renderCustomizedLabelBlack} />
            </Bar>
            <Bar className='uno' dataKey='dummy' barSize={40} fill='#F2F2F2' >
              <LabelList dataKey='dummy' content={renderCustomizedLabelBlack} />
            </Bar>
          </BarChart>
          <div className='tom-container'>
             tom {funnelPayload.waves[graphKey][0]['TOM']}
          </div>
        </div>
      )
    })
    return (element)
  }

  render () {
    const {funnelPayload} = this.state
    const {filters, selectMarcas} = this.props
    const {marca} = filters
    const renderCustomizedLabelBlack = (props) => {
      const { x, y, width, value, height } = props
      return (
        <g>
          {/* <circle cx={x + width / 2} cy={y - radius} r={radius} fill='#8884d8' /> */}
          <text style={{fontWeight: 700}} x={x + width / 2} y={y + height / 2} fill='#FFFFFF' textAnchor='middle'>
            {value}
          </text>
        </g>
      )
    }
    return (
      <div className='card-graph-content'>
        <div className='title-brand'>{selectMarcas[marca]} </div>
        <div className='waves-content'>
          <div className='label-graph-content'>
            <label>
              Preference
            </label>
            <label>
              LM Usage
            </label>
            <label>
              3M Usage
            </label>
            <label>
              3M Usage
            </label>
            <label>
              Awareness
            </label>
          </div>
          <div className='wave-graph'>
            <div className='title-graph'>Total</div>
            <BarChart
              maxBarSize={10}
              layout='vertical'
              width={280} height={300} data={funnelPayload.total}
              margin={{top: 20, right: 30, left: 20, bottom: 5}}>
              <XAxis type='number' hide />
              <YAxis type='category' dataKey='name' hide />
              {/* <Legend /> */}
              {/* <Tooltip /> */}
              <Bar dataKey='preferida' barSize={40} fill='#F1C42C' >
                <LabelList dataKey='preferida' content={renderCustomizedLabelBlack} />
              </Bar>
              <Bar dataKey='last month' barSize={40} fill='#FC4C02' >
                <LabelList dataKey='last month' content={renderCustomizedLabelBlack} />
              </Bar>
              <Bar dataKey='last 3m' barSize={40} fill='#D20505' >
                <LabelList dataKey='last 3m' content={renderCustomizedLabelBlack} />
              </Bar>
              <Bar maxBarSize={1200} dataKey='familiaridad' barSize={40} fill='#721503' >
                <LabelList dataKey='familiaridad' content={renderCustomizedLabelBlack} />
              </Bar>
              <Bar dataKey='awareness' barSize={40} fill='#9E1E00' onMouseOut={(e) => { console.log(e) }} onMouseOver={(e) => { console.log(e) }}>
                <LabelList dataKey='awareness' content={renderCustomizedLabelBlack} />
              </Bar>
              <Bar className='uno' dataKey='dummy' barSize={40} fill='#F2F2F2' >
                <LabelList dataKey='dummy' content={renderCustomizedLabelBlack} />
              </Bar>
            </BarChart>
            <div className='tom-container'>
              tom {funnelPayload.total[0]['TOM']}
            </div>
          </div>
          <div className='wave-graph-content'>
            <div className='left-arrow' onClick={() => this.scrolleft()} />
            <div className='right-arrow' onClick={() => this.scrolright()} />
            <div className='graph-slider' id='scrolldiv'>
              <div className='large-content-graph' >
                {this.renderGraph(funnelPayload)}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FunnelKnowandUse
