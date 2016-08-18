import React from 'react'
import { connect } from 'react-redux'

import LoadingIndicator from './LoadingIndicator'
import { initChart } from '../helpers/chart'

import 'styles/chart.scss'

@connect(mapStateToProps)
export default class Chart extends React.Component {
  componentWillUpdate(props) {
    const { data, isLoding, startHour } = props
    if(data && !isLoding) initChart(data, startHour)
  }

  render() {
    const { data, isLoding, startHour } = this.props
    if(data) initChart(data, startHour)

    return (
      <div className='Chart'>
        { isLoding && <LoadingIndicator /> }
        <svg />
        <div className='tooltip'>
          <p className='time' />
          <p className='number' />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const data = state.data.get('data')
  const isLoding = state.status.get('isLoding')
  const startHour = state.data.get('start')

  return {
    data,
    isLoding,
    startHour
  }
}
