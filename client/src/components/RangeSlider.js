import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import ReactSlider from 'react-slider'
import { connect } from 'react-redux'

import { formatDate } from '../helpers/dateFormat'

import 'styles/slider.scss'

@connect(mapStateToProps)
export default class RangeSlider extends Component {
  constructor() {
    super()
    this.state = {
      start: 0,
      end: 100
    }
  }

  afterInputChange(res) {
    const { start, end } = this.state
    if(res[1] - res[0] > 100) {
      if(res[0] < start) res[0] = start
      if(res[1] > end) res[1] = end
    }
    if ((res[0] !== start) || (res[1] !== end)) {
    }
    this.setState({ start: res[0], end: res[1] })
  }

  render() {
    const { start, end } = this.state
    const { end: endHour, start: startHour } = this.props

    return (
      <div className='Range'>
        <ReactSlider
          className='reactSlider'
          max={1000}
          min={0}
          minDistance={100}
          step={1}
          value={[start, end]}
          withBars
          pearling
          onAfterChange={e => this.afterInputChange(e)}
        />
        <p>First data point: { formatDate(startHour) }</p>
        <p>Last data point: { formatDate(startHour + 101) }</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const end = state.data.get('end')
  const start = state.data.get('start')

  return { end, start }
}
