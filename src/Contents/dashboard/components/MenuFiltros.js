import React from 'react'

import {FiltersConsumer} from '../ContextFilters'

class MenuFiltros extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      positionMenu: 0,
      activeMenu: false
    }
    this.handleScroll = this.handleScroll.bind(this)
    this.handleActiveMenu = this.handleActiveMenu.bind(this)
  }
  componentWillMount () {
  }
  componentDidMount () {
    const positionMenu = document.getElementById('menu-contenedor').offsetTop
    this.setState({positionMenu})
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll (event) {
    const {positionMenu} = this.state
    const elementMenu = document.getElementById('menu-contenedor')
    if (window.pageYOffset >= parseInt(positionMenu - 10, 10, 10)) {
      elementMenu.style.position = 'fixed'
      elementMenu.style.top = '0px'
    } else {
      elementMenu.style.position = 'static'
    }
  }

  handleActiveMenu () {
    const {activeMenu, positionMenu} = this.state
    const elementMenu = document.getElementById('menu-contenedor')
    if (activeMenu && window.pageYOffset <= positionMenu) {
      elementMenu.style.position = 'static'
    } else {
      elementMenu.style.position = 'fixed'
      const actualPos = (window.pageYOffset >= positionMenu) ? 0 : parseInt(positionMenu - window.pageYOffset, 10)
      elementMenu.style.top = `${actualPos}px`
    }
    this.setState({activeMenu: !activeMenu})
  }
  optionsMarca (selectMarcas) {
    const options = Object.keys(selectMarcas).map((e) => {
      return (<option key={e} value={e}>{selectMarcas[e]}</option>)
    })
    return options
  }
  render () {
    const {activeMenu} = this.state
    return (
      <FiltersConsumer>
        {(context) => {
          const {filters, selectMarcas} = context
          return (
            <div className='menu-container' id='menu-contenedor'>
              <div className={'form-container ' + (activeMenu ? 'activeMenu' : '')}>
                <div className='first-section'>
                  <div className='select-content'>
                    <label> MARCA </label>
                    <div className='caja'>
                      <select name='marca' onChange={context.handleSelect} >
                        <option value='' />
                        {this.optionsMarca(selectMarcas)}
                      </select>
                    </div>
                  </div>
                  <div className='filter-box' >
                    <label> NIELSEN AREA </label>
                    <div className='box-radio-button'>
                      <div className={'radio-button large ' + (filters['F6'].includes(1) ? 'active' : '')} onClick={() => context.handlerCheckClick(1, 'F6')}>Area 1 - Pacifico</div>
                      <div className={'radio-button large ' + (filters['F6'].includes(2) ? 'active' : '')} onClick={() => context.handlerCheckClick(2, 'F6')}>Area 2 - Norte</div>
                      <div className={'radio-button large ' + (filters['F6'].includes(3) ? 'active' : '')} onClick={() => context.handlerCheckClick(3, 'F6')}>Area 3 - Bajio</div>
                    </div>
                    <div className='box-radio-button'>
                      <div className={'radio-button large ' + (filters['F6'].includes(4) ? 'active' : '')} onClick={() => context.handlerCheckClick(4, 'F6')}>Area 4 - Centro</div>
                      <div className={'radio-button large ' + (filters['F6'].includes(5) ? 'active' : '')} onClick={() => context.handlerCheckClick(5, 'F6')}>Area 5 - AMCM</div>
                      <div className={'radio-button large ' + (filters['F6'].includes(6) ? 'active' : '')} onClick={() => context.handlerCheckClick(6, 'F6')}>Area 6 - Sureste</div>
                    </div>
                  </div>
                </div>
                <div className='second-section' >
                  <div className='filter-box' >
                    <label>GENDER</label>
                    <div className='box-tree-button'>
                      <div className={'button ' + (filters['F4'] === '' ? 'active' : '')} onClick={e => context.handlerClick('', 'F4')}>TOTAL</div>
                      <div className={'button ' + (filters['F4'] === 2 ? 'active' : '')} onClick={e => context.handlerClick(2, 'F4')}>M</div>
                      <div className={'button ' + (filters['F4'] === 1 ? 'active' : '')} onClick={e => context.handlerClick(1, 'F4')}>H</div>
                    </div>
                  </div>
                  <div className='filter-box' >
                    <label>User</label>
                    <div className='box-two-button'>
                      <div className={'button ' + (filters['users'] !== 3 ? 'active' : '')} onClick={e => context.handlerClick(1, 'users')} >Merchant </div>
                      <div className={'button ' + (filters['users'] === 3 ? 'active' : '')} onClick={e => context.handlerClick(3, 'users')} >Final User</div>
                    </div>
                  </div>
                  <div className='filter-box' >
                    <label>AGE</label>
                    <div className='box-radio-button'>
                      <div className={'radio-button short ' + (filters['F5'].includes(1) ? 'active' : '')} onClick={() => context.handlerCheckClick(1, 'F5')}> 18-25 </div>
                      <div className={'radio-button short ' + (filters['F5'].includes(2) ? 'active' : '')} onClick={() => context.handlerCheckClick(2, 'F5')}> 26-35 </div>
                      <div className={'radio-button short ' + (filters['F5'].includes(3) ? 'active' : '')} onClick={() => context.handlerCheckClick(3, 'F5')}> 36-45</div>
                      <div className={'radio-button short ' + (filters['F5'].includes(4) ? 'active' : '')} onClick={() => context.handlerCheckClick(4, 'F5')}> >46</div>
                    </div>
                  </div>
                  <div className='filter-box' >
                    <label> SEL </label>
                    <div className='box-radio-button'>
                      <div className={'radio-button large ' + (filters['A1'].includes(1) ? 'active' : '')} onClick={() => context.handlerCheckClick(1, 'A1')}>ABC+</div>
                      <div className={'radio-button large ' + (filters['A1'].includes(2) ? 'active' : '')} onClick={() => context.handlerCheckClick(2, 'A1')}>C</div>
                      <div className={'radio-button large ' + (filters['A1'].includes(3) ? 'active' : '')} onClick={() => context.handlerCheckClick(3, 'A1')}>C-/D+</div>
                    </div>
                  </div>
                </div>
                <div className='third-section'>
                  <div className={'filter-box ' + (filters['users'] === 3 ? 'hidden' : '')} >
                    <label>Type Merchant</label>
                    <div className='box-two-button'>
                      <div className={'button ' + (filters['users'] === 1 ? 'active' : '')} onClick={e => context.handlerClick(1, 'users')} >Merchant User </div>
                      <div className={'button ' + (filters['users'] === 2 ? 'active' : '')} onClick={e => context.handlerClick(2, 'users')} >Merchant Non User</div>
                    </div>
                  </div>
                  <div className={'filter-box ' + (filters['users'] === 3 ? 'hidden' : '')} >
                    <label> Sample </label>
                    <div className='box-radio-button'>
                      <div className={'radio-button large ' + (filters['sample'].includes(1) ? 'active' : '')} onClick={() => context.handlerCheckClick(1, 'sample')}>Natural</div>
                      <div className={'radio-button large ' + (filters['sample'].includes(2) ? 'active' : '')} onClick={() => context.handlerCheckClick(2, 'sample')}>Booster</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='arrow' onClick={() => this.handleActiveMenu()} />
            </div>
          )
        }}
      </FiltersConsumer>
    )
  }
}

export default MenuFiltros
