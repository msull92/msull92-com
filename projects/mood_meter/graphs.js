var svg, focus, data, x, y, xAxis, yAxis, dim, chartWrapper, line, path, margin = {}, width, height;

var weekday=new Array(7);
weekday[0]="Sunday";
weekday[1]="Monday";
weekday[2]="Tuesday";
weekday[3]="Wednesday";
weekday[4]="Thursday";
weekday[5]="Friday";
weekday[6]="Saturday";

d3.json("https://apps.msull92.com/data/mood/sentiment-by-hour", function(data) {
  data.forEach(function(d) {
    d.hour = parseInt(moment.tz({ hour: d.hour }, "UTC").tz('America/Chicago').format('H'), 10);
  });

  data = data.sort(function(a, b){
    return a.hour - b.hour;
  });

  hourInit(data)
});

d3.json("https://apps.msull92.com/data/mood/sentiment-by-day", function(data) {
  data = data.sort(function(a, b){
    return a.day - b.day;
  });

  dayInit(data)
});

//called once the data is parsed
function hourInit(data) {
  xExtent = d3.extent(data, function(d,i) { return d.hour });
  x = d3.scale.linear().domain(xExtent);
  y = d3.scale.linear().domain([-1,1]);

  //the path generator for the line chart
  line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.hour) })
    .y(function(d) { return y(d.average_sentiment) });

  //initialize svg
  svg = d3.select('#hour-graph').append('svg');
  chartWrapper = svg.append('g');
  path = chartWrapper.append('path').datum(data).classed('path', true);
  chartWrapper.append('g').classed('x axis', true);
  chartWrapper.append('g').classed('y axis', true);

  svg.append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
    .selectAll("stop")
      .data([
        {offset: "0%", color: "#e05252"},
        {offset: "50%", color: "#e5c07b"},
        {offset: "100%", color: "#98c379"}
      ])
    .enter().append("stop")
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; });

  //render the chart
  hourRender();
}

function dayInit(data) {
  xExtent = d3.extent(data, function(d,i) { return d.day });
  x = d3.scale.linear().domain(xExtent);
  y = d3.scale.linear().domain([-1,1]);

  //the path generator for the line chart
  line = d3.svg.line()
    .interpolate("basis")
    .x(function(d) { return x(d.day) })
    .y(function(d) { return y(d.average_sentiment) });

  //initialize svg
  svg = d3.select('#day-graph').append('svg');
  chartWrapper = svg.append('g');
  path = chartWrapper.append('path').datum(data).classed('path', true);
  chartWrapper.append('g').classed('x axis', true);
  chartWrapper.append('g').classed('y axis', true);

  svg.append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
    .selectAll("stop")
      .data([
        {offset: "0%", color: "#e05252"},
        {offset: "50%", color: "#e5c07b"},
        {offset: "100%", color: "#98c379"}
      ])
    .enter().append("stop")
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; });

  //render the chart
  dayRender();
}

function hourRender() {
  margin.top = 30;
  margin.right = 20;
  margin.left = 40;
  margin.bottom = 50;

  width = $("#hour-graph").width() - margin.left - margin.right;
  height = 270 - margin.top - margin.bottom;

  //initialize axis
  xAxis = d3.svg.axis().orient('bottom').ticks(6);
  yAxis = d3.svg.axis().orient('left').ticks(3).tickPadding(5).innerTickSize(-width).outerTickSize(0);

  //uphour x and y scales to new dimensions
  x.range([0, width]);
  y.range([height, 0]);

  //uphour svg elements to new dimensions
  svg
    .attr("class", "graph")
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom);
  chartWrapper.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  //uphour the axis and line
  xAxis.scale(x);
  yAxis.scale(y);

  svg.select('.x.axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  svg.select('.y.axis')
    .call(yAxis);

  svg.select("linearGradient")
      .attr("x1", 0).attr("y1", y(-1))
      .attr("x2", 0).attr("y2", y(1));

  path.attr('d', line);
}

function dayRender() {
  margin.top = 30;
  margin.right = 20;
  margin.left = 40;
  margin.bottom = 50;

  width = $("#day-graph").width() - margin.left - margin.right;
  height = 270 - margin.top - margin.bottom;

  //initialize axis
  xAxis = d3.svg.axis().orient('bottom').ticks(6);
  yAxis = d3.svg.axis().orient('left').ticks(3).tickPadding(5).innerTickSize(-width).outerTickSize(0);

  //uphour x and y scales to new dimensions
  x.range([0, width]);
  y.range([height, 0]);

  //uphour svg elements to new dimensions
  svg
    .attr("class", "graph")
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom);
  chartWrapper.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  //uphour the axis and line
  xAxis.scale(x).tickFormat(function(x) {
    return weekday[x];
  });
  yAxis.scale(y);

  svg.select('.x.axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  svg.select('.y.axis')
    .call(yAxis);

  svg.select("linearGradient")
      .attr("x1", 0).attr("y1", y(-1))
      .attr("x2", 0).attr("y2", y(1));

  path.attr('d', line);
}

window.addEventListener('resize', hourRender);
window.addEventListener('resize', dayRender);
