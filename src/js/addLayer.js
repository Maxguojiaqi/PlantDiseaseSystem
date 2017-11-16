/******************************************************************* 
This Code Generate Display Layer to Map function
Name: Jiaqi Guo(Max)
*******************************************************************/





$("#RainDisplay").click(function()
  {
    var RainType = document.getElementById("RainType").value;

    console.log(rain_map.getVisible());
    console.log(risk_map.getVisible());
    console.log(RainType);
    console.log(typeof(RainType));

    if (RainType == 0)
      {
        risk_map.setVisible(false);
        rain_map.setVisible(true);
        // map.addLayer(rain_map);
        // map.removeLayer(risk_map);
        console.log(map.getTarget());
        // map.removeInteraction(select); // deselect the polygon, better present the riskmap on the ol.map
        console.log(rain_map.getVisible())

      }

    else
    {
      rain_map.setVisible(false);
      risk_map.setVisible(true);
      // map.addLayer(risk_map);
      // map.removeLayer(rain_map);
      // rain_map.setVisible = false;
      console.log(map.getTarget());
      console.log(risk_map.getVisible())
      // map.removeInteraction(select); // deselect the polygon, better present the riskmap on the ol.map
     }
    
});

$("#RiskDisplay").click(function()
  {
    // var RainType = document.getElementById("RainType").value;

    // console.log(rain_map.getVisible());
    // console.log(risk_map.getVisible());
    // console.log(RainType);
    // console.log(typeof(RainType));

    rain_map.setVisible(false);
    risk_map.setVisible(true);
    // map.addLayer(risk_map);
    // map.removeLayer(rain_map);
    // rain_map.setVisible = false;
    console.log(map.getTarget());
    console.log(risk_map.getVisible())
    // map.removeInteraction(select); // deselect the polygon, better present the riskmap on the ol.map
     
    
});