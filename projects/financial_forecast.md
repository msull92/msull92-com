---
layout: page
title: "Financial Forecast"
---

This is an analytical representation of my finances.
I have gotten a new bug to work on becoming debt-free, so this will chronicle that journey through different visualizations.
I'll do my best to keep this updated with new data.

#### 2017 Forecast
This graph shows the year of 2017 with past and forecasted total account values.

<div id="graphs"></div>

<style>
#graphs {
  font-family: "Fira Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: center;
}

.graph .axis {
    fill: #6F7783;
    font-size: 11px;
}
.graph .axis line,
.graph .axis path {
    stroke-width: hairline;
    fill: none;
    stroke: #6F7783;
    shape-rendering: crispEdges
}
.graph path.path {
    stroke: #4B515D;
    stroke-width: 2px;
    stroke-opacity: 1;
    fill: none
}

g.axis.y path.domain {
  display: none;
}

g.axis path.domain {
  opacity: 0.2;
}

g.axis line {
  opacity: 0.2;
}
</style>

<script src="http://d3js.org/d3.v3.min.js"></script>

<script>
  // Set the dimensions of the canvas / graph
  var	margin = {top: 30, right: 20, bottom: 30, left: 50},
  	width = 600 - margin.left - margin.right,
  	height = 270 - margin.top - margin.bottom;

  // Parse the date / time
  var	parseDate = d3.time.format("%m/%d/%y").parse;

  // Set the ranges
  var	x = d3.time.scale().range([0, width]);
  var	y = d3.scale.linear().range([height, 0]);

  // Define the axes
  var	xAxis = d3.svg.axis().scale(x)
  	.orient("bottom").ticks(6);

  var	yAxis = d3.svg.axis().scale(y)
  	.orient("left").ticks(3).tickPadding(5)
    .innerTickSize(-width)
    .outerTickSize(0);

  // Define the line
  var	valueline = d3.svg.line()
  	.x(function(d) { return x(d.Date); })
  	.y(function(d) { return y(d.Balance); });

  // Adds the svg canvas
  var	svg = d3.select("#graphs")
  	.append("svg")
      .attr("class", "graph")
  		.attr("width", width + margin.left + margin.right)
  		.attr("height", height + margin.top + margin.bottom)
  	.append("g")
  		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Get the data
  d3.csv("data.csv", function(error, data) {
  	data.forEach(function(d) {
  		d.Date = parseDate(d.Date);
  		d.Balance = d.Balance.replace(/,/g, '').replace(/\$/g, '');
      if(d.Balance.includes("(")) {
        d.Balance = parseFloat(d.Balance.replace(/\(/g, '').replace(/\)/g, '')) * -1.0;
      } else {
        d.Balance = parseFloat(d.Balance);
      }
  	});

  	// Scale the range of the data
  	x.domain(d3.extent(data, function(d) { return d.Date; }));
  	y.domain([d3.min(data, function(d) { return d.Balance; }) - 15000, d3.max(data, function(d) { return d.Balance; }) + 15000]);

  	// Add the valueline path.
  	svg.append("path")
  		.attr("class", "path")
  		.attr("d", valueline(data));

  	// Add the X Axis
  	svg.append("g")
  		.attr("class", "x axis")
  		.attr("transform", "translate(0," + height + ")")
  		.call(xAxis);

  	// Add the Y Axis
  	svg.append("g")
  		.attr("class", "y axis")
  		.call(yAxis);

  });
</script>
