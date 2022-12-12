import { useEffect } from 'react';
import * as d3 from 'd3';

function LineChart({ data, width, height }) {

	const drawChart = () => {
		const margin = { top: 50, right: 50, bottom: 50, left: 50 };
		const yMinValue = d3.min(data, d => d.currScore);
		const yMaxValue = 50;
		const xMinValue = d3.min(data, d => d.quesNumber);
		const xMaxValue = d3.max(data, d => d.quesNumber);

		d3.select('#container')
			.select('svg')
			.remove();
		d3.select('#container')
			.select('.tooltip')
			.remove();

		const svg = d3
			.select('#container')
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`)
			.style("background-color", "#d3d3d3");
		const xScale = d3
			.scaleLinear()
			.domain([xMinValue, xMaxValue])
			.range([0, width]);
		const yScale = d3
			.scaleLinear()
			.range([height, 0])
			.domain([0, yMaxValue]);
		const line = d3
			.line()
			.x(d => xScale(d.quesNumber))
			.y(d => yScale(d.currScore))
			.curve(d3.curveMonotoneX);
		svg
			.append('g')
			.attr('class', 'grid')
			.attr('transform', `translate(0,${height})`)
			.call(
				d3.axisBottom(xScale)
					.tickSize(-height)
					.tickFormat(''),
			);
		svg
			.append('g')
			.attr('class', 'grid')
			.call(
				d3.axisLeft(yScale)
					.tickSize(-width)
					.tickFormat(''),
			);
		svg
			.append('g')
			.attr('class', 'x-axis')
			.attr('transform', `translate(0,${height})`)
			.call(d3.axisBottom().scale(xScale).tickSize(15));
		svg
			.append('g')
			.attr('class', 'y-axis')
			.call(d3.axisLeft(yScale));
		svg
			.append('path')
			.datum(data)
			.attr('fill', 'none')
			.attr('stroke', '#f6c3d0')
			.attr('stroke-width', 4)
			.attr('class', 'line')
			.attr('d', line);
	}

	useEffect(() => {
		drawChart();
	}, [data])

	return (
		<div id='container'></div>
	)
}

export default LineChart