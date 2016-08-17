import d3 from 'd3'
import React from 'react'
import { connect } from 'react-redux'

import 'styles/chart.scss'

// TODO replace these [0, 90], [0, 100] with real data
const xScale = d3.scale.linear().domain([0, 100]).range([0, 460])

const yAxisScale = d3.scale.linear().domain([0, 100]).range([360, 0])

const xLeftPadding = 32
const yTopPadding = 15

const initChart = (data) => {
  const yScale = d3.scale.linear().domain([0, d3.max(data)]).range([0, 460])
  const svgArea = document.querySelector('.Chart svg')
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
      d3.select(this)
      .attr('fill', '#03336B')
    })
    .on('mouseout', function() {
      d3.select(this)
      .attr('fill', '#4A90E2')
    })

  const xAxis = d3.svg.axis()
    .orient('bottom')
    .scale(xScale)
    d3.select(svgArea)
    .append('g')
    .call(xAxis)
    .attr({
      id: 'xAxis',
      transform: `translate(${xLeftPadding}, ${360 + yTopPadding})`,
      fill: 'none',
      stroke: 'black'
    })

  const yAxis = d3.svg.axis()
    .orient('left')
    .scale(yAxisScale)
    // .tickValues(data)

  d3.select(svgArea)
    .append('g')
    .call(yAxis)
    .attr({
      id: 'yAxis',
      transform: `translate(${xLeftPadding}, ${yTopPadding})`,
      fill: 'none',
      stroke: 'black'
    })
}

@connect(mapStateToProps)
export default class Chart extends React.Component {
  componentWillUpdate(props) {
    const { data } = props
    if(data) initChart(data)
  }

  render() {
    return (
      <div className='Chart'>
        <svg />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const data = state.data.get('data')
  const isLoding = state.status.get('isLoding')

  return {
    data,
    isLoding
  }
}
