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

  var voronoi = d3.voronoi()
	.x(function(d) { return xScale(d[x]); })
	.y(function(d) { return yScale(d[y]); })
	.extent([[0, 0], [width - 2*margin, height - 2*margin]]);

  var voronoiGroup = svg.append("g")
	.attr("class", "voronoi");

  svg.append("g")
    .attr("transform", "translate("+0+"," + (height - 2*margin) + ")")
    .call(d3.axisBottom(xScale));

  svg.append("g")
    .call(d3.axisLeft(yScale));
  
  var mouse_over_cb = null;
  if(x == 'freedom')  mouse_over_cb=mouseover_freedom;
  if(x == 'corruption') mouse_over_cb=mouseover_corruption;
  if(x == 'gdp') mouse_over_cb=mouseover_gdp;
  if(x == 'generosity') mouse_over_cb=mouseover_generosity;
  if(x == 'social') mouse_over_cb=mouseover_social;
  if(x == 'health') mouse_over_cb=mouseover_health;
  
  
  svg.append("g").selectAll().data(df).enter().append("circle")
	  .attr("cx", function(d,i){
		  return xScale(d[x] || 0);})
	  .attr("cy", function(d,i){return yScale(d[y] || 0);})
	  .attr("r", function(d,i){return rScale(d[r] || 1);})
	  .attr("fill", function (d) {return z(c);})
	  .on("mouseover", mouse_over_cb )
	  .on("mouseout", mouseout );

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

	voronoiGroup.selectAll("path")
		.data(voronoi(df).polygons())
		.enter().append("path")
			.attr("d", function(d) { 
				return d ? "M" + d.join("L") + "Z" : null; 
			})
			.datum(function(d, i) { 
				return d.data;
			})
			.on("mouseover", mouse_over_cb )
			.on("mouseout", mouseout )
	
	corr = correlation(df, x, y);
	corrData = [{'corr': corr}];
	
	svg.selectAll("summary")
         .data(corrData)
         .enter()
         .append("text")
			.attr("dx", 15)
			.attr("dy", 15)
			.attr("class", "textannotation")
			.attr("font-size", "12px")
			.text( function (d) { 
				return "Correlation Coefficient between "; 
			});
			
	svg.selectAll("variables")
         .data(corrData)
         .enter()
         .append("text")
			.attr("dx", 15)
			.attr("dy", 30)
			.attr("class", "textannotation")
			.attr("font-size", "12px")
			.text( function (d) { 
				return x+" and "+y + " is "; 
			});
	svg.selectAll("correlation")
         .data(corrData)
         .enter()
         .append("text")
			.attr("dx", 15)
			.attr("dy", 45)
			.attr("class", "textannotation")
			.attr("font-size", "12px")
			.text( function (d) { 
				return (Math.floor(d.corr * 1000) / 1000) + ' which represents a'; 
			});
	svg.selectAll("represents")
         .data(corrData)
         .enter()
         .append("text")
			.attr("dx", 15)
			.attr("dy", 60)
			.attr("class", "textannotation")
			.attr("font-size", "12px")
			.text( function (d) { 
				return  (Math.abs(d.corr) > 0.7 ? 'Strong' : (Math.abs(d.corr) > 0.4 ? 'Medium' : 'Weak')) + ' relationship' ; 
			});

}

function correlation(df, x, y){
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0,  sumY2 = 0;
  var length = df.length;
  for(var i=0; i<length; i++){
	  sumX += df[i][x];
      sumY += df[i][y];
      sumXY += df[i][x] * df[i][y];
      sumX2 += df[i][x] * df[i][x];
      sumY2 += df[i][y] * df[i][y];
  }
  return (length * sumXY - sumX * sumY) / Math.sqrt((length * sumX2 - sumX * sumX) * (length * sumY2 - sumY * sumY));
};