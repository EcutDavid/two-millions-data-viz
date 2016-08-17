import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import 'font-awesome/css/font-awesome.min.css'
import 'normalize.css/normalize.css'
import 'styles/main.scss'

import Header from './Header'
import Footer from './Footer'
import Chart from './Chart'
import { loadServerStatus } from '../actions/statusActions'

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends React.Component {
  componentWillMount() {
    const { loadServerStatus } = this.props
    loadServerStatus()
  }

  render() {
    return (
      <div>
        <Header />
        <Chart />
        <Footer />
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    loadServerStatus
  }, dispatch)
}

function mapStateToProps(state) {
  const isLoding = state.status.get('isLoding')

  return { isLoding }
}
