import React from 'react'
import HeaderDashboard from './components/HeaderDashboard'
import MenuFiltros from './components/MenuFiltros'
import BodyGraph from './components/BodyGraph'
import {FiltersProvider} from './ContextFilters'

class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      viewLogin: undefined,
      positionMenu: 0
    }
  }

  render () {
    return (
      <div className='dashboard-main'>
        <FiltersProvider>
          <HeaderDashboard />
          <MenuFiltros />
          <BodyGraph />
        </FiltersProvider>
      </div>
    )
  }
}

export default Index
