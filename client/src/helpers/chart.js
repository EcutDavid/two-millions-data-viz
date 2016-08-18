import d3 from 'd3'

import { formatDate } from './dateFormat'

const xScale = d3.scale.linear().domain([0, 100]).range([0, 460])

const xLeftPadding = 32
const yTopPadding = 15

export function initChart(data, startHour) {
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
        .duration(500)
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
