var svg, data, x, y, xAxis, yAxis, dim, chartWrapper, line, path, margin = {}, width, height;

d3.csv('data.csv', init); //load data, then initialize chart

//called once the data is loaded
function init(csv) {
  data = csv;
  // Parse the date / time
  var	parseDate = d3.time.format("%m/%d/%y").parse;

  data.forEach(function(d) {
		d.Date = parseDate(d.Date);
		d.Balance = d.Balance.replace(/,/g, '').replace(/\$/g, '');
    if(d.Balance.includes("(")) {
      d.Balance = parseFloat(d.Balance.replace(/\(/g, '').replace(/\)/g, '')) * -1.0;
    } else {
      d.Balance = parseFloat(d.Balance);
    }
	});

  //initialize scales
  xExtent = d3.extent(data, function(d,i) { return new Date(d.Date) });
  x = d3.time.scale().domain(xExtent);
  y = d3.scale.linear().domain([d3.min(data, function(d) { return d.Balance; }) - 15000, d3.max(data, function(d) { return d.Balance; }) + 15000]);

  //the path generator for the line chart
  line = d3.svg.line()
    .x(function(d) { return x(d.Date) })
    .y(function(d) { return y(d.Balance) });

  //initialize svg
  svg = d3.select('#graphs').append('svg');
  chartWrapper = svg.append('g');
  path = chartWrapper.append('path').datum(data).classed('path', true);
  chartWrapper.append('g').classed('x axis', true);
  chartWrapper.append('g').classed('y axis', true);

  //render the chart
  render();
}

function render() {
  margin.top = 30;
  margin.right = 20;
  margin.left = 40;
  margin.bottom = 50;

  width = $("#graphs").width() - margin.left - margin.right;
  height = 270 - margin.top - margin.bottom;

  //initialize axis
  xAxis = d3.svg.axis().orient('bottom').ticks(6);
  yAxis = d3.svg.axis().orient('left').ticks(3).tickPadding(5).innerTickSize(-width).outerTickSize(0);

  //update x and y scales to new dimensions
  x.range([0, width]);
  y.range([height, 0]);

  //update svg elements to new dimensions
  svg
    .attr("class", "graph")
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom);
  chartWrapper.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  //update the axis and line
  xAxis.scale(x);
  yAxis.scale(y);

  svg.select('.x.axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  svg.select('.y.axis')
    .call(yAxis);

  path.attr('d', line);
}

window.addEventListener('resize', render);
