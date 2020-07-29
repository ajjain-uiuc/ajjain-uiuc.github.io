function draw(topo, df, region){
  drawMap('#happiness_score_map', region, topo, df);
  drawBarChart(df, "#happiness_rank_chart_top", "country", "score", "score", true, 5, xlabel=false, region);
  drawBarChart(df, "#happiness_rank_chart_bottom", "country", "score", "score", false, 5, xlabel=false, region);

  /*
  drawStackedBarChart(df, "#happiness_factors_stacked", region, 156, true);
  drawScatterPlot(df, "#happiness_gdp_scatter", 		region, "gdp", "score", "total_population", "gdp");
  drawScatterPlot(df, "#happiness_social_scatter", 		region, "social", "score", "total_population", "social");
  drawScatterPlot(df, "#happiness_health_scatter", 		region, "health", "score", "total_population", "health");
  drawScatterPlot(df, "#happiness_freedom_scatter", 	region, "freedom", "score", "total_population", "freedom");
  drawScatterPlot(df, "#happiness_generosity_scatter", 	region, "generosity", "score", "total_population", "generosity");
  drawScatterPlot(df, "#happiness_corruption_scatter", 	region, "corruption", "score", "total_population", "corruption");
  drawScatterPlot(df, "#happiness_dystopia_scatter", 	region, "dystopia", "score", "total_population", "dystopia");

  drawPlusMinusBarChart(df, "#happiness_change_bar", "country", "percent_change", region);
  drawScatterPlotWithTrend(df, "#happiness_change_scatter", 	region, "score", "score_old", "percent_change", "percent_change");
  */
}

function drawChange(topo, df, region){
  drawPlusMinusBarChart(df, "#happiness_change_bar", "country", "percent_change", region);
  drawScatterPlotWithTrend(df, "#happiness_change_scatter", 	region, "score", "score_old", "percent_change", "percent_change");
}

function drawOverview(topo, df, region){
  drawMap('#happiness_score_map', region, topo, df);
  drawBarChart(df, "#happiness_rank_chart_top", "country", "score", "score", true, 5, xlabel=false, region);
  drawBarChart(df, "#happiness_rank_chart_bottom", "country", "score", "score", false, 5, xlabel=false, region);
}

function drawFactors(topo, df, region){
  drawStackedBarChart(df, "#happiness_factors_stacked", region, 156, true);
  drawScatterPlot(df, "#happiness_gdp_scatter", 		region, "gdp", "score", "total_population", "gdp");
  drawScatterPlot(df, "#happiness_social_scatter", 		region, "social", "score", "total_population", "social");
  drawScatterPlot(df, "#happiness_health_scatter", 		region, "health", "score", "total_population", "health");
  drawScatterPlot(df, "#happiness_freedom_scatter", 	region, "freedom", "score", "total_population", "freedom");
  drawScatterPlot(df, "#happiness_generosity_scatter", 	region, "generosity", "score", "total_population", "generosity");
  drawScatterPlot(df, "#happiness_corruption_scatter", 	region, "corruption", "score", "total_population", "corruption");
  drawScatterPlot(df, "#happiness_dystopia_scatter", 	region, "dystopia", "score", "total_population", "dystopia");
}

function run(){
  load(draw);
}