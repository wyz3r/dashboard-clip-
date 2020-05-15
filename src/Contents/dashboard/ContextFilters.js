import React, { Component } from 'react'

const AppContext = React.createContext('context-filters')

class ContextFilters extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filters: {
        'F4': '',
        users: 1,
        sample: [],
        'F5': [],
        'A1': [],
        'F6': [],
        marca: 2,
        area: ''
      },
      selectMarcas: {
        1: 'Terminal de Punto de entrada (TPV)',
        2: 'Clip',
        3: 'Mercado Pago',
        4: 'Sr. Pago',
        5: 'Billpocket',
        6: 'Izettle',
        7: 'NetPay',
        8: 'KiWi',
        9: 'Todito Pay',
        10: 'Brio'
      },
      sendFilters: this.sendFilters.bind(this),
      handlerClick: this.handlerClick.bind(this),
      handleSelect: this.handleSelect.bind(this),
      handlerCheckClick: this.handlerCheckClick.bind(this)
    }
  }

  sendFilters () {
    console.log(this.state.filters)
  }

  handlerClick (value, key) {
    const {filters} = this.state
    filters[key] = value
    this.setState({filters})
  }

  removeItem (index) {
    this.setState({
      data: this.state.data.filter((_, i) => i !== index)
    })
  }

  handlerCheckClick (value, key) {
    const {filters} = this.state
    if (filters[key].includes(value)) {
      filters[key] = filters[key].filter((val, i) => val !== value)
      this.setState({filters})
    } else {
      filters[key].push(value)
      this.setState({filters})
    }
  }
  handleSelect (e) {
    const {filters} = this.state
    filters[e.target.name] = e.target.value
    this.setState({
      filters
    })
  }

  render () {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}
export const FiltersProvider = ContextFilters
export const FiltersConsumer = AppContext.Consumer
