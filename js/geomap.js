function drawMap(id, region, topo, df) {
  var center;
  switch (region){
	  case 'World': zoom = 100; center = [0,50]; break;
	  case 'Western Europe': zoom = 300; center = [10,50]; break;
	  case 'North America': zoom = 200; center = [-110,57]; break;
	  case 'Australia and New Zealand': zoom = 350; center = [147,-35]; break;
	  case 'Latin America and Caribbean': zoom = 200; center = [-78,-10]; break;
	  case 'Middle East and Northern Africa': zoom = 350; center = [20,30]; break;
	  case 'Central and Eastern Europe': zoom = 200; center = [80,60]; break;
	  case 'Southeastern Asia': zoom = 350; center = [125,7]; break;
	  case 'Sub-Saharan Africa': zoom = 250; center = [0, 0]; break;
	  case 'Eastern Asia': zoom = 300; center = [99,36]; break;
	  case 'Southern Asia': zoom = 400; center = [72,26]; break;
  }

  // The svg
  var div = d3.select(id);
  var width = 800;
  var height = 430;
  
  var svgOld = div.select("svg").remove(); 
  
  var svg = div.append("svg")
    .attr("viewBox", `0 0 800 430`);
  
  // Map and projection
  var path = d3.geoPath();
  var projection = d3.geoMercator()
    .scale(zoom)
    .center(center)
    .translate([width/2, height/2]);
  
  var max_score = d3.max(df, function(d) { return d.score; });
  var min_score = d3.min(df, function(d) { return d.score; });
  var colorScale = d3.scaleSequential()
    .domain([min_score, max_score])
    .interpolator(d3.interpolateViridis);;
  
  
  // Draw the map
  svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
		record = mapdata.get(d.id);
        return ( (record && (region == record.region || region == 'World')) ? colorScale(record.score) : "lightgray");
      })
      .style("stroke", "transparent")
      .attr("class", function(d){ return "Country" } )
      .style("opacity", .8)
      .on("mouseover", mouseovermap )
      .on("mouseout", mouseoutmap );
	  
	
}
