import d3 from 'd3'

import 'styles/chart.scss'

const data = []
for (let i = 0; i < 90; i++) {
  data.push(Number.parseInt(Math.random() * 100))
}

// TODO replace these [0, 90], [0, 100] with real data
const xScale = d3.scale.linear().domain([0, 90]).range([0, 360])
const yScale = d3.scale.linear().domain([0, 100]).range([0, 360])
const yAxisScale = d3.scale.linear().domain([0, 100]).range([360, 0])

const xLeftPadding = 32
const yTopPadding = 15

const initChart = () => {
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

import React from 'react'

export default class Chart extends React.Component {
  componentDidMount() {
    initChart()
  }

  render() {
    return (
      <div className='Chart'>
        <svg />
      </div>
    )
  }
}
