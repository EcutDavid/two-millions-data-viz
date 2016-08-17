import React, { Component } from 'react'
import ReactSlider from 'react-slider'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { formatDate } from '../helpers/dateFormat'
import { pullDataInHourLevel } from '../actions/dataAction'

import 'styles/slider.scss'

const RANGE = 100

@connect(mapStateToProps, mapDispatchToProps)
export default class RangeSlider extends Component {
  constructor() {
    super()
    this.state = {
      start: 0,
      end: RANGE
    }
  }

  afterInputChange(res) {
    const { start, end } = this.state
    const { pullDataInHourLevel, startHour } = this.props
    if(res[1] - res[0] > RANGE) {
      if(res[0] < start) res[1] = res[0] + RANGE
      if(res[1] > end) res[0] = res[1] - RANGE
    }
    if ((res[0] !== start) || (res[1] !== end)) {
      pullDataInHourLevel(startHour + res[0], startHour + res[1])
    }
    this.setState({ start: res[0], end: res[1] })
  }

  render() {
    const { start, end } = this.state
    const { rangeMax, start: startHour } = this.props

    return (
      <div className='Range'>
        <ReactSlider
          className='reactSlider'
          max={rangeMax ? rangeMax : 1000}
          min={0}
          minDistance={RANGE}
          step={1}
          value={[start, end]}
          withBars
          pearling
          onAfterChange={e => this.afterInputChange(e)}
        />
        <p>First data point: { formatDate(startHour) }</p>
        <p>Last data point: { formatDate(startHour + RANGE) }</p>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    pullDataInHourLevel
  }, dispatch)
}

function mapStateToProps(state) {
  const start = state.data.get('start')
  const startHour = state.status.get('startHour')
  const endHour = state.status.get('endHour')
  const rangeMax = endHour - startHour

  return { rangeMax, startHour, start }
}
