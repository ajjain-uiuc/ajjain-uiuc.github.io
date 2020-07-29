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
  var projection = d3.geoMercator()
    .scale(zoom)
    .center(center)
    .translate([width/2, height/2]);
	
  let path = d3.geoPath().projection(projection);
  
  var max_score = d3.max(df, function(d) { return d.score; });
  var min_score = d3.min(df, function(d) { return d.score; });
  var colorScale = d3.scaleSequential()
    .domain([min_score, max_score])
    .interpolator(d3.interpolateViridis);
  
  var max_score_reg = d3.max(df, function(d) { return d.score * ((region == d.region || region == 'World') ? 1 : 0); });
  var min_score_reg = d3.min(df, function(d) { return d.score * ((region == d.region || region == 'World') ? 1 : 100); });
  
  // Draw the map
  var mapg = svg.append("g");
  mapg.selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", path)
      // set the color of each country
      .attr("fill", function (d) {
		record = mapdata.get(d.id);
		console.log(d.id, d.properties.name)
        return ( (record && (region == record.region || region == 'World')) ? colorScale(record.score) : "lightgray");
      })
      .style("stroke", "transparent")
      .attr("class", function(d){ return "Country" } )
      .style("opacity", .8)
      .on("mouseover", mouseovermap )
      .on("mouseout", mouseoutmap );
	  
  mapg.selectAll('circle').data(topo.features)
		.enter()
		.append('circle')
			.attr('transform', function (d) { return 'translate(' + path.centroid(d) + ')';})
			.attr('r', function (d) {
				if (mapdata.get(d.id)){
					switch(mapdata.get(d.id)['score']){
						case max_score_reg: return Math.sqrt(path.area(d) / Math.PI); 
						case min_score_reg: return Math.sqrt(path.area(d) / Math.PI); 
						default: return 0; 
					}
				} else return 0;
			})
			.attr('class', function(d){
				if (mapdata.get(d.id)) { 
					switch(mapdata.get(d.id)['score']){
						case max_score_reg: return 'topannotation'; 
						case min_score_reg: return 'bottomannotation'; 
						default: return 'noannotation';
					}
				} else return 'noannotation';
			})
			.on("mouseover", mouseovermap )
			.on("mouseout", mouseoutmap );
			
	mapg.selectAll('text').data(topo.features)
		.enter()
		.append('text')
			.attr('transform', function (d) { return 'translate(' + path.centroid(d) + ')';})
			.attr("dx", function(d){return -20})
			.attr("dy","-.48em")
			.attr("class", "textannotation")
			.text(function(d){
				if (mapdata.get(d.id)) { 
					switch(mapdata.get(d.id)['score']){
						case max_score_reg: return mapdata.get(d.id)['country']; 
						case min_score_reg: return mapdata.get(d.id)['country']; 
						default: return '';
					}
				} else return '';
			});
}
