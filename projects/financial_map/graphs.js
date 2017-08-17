var svg, focus, last_6mo_data, first_6mo_data, second_6mo_data, x, y, xAxis, yAxis, dim, chartWrapper, line, last_6mo_path, first_6mo_path, second_6mo_path, margin = {}, width, height;

// Parse the date / time
var	parseDate = d3.time.format("%m/%d/%y").parse,
    bisectDate = d3.bisector(function(d) { return d.Date; }).left,
    formatValue = d3.format(".3s"),
    formatCurrency = function(d) { return  formatValue(d); };

var q = d3.queue();
["last_6mo.csv", "first_6mo.csv", "second_6mo.csv"].forEach(function(d) {
  //add your csv call to the queue
  q.defer(function(callback) {
    d3.csv(d, function(data) {
      data.forEach(function(d) {
        d.Date = parseDate(d.Date);
        d.Balance = d.Balance.replace(/,/g, '').replace(/\$/g, '');
        if(d.Balance.includes("(")) {
          d.Balance = parseFloat(d.Balance.replace(/\(/g, '').replace(/\)/g, '')) * -1.0;
        } else {
          d.Balance = parseFloat(d.Balance);
        }
      });

      callback(null, data)
    });
  });
});

q.awaitAll(init)

//called once the data is parsed
function init(err, results) {
  last_6mo_data = results[0];
  first_6mo_data = results[1];
  second_6mo_data = results[2];

  //initialize scales
  xExtent = d3.extent(last_6mo_data.concat(first_6mo_data).concat(second_6mo_data), function(d,i) { return d.Date });
  yExtent = d3.extent(last_6mo_data.concat(first_6mo_data).concat(second_6mo_data), function(d,i) { return d.Balance });
  x = d3.time.scale().domain(xExtent);
  y = d3.scale.linear().domain([yExtent[0] - 5000, yExtent[1] + 5000]);

  //the path generator for the line chart
  line = d3.svg.line()
    .x(function(d) { return x(d.Date) })
    .y(function(d) { return y(d.Balance) });

  //initialize svg
  svg = d3.select('#graphs').append('svg');
  chartWrapper = svg.append('g');
  last_6mo_path = chartWrapper.append('path').datum(last_6mo_data).classed('path last_6mo', true);
  first_6mo_path = chartWrapper.append('path').datum(first_6mo_data).classed('path first_6mo', true);
  second_6mo_path = chartWrapper.append('path').datum(second_6mo_data).classed('path second_6mo', true);
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

  focus = svg.append("g")
    .attr("class", "focus")
    .style("display", "none");

  focus.append("circle")
      .attr("r", 2.5)
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  focus.append("text")
      .attr("class", "hover-text")
      .attr("x", 5)
      .attr("y", -5)
      .attr("dx", 10)
      .attr("dy", 10)
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + '), rotate(-45)');

  svg.append("rect")
    .attr("class", "overlay")
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('width', width)
    .attr('height', height)
    .on("mouseover", function() { focus.style("display", null); })
    .on("mouseout", function() { focus.style("display", "none"); })
    .on("mousemove", mousemove);

  last_6mo_path.attr('d', line);
  first_6mo_path.attr('d', line);
  second_6mo_path.attr('d', line);
}

function mousemove() {
  data = last_6mo_data.concat(second_6mo_data);
  var x0 = x.invert(d3.mouse(this)[0]),
      i = bisectDate(data, x0, 1),
      d0 = data[i - 1],
      d1 = data[i],
      d = x0 - d0.Date > d1.Date - x0 ? d1 : d0;
  focus.attr("transform", "translate(" + x(d.Date) + "," + y(d.Balance) + ")");
  focus.select("text").text(formatCurrency(d.Balance));
}

window.addEventListener('resize', render);
