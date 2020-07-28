function drawScatterPlot(df, id, region, x, y, r, c){
  var div = d3.select(id);
 
  var width = 400;
  var height = 400;
  var margin = 50;
  var svgOld = div.select("svg").remove(); 
  var svg = div.append("svg")
	  .attr("viewBox", `0 0 400 400`)
    .append("g")
      .attr("transform", "translate("+margin+ "," + margin + ")");
	  
  df = df.filter(function(d, i){ 
  	return d.region == region || region == 'World'; 
  });

  var x_min = d3.min(df, function(d){return d[x] || 0;});
  var x_max = d3.max(df, function(d){return d[x] || 0;});
  var y_min = d3.min(df, function(d){return d[y] || 0;});
  var y_max = d3.max(df, function(d){return d[y] || 0;});
  var r_min = d3.min(df, function(d){return d[r] || 0;});
  var r_max = d3.max(df, function(d){return d[r] || 0;});
  var c_min = d3.min(df, function(d){return d[c] || 0;});
  var c_max = d3.max(df, function(d){return d[c] || 0;});

  var keys = ["gdp", "social", "health", "freedom", "generosity", "corruption","dystopia"];
  var z = d3.scaleOrdinal()
	.range(d3.schemeCategory10)
	.domain(keys);
		
  var xScale = d3.scaleLinear()
    .domain([x_min, x_max])
	.range([0, width - 2*margin]);

  var yScale = d3.scaleLinear()
    .domain([y_min, y_max])
	.range([height - 2*margin, 0]);
  
  var rScale = d3.scaleSqrt()
    .domain([r_min + 1, r_max])
	.range([1, 20]);

  var colorScale = d3.scaleSequential()
    .domain([c_min, c_max])
    .interpolator(d3.interpolateViridis);;

  svg.append("g")
    .attr("transform", "translate("+0+"," + (height - 2*margin) + ")")
    .call(d3.axisBottom(xScale));

  svg.append("g")
    .call(d3.axisLeft(yScale));
  
  svg.append("g").selectAll().data(df).enter().append("circle")
	  .attr("cx", function(d,i){
		  return xScale(d[x] || 0);})
	  .attr("cy", function(d,i){return yScale(d[y] || 0);})
	  .attr("r", function(d,i){return rScale(d[r] || 1);})
	  .attr("fill", function (d) {return z(c);});

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", margin*-1)
    .attr("x",0 - ((height - 2*margin) / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(y);
	
  svg.append("text")             
      .attr("transform", "translate(" + ((width - 2*margin)/2) + " ," + 
                           (height - margin - 20) + ")")
      .style("text-anchor", "middle")
      .text(x);
}