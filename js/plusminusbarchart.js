function drawPlusMinusBarChart(df, id, x, y, region){

  df = df.filter(function(d, i){ 
	return (d.region == region || region == 'World') && d[y]; 
  });
  
  df.sort(function(b, a) {
    return b[y] - a[y];
  });

  var lookup = d3.map();
  df.forEach(function(d) {
	lookup.set(d[x], d[y]);
  });
  
  var div = d3.select(id);
 
  var svgOld = div.select("svg").remove(); 
  
  var width = 1800;
  var height = 400;
  var margin = 150;

  var svg = div.append("svg")
	  .attr("viewBox", `0 0 1800 700`);



  var y_min = d3.min(df, function(d){return d[y] || 0;});
  var y_max = d3.max(df, function(d){return d[y] || 0;});

  var yScale = d3.scaleLinear()
				 .domain([0, y_max])
				 .range([0, height]);

  var yAxisScale = d3.scaleLinear()
					 .domain([y_min, y_max])
					 .range([height - yScale(y_min), 0 ]);

  
  var xScale = d3.scaleBand()
    .range([margin, width-margin])
    .domain(df.map(function(d){ return d[x]; }))
    .padding(0.2);
	
  svg.selectAll("rect")
    .data(df)
    .enter()
    .append("rect")
      .attr("x", function(d, i) { return xScale(d[x]); })
      .attr("y", function(d, i) { return height - Math.max(0, yScale(d[y])); })
      .attr("width",  xScale.bandwidth())
      .attr("height", function(d) {return Math.abs(yScale(d[y])); })
      .attr("fill", function(d){ return d[y] > 0 ? "#2E8B57" : "#B22222"; });

  var yAxis = d3.axisLeft(yAxisScale);

  var g = svg.append('g')
	.attr('transform', function(d) {
	  return 'translate(' + margin+ ', 0)';
	})
	.call(yAxis);

  svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
	  .selectAll('text')
		.attr("dx", function(d, i){ return i%2 == 0 ? (lookup.get(d) > 0 ? "-.8em" : "+.8em") : (lookup.get(d) > 0 ? "-5em" : "+5em") ;})
        .attr("dy", ".0em")
		.style("text-anchor", function(d){ return lookup.get(d) > 0 ? "end" : "start";})
		.attr("class", "axis")
		.attr("transform", "rotate(-90)");
}