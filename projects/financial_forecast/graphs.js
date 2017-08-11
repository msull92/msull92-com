var svg, last_6mo_data, next_6mo_data, x, y, xAxis, yAxis, dim, chartWrapper, line, line2, last_6mo_path, next_6mo_path, margin = {}, width, height;

// Parse the date / time
var	parseDate = d3.time.format("%m/%d/%y").parse;

d3.csv('last_6mo.csv', function(data) {
  last_6mo_data = data;

  last_6mo_data.forEach(function(d) {
    d.Date = parseDate(d.Date);
    d.Balance = d.Balance.replace(/,/g, '').replace(/\$/g, '');
    if(d.Balance.includes("(")) {
      d.Balance = parseFloat(d.Balance.replace(/\(/g, '').replace(/\)/g, '')) * -1.0;
    } else {
      d.Balance = parseFloat(d.Balance);
    }
  });

  d3.csv('next_6mo.csv', function(data) {
    next_6mo_data = data;

    next_6mo_data.forEach(function(d) {
      d.Date = parseDate(d.Date);
      d.Balance = d.Balance.replace(/,/g, '').replace(/\$/g, '');
      if(d.Balance.includes("(")) {
        d.Balance = parseFloat(d.Balance.replace(/\(/g, '').replace(/\)/g, '')) * -1.0;
      } else {
        d.Balance = parseFloat(d.Balance);
      }
    });

    init();
  });
});

//called once the data is parsed
function init() {
  //initialize scales
  xExtent = d3.extent(last_6mo_data.concat(next_6mo_data), function(d,i) { return d.Date });
  x = d3.time.scale().domain(xExtent);
  y = d3.scale.linear().domain([d3.min(last_6mo_data, function(d) { return d.Balance; }) - 10000, d3.max(next_6mo_data, function(d) { return d.Balance; }) + 10000]);

  //the path generator for the line chart
  line = d3.svg.line()
    .x(function(d) { return x(d.Date) })
    .y(function(d) { return y(d.Balance) });

  //initialize svg
  svg = d3.select('#graphs').append('svg');
  chartWrapper = svg.append('g');
  last_6mo_path = chartWrapper.append('path').datum(last_6mo_data).classed('path last_6mo', true);
  next_6mo_path = chartWrapper.append('path').datum(next_6mo_data).classed('path next_6mo', true);
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

  last_6mo_path.attr('d', line);
  next_6mo_path.attr('d', line);
}

window.addEventListener('resize', render);
