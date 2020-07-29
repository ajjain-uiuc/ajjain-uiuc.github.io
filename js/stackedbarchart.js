function drawStackedBarChart(df, id, region, top, desc){
	var width = 1800;
	var height = 200;
	var margin = 100;
	
	df = df.filter(function(d, i){ 
		return d.region == region || region == 'World'; 
	});
	
	df.sort(function(b, a) {
		return desc ? a['score'] - b['score'] : b['score'] - a['score'];
	});
  
	 df = df.filter(function(d, i){ 
		return i<=top-1 ; 
	});
	
	var div = d3.select(id);
	var svgOld = div.select("svg").remove(); 
	var svg = div.append("svg")
		.attr("viewBox", `0 0 2000 300`);
	  
	var g = svg.append("g").attr("transform", "translate(" + margin + "," + 0 + ")");

	var xScale = d3.scaleBand()
		.rangeRound([0, width])
		.paddingInner(0.05)
		.align(0.1)
		.domain(df.map(function(d){ return d.country; }));
	
	var y_min = d3.min(df, function(d){return d.score || 0;});
	var y_max = d3.max(df, function(d){return d.score || 0;});
	var yScale = d3.scaleLinear()
		.domain([0, y_max])
		.rangeRound([height, 0]);	
	
	var keys = ["gdp", "social", "health", "freedom", "generosity", "corruption","dystopia"];
	var z = d3.scaleOrdinal()
		.range(d3.schemeCategory10)
		.domain(keys);

	df = df.sort(function(a, b) { return b.score - a.score; });
	
	g.append("g")
		.selectAll("g")
		.data(d3.stack().keys(keys)(df))
		.enter().append("g")
		  .attr("fill", function(d) { return z(d.key); })
		.selectAll("rect")
		.data(function(d) { return d; })
		.enter().append("rect")
		  .attr("x", function(d) { return xScale(d.data.country); })
		  .attr("y", function(d) { return yScale(d[1]); })
		  .attr("height", function(d) { return yScale(d[0]) - yScale(d[1]); })
		  .attr("width", xScale.bandwidth())
		.on("mouseover", function() { tooltip.style("display", null); })
		.on("mouseout", function() { tooltip.style("display", "none"); })
		.on("mousemove", function(d) {
		  var xPosition = d3.mouse(this)[0] - 5;
		  var yPosition = d3.mouse(this)[1] - 5;
		  tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
		  tooltip.select("text").text(d[1]-d[0]);
		});

  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale))
	  .selectAll('text')
		.attr("dx", "-.8em")
        .attr("dy", ".0em")
		.style("text-anchor", "end")
		.attr("class", "axis")
		.attr("transform", "rotate(-90)");

  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(yScale).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", yScale(yScale.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start");

  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });


  // Prep the tooltip bits, initial display is hidden
  var tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");
      
  tooltip.append("rect")
    .attr("width", 60)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", 0.5);

  tooltip.append("text")
    .attr("x", 30)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");
	
}