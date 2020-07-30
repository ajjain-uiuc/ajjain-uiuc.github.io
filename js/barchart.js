function drawBarChart(df, id, x, y, c, desc, top,xlabel=true, region){
  if(region == 'World') top = 50;  
  
  df.sort(function(b, a) {
    return desc ? a[y] - b[y] : b[y] - a[y];
  });
    
  var div = d3.select(id);
 
  var svgOld = div.select("svg").remove(); 
  
  var width = 800;
  var height = 250;
  var margin = 50;

  var svg = div.append("svg")
	  .attr("viewBox", `0 0 800 300`)
    .append("g")
      .attr("transform", "translate("+margin+ "," + margin + ")");


  var c_min = d3.min(df, function(d){return d[c] || 0;});
  var c_max = d3.max(df, function(d){return d[c] || 0;});

  var colorScale = d3.scaleSequential()
    .domain([c_min, c_max])
    .interpolator(d3.interpolateViridis);

  
  df = df.filter(function(d, i){ 
	return d.region == region || region == 'World'; 
  });

  var y_min = d3.min(df, function(d){return d[y] || 0;});
  var y_max = d3.max(df, function(d){return d[y] || 0;});

  var yScale = d3.scaleLinear()
    .domain([y_min - 1, y_max])
	.range([height - 2*margin, 0]);

  svg.append("g")
    .call(d3.axisLeft(yScale));
  
  df = df.filter(function(d, i){ 
	return i<=top && i < df.length/2; 
  });

  var xScale = d3.scaleBand()
    .range([0, width - 2*margin])
    .domain(df.map(function(d){ return d[x]; }))
    .padding(0.2);
  
  svg.append("g")
    .attr("transform", "translate("+0+"," + (height - 2*margin) + ")")
    .call(d3.axisBottom(xScale))
	.selectAll("text")	
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

  svg.append("g").selectAll()
    .data(df)
    .enter()
    .append("rect")
      .attr("x", function(d) { return xScale(d[x]); })
      .attr("y", function(d) { return yScale(d[y]); })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) { 
		return height - (2*margin) - yScale(d[y]); 
	  })
      .attr("fill", function(d){
		return colorScale(d[c]);
	  })
	  .on("mousemove", mouseover_overview)
	  .on("mouseout", mouseout);

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", margin*-1)
    .attr("x",0 - ((height - 2*margin) / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text(y);
  
  if(xlabel){
    svg.append("text")             
        .attr("transform", "translate(" + ((width - 2*margin)/2) + " ," + 
                             (height - margin - 10) + ")")
        .style("text-anchor", "middle")
        .text(x);
  }
}