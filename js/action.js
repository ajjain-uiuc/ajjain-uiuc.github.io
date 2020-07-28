function onOverviewRegionSelect() {
  var x = document.getElementById("overviewRegionDropDown").value;
  drawOverview(global_topo, global_df_happiness, x);
}

function onFactorRegionSelect() {
  var x = document.getElementById("factorRegionDropDown").value;
  drawFactors(global_topo, global_df_happiness, x);
}

function onChangeRegionSelect() {
  var x = document.getElementById("changeRegionDropDown").value;
  drawChange(global_topo, global_df_happiness, x);
}