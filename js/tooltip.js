var tooltip = d3.select("body").append("div") 
	.attr("class", "tooltip")       
	.style("opacity", 0);

function getHtml(d, params){
	var html = d ? d.country : "";
	for(var i=0; i<params.length && d; i++){
		html = html + "<br/><b>"+params[i]+":</b> "+d[params[i]];
	}
	return html;
}
function mouseovermap(d) {    
	tooltip.transition()    
		.duration(200)    
		.style("opacity", .9);    
	tooltip.html(
			getHtml(
				mapdata.get(d.id), 
				['score']
			)
		)
		.style("left", (d3.event.pageX) + "px")   
		.style("top", (d3.event.pageY - 28) + "px")
		.attr("height", 28);  
}

function mouseoutmap(d) {   
	tooltip.transition()    
		.duration(500)    
		.style("opacity", 0); 
}


function mouseover(d, params) {    
	tooltip.transition()    
		.duration(200)    
		.style("opacity", .9);    
	tooltip.html(
			getHtml(
				d, 
				params
			)
		)
		.style("left", (d3.event.pageX) + "px")   
		.style("top", (d3.event.pageY - 28) + "px")
		.attr("height", 28);  
}

function mouseout(d) {   
	tooltip.transition()    
		.duration(500)    
		.style("opacity", 0); 
}


function mouseover_overview(d){mouseover(d, ['score']);}
function mouseover_gdp(d){mouseover(d, ['score', 'gdp']);}
function mouseover_corruption(d){mouseover(d, ['score', 'corruption']);}
function mouseover_health(d){mouseover(d, ['score', 'health']);}
function mouseover_social(d){mouseover(d, ['score', 'social']);}
function mouseover_generosity(d){mouseover(d, ['score', 'generosity']);}
function mouseover_freedom(d){mouseover(d, ['score', 'freedom']);}
