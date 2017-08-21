var margin = {
      top: 75,
      right: 0,
      bottom: 10,
      left: 75
    },
    width,
    height,
    group_colors = [
      "#e05252",
      "#e5c07b",
      "#98c379"
    ],
    orders,
    svg,
    t,
    matrix,
    nodes,
    n,
    row,
    column,
    timeout,
    x,
    z,
    c;

init();

function setWidthAndHeight() {
  width = $("#graphs").width() - margin.top;
  height = width;
}

function setXZC() {
  x = d3.scale.ordinal().rangeBands([0, width]),
  z = d3.scale.linear().domain([0, 4]).clamp(true),
  c = d3.scale.category10().domain(d3.range(10));
}

function init() {
  setWidthAndHeight();
  setXZC();

  svg = d3.select("#graphs")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height);

  render();
}

function order(value) {
  x.domain(orders[value]);

  t = svg.transition().duration(2500);

  t.selectAll(".row")
      .delay(function(d, i) { return x(i) * 4; })
      .attr("transform", function(d, i) { return "translate(0," + x(i) + ")"; })
    .selectAll(".cell")
      .delay(function(d) { return x(d.x) * 4; })
      .attr("x", function(d) { return x(d.x); });

  t.selectAll(".column")
      .delay(function(d, i) { return x(i) * 4; })
      .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });
}

function render() {
  d3.json("http://apps.msull92.com/data/mood-matrix-generator/co-occurrence-map.json", function(data) {
    matrix = [],
    nodes = data.nodes,
    n = nodes.length;

    // Compute index per node.
    nodes.forEach(function(node, i) {
      node.index = i;
      node.count = 0;
      matrix[i] = d3.range(n).map(function(j) { return {x: j, y: i, z: 0}; });
    });

    // Convert links to matrix; count character occurrences.
    data.links.forEach(function(link) {
      matrix[link.source][link.target].z += link.frequency;
      matrix[link.target][link.source].z += link.frequency;
      matrix[link.source][link.source].z += link.frequency;
      matrix[link.target][link.target].z += link.frequency;
      nodes[link.source].count += link.frequency;
      nodes[link.target].count += link.frequency;
    });

    // Precompute the orders.
    orders = {
      name: d3.range(n).sort(function(a, b) { return d3.ascending(nodes[a].name, nodes[b].name); }),
      count: d3.range(n).sort(function(a, b) { return nodes[b].count - nodes[a].count; }),
      group: d3.range(n).sort(function(a, b) { return nodes[b].group - nodes[a].group; })
    };

    // The default sort order.
    x.domain(orders.name);

    row = svg.selectAll(".row")
        .data(matrix)
        .enter()
        .append("g")
        .attr("class", "row")
        .attr("transform", function(d, i) { return "translate(0," + x(i) + ")"; })
        .each(row);

    row.append("line")
        .attr("x2", width);

    row.append("text")
        .attr("x", -6)
        .attr("y", x.rangeBand() / 2)
        .attr("dy", ".32em")
        .attr("text-anchor", "end")
        .text(function(d, i) { return nodes[i].name; });

    column = svg.selectAll(".column")
        .data(matrix)
        .enter()
        .append("g")
        .attr("class", "column")
        .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });

    column.append("line")
        .attr("x1", -width);

    column.append("text")
        .attr("x", 6)
        .attr("y", x.rangeBand() / 2)
        .attr("dy", ".32em")
        .attr("text-anchor", "start")
        .text(function(d, i) { return nodes[i].name; });
  });
}

function row(row) {
  d3.select(this)
    .selectAll(".cell")
    .data(row.filter(function(d) { return d.z; }))
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("x", function(d) { return x(d.x); })
    .attr("width", x.rangeBand())
    .attr("height", x.rangeBand())
    .style("fill-opacity", function(d) { return z(d.z); })
    .style("fill", function(d) { return nodes[d.x].group == nodes[d.y].group ? group_colors[nodes[d.x].group] : null; })
    .on("mouseover", mouseover)
    .on("mouseout", mouseout);
}

function updateRow(row) {
  d3.select(this)
    .selectAll(".cell")
    .attr("x", function(d) { return x(d.x); })
    .attr("width", x.rangeBand())
    .attr("height", x.rangeBand());
}

function mouseover(p) {
  d3.selectAll(".row text").classed("active", function(d, i) { return i == p.y; });
  d3.selectAll(".column text").classed("active", function(d, i) { return i == p.x; });
}

function mouseout() {
  d3.selectAll("text").classed("active", false);
}

d3.select("#order").on("change", function() {
  clearTimeout(timeout);
  order(this.value);
});

timeout = setTimeout(function() {
  order("group");
  d3.select("#order").property("selectedIndex", 2).node().focus();
}, 5000);

function refresh() {
  location.reload();
}

window.addEventListener('resize', refresh);
