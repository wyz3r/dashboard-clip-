import React from 'react'
import GeneralInfo from './graphs/GeneralInfo'
import FunnelKnowandUse from './graphs/FunnelKnowandUse'
import Consideration from './graphs/Consideration'
import TotalAdRecall from './graphs/TotalAdRecall'
import DigitalAdRecall from './graphs/DigitalAdRecall'
import EngageAdRecall from './graphs/EngageAdRecall'
import TvAdRecall from './graphs/TvAdRecall'
import KeyCopyPoints from './graphs/KeyCopyPoints'
import DG6 from './graphs/DG6'
import EMS from './graphs/EMS'

import CardGraph from './graphs/CardGraph'

import {FiltersConsumer} from '../ContextFilters'

class BodyGraph extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <FiltersConsumer>
        {({filters, selectMarcas}) => {
          return (
            <div className='body-graph' id='body-graph' >
              {filters['users'] !== 3
                ? <GeneralInfo filters={filters} /> : ''}
              {filters['marca'] !== ''
                ? <CardGraph title='FUNNEL KNOWLEDGE AND USE' titleSize='75%' >
                  <FunnelKnowandUse filters={filters} selectMarcas={selectMarcas} />
                </CardGraph> : '' }
              {
                filters['users'] === 2
                  ? <CardGraph title='CONSIDERATION' titleSize='27%' >
                    <Consideration filters={filters} selectMarcas={selectMarcas} />
                  </CardGraph> : ''
              }
              <CardGraph title='Ad Performance' filters={filters} titleSize='44%' >
                <TotalAdRecall filters={filters} selectMarcas={selectMarcas} />
              </CardGraph>
              <CardGraph title='digital Ad Performance' filters={filters} titleSize='20%'>
                <DigitalAdRecall filters={filters} selectMarcas={selectMarcas} />
                <EngageAdRecall filters={filters} selectMarcas={selectMarcas} />
                <DG6 filters={filters} selectMarcas={selectMarcas} />
              </CardGraph>
              <CardGraph title='TV Ad Recall' titleSize='17%' >
                <TvAdRecall filters={filters} selectMarcas={selectMarcas} />
                <KeyCopyPoints filters={filters} selectMarcas={selectMarcas} />
                <EMS filters={filters} selectMarcas={selectMarcas} />
              </CardGraph>
            </div>
          )
        }
        }
      </FiltersConsumer>
    )
  }
}

export default BodyGraph
