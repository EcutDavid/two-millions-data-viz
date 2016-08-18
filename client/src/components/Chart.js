import d3 from 'd3'
import React from 'react'
import { connect } from 'react-redux'

import { formatDate } from '../helpers/dateFormat'

import 'styles/chart.scss'

const xScale = d3.scale.linear().domain([0, 100]).range([0, 460])

const xLeftPadding = 32
const yTopPadding = 15

const initChart = (data, startHour) => {
  const yScale = d3.scale.linear().domain([0, d3.max(data)]).range([0, 460])
  const svgArea = document.querySelector('.Chart svg')
  const tooltip = d3.select('.Chart .tooltip')

  d3.select(svgArea).selectAll('rect')
    .attr({
      height: d => yScale(d),
      width: 4,
      x: (_, i) => xScale(i) + xLeftPadding,
      y: d => 360 - yScale(d) + yTopPadding,
      fill: '#4A90E2'
    })
    .on('mouseenter', function(d, i) {
      d3.select('.Chart .tooltip .time')
        .text(formatDate(startHour + i))
      d3.select('.Chart .tooltip .number')
        .text(d)
      tooltip
        .transition()
        .style('opacity', 0.7)
    })

  d3.select(svgArea).selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr({
      height: d => yScale(d),
      width: 4,
      x: (_, i) => xScale(i) + xLeftPadding,
      y: d => 360 - yScale(d) + yTopPadding,
      fill: '#4A90E2'
    })
    //Impletation of the :hover
    .on('mouseover', function() {
      d3.select(this).attr('fill', '#03336B')
    })
    .on('mouseout', function() {
      d3.select(this)
        .attr('fill', '#4A90E2')
      tooltip
        .transition()
        .duration(2000)
        .style('opacity', '0')
    })
    .on('mouseenter', function(d, i) {
      d3.select('.Chart .tooltip .time')
        .text(formatDate(startHour + i))
      d3.select('.Chart .tooltip .number')
        .text(d)
      tooltip
        .transition()
        .style('opacity', 0.7)
    })
    .on('mousemove', () => {
      const point = d3.mouse(svgArea)
      tooltip.style('left', `${point[0] - 80}px`)
      tooltip.style('top', `${12 + point[1]}px`)
    })
}

@connect(mapStateToProps)
export default class Chart extends React.Component {
  componentWillUpdate(props) {
    const { data, startHour } = props
    if(data) initChart(data, startHour)
  }

  render() {
    const { data, startHour } = this.props
    if(data) initChart(data, startHour)

    return (
      <div className='Chart'>
        <svg />
        <div className='tooltip'>
          <p className='time'>26, July, 7AM</p>
          <p className='number'>2452473800</p>
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
