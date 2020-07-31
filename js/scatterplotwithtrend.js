function drawScatterPlotWithTrend(df, id, region, x, y, r, c){
  var div = d3.select(id);
 
  var width = 1200;
  var height = 500;
  var margin = 50;
  var svgOld = div.select("svg").remove(); 
  var svg = div.append("svg")
	  .attr("viewBox", `0 0 1200 500`)
    .append("g")
      .attr("transform", "translate("+margin+ "," + margin + ")");
	  
  df = df.filter(function(d, i){ 
  	return d.region == region || region == 'World'; 
  });

  var x_min = d3.min(df, function(d){return d[x] || 0;});
  var x_max = d3.max(df, function(d){return d[x] || 0;});
  var y_min = d3.min(df, function(d){return d[y] || 0;});
  var y_max = d3.max(df, function(d){return d[y] || 0;});
  var r_min = d3.min(df, function(d){return Math.abs(d[r]) || 0;});
  var r_max = d3.max(df, function(d){return Math.abs(d[r]) || 0;});


  var xScale = d3.scaleLinear()
    .domain([x_min, x_max])
	.range([0, width - 2*margin]);

  var yScale = d3.scaleLinear()
    .domain([y_min, y_max])
	.range([height - 2*margin, 0]);
  
  var rScale = d3.scaleSqrt()
    .domain([r_min, r_max])
	.range([1, 15]);

  svg.append("g")
    .attr("transform", "translate("+0+"," + (height - 2*margin) + ")")
    .call(d3.axisBottom(xScale));

  svg.append("g")
    .call(d3.axisLeft(yScale));
  
  svg.append("g").selectAll().data(df).enter().append("circle")
	  .attr("cx", function(d,i){
		  return xScale(d[x] || 0);})
	  .attr("cy", function(d,i){return yScale(0);})
	  .attr("r", function(d,i){return rScale(Math.abs(d[r]));})
	  .attr("fill", function(d){ return d[c] > 0 ? "#2E8B57" : "#B22222"; });

  svg.append("g").selectAll().data(df).enter().append("text")
	  .attr("x", function(d,i){return xScale(d[x] || 0);})
	  .attr("y", function(d,i){return yScale(d[y] || 0);})
	  .text(function(d){return Math.abs(d[r]) > 20 ? d.country+' '+(Math.floor(d[r] * 1000) / 1000)+'%' : '';});

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

  svg.selectAll("circle")
    .transition()
    .duration(800)
    .attr("cy", function(d,i){return yScale(d[y] || 0);})
    .delay(function(d,i){return(100)});

  
  svg.append('line')
    .style("stroke", "black")
    .style("stroke-width", 2)
    .attr("x1", xScale(Math.max(x_min, y_min)))
    .attr("y1", yScale(Math.max(x_min, y_min)))
    .attr("x2", xScale(Math.max(x_max, y_max)))
    .attr("y2", yScale(Math.max(x_max, y_max))); 
}