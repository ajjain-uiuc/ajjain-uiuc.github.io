var global_topo = null , global_df_happiness = null, mapdata = d3.map();

async function load(callback) {
  topo = await d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
  df_happiness = await d3.csv("data/happiness_data.csv", function(d){
	return { 
      region           :  d.region           ,
      country          :  d.country          ,
      code             :  d.code             ,
      rank             : +d.rank             ,
      score            : +d.score            ,
      total_population : +d.total_population ,
      gdp              : +d.gdp              ,
      social           : +d.social           ,
      health           : +d.health           ,
      freedom          : +d.freedom          ,
      generosity       : +d.generosity       ,
      corruption       : +d.corruption       ,
      dystopia         : +d.dystopia || 0      ,
      rank_old         : +d.rank_old         ,
      score_old        : +d.score_old        ,
      gdp_old          : +d.gdp_old          ,
      social_old       : +d.social_old       ,
      health_old       : +d.health_old       ,
      freedom_old      : +d.freedom_old      ,
      corruption_old   : +d.corruption_old   ,
      generosity_old   : +d.generosity_old   ,
      score_change     : +d.score_change     ,
      gdp_change       : +d.gdp_change       ,
      social_change    : +d.social_change    ,
      health_change    : +d.health_change    ,
      freedom_change   : +d.freedom_change   ,
      generosity_change: +d.generosity_change,
      corruption_change: +d.corruption_change,
	  total            : (+d.gdp) + (+d.social) + (+d.health) + (+d.freedom) + (+d.generosity) - (+d.corruption) + (+d.dystopia),
	  percent_change   : (+d.score_change)*100/(+d.score_old)
	};
  });
  
  global_df_happiness = df_happiness;
  global_topo = topo;
    
  global_df_happiness.forEach(function(d) {
	mapdata.set(d.code, d);
  });
  
  callback(topo, df_happiness, 'World');
}
