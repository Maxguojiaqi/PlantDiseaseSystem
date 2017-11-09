/******************************************************************* 
This Code Generate Display Layer to Map function as well as export display map function 
Last Modified: 2017-09-29
Name: Jiaqi Guo(Max)
*******************************************************************/





$("#LayerDisplay").click(function()
  {
    var LayerType = document.getElementById("LayerType").value;

    console.log(rain_map.getVisible());
    console.log(risk_map.getVisible());
    console.log(LayerType);
    console.log(typeof(LayerType));

    if (LayerType == 0)
      {
        risk_map.setVisible(false);
        rain_map.setVisible(true);
        // map.addLayer(rain_map);
        // map.removeLayer(risk_map);
        console.log(map.getTarget());
        map.removeInteraction(select); // deselect the polygon, better present the riskmap on the ol.map
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
      map.removeInteraction(select); // deselect the polygon, better present the riskmap on the ol.map
     }
    
});

      
document.getElementById('buttonExportMap').addEventListener('click', function() {
  map.once('postcompose', function(event) {
    var canvas = event.context.canvas;
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
    } else {
      canvas.toBlob(function(blob) {
        saveAs(blob, 'map.png');
      });
    }
  });
  map.renderSync();
  // map.removeLayer(wms_map);
});