/******************************************************************* 
This Code Generate Display Layer to Map function as well as export display map function 
Last Modified: 2017-09-29
Name: Jiaqi Guo(Max)
*******************************************************************/


$("#buttonAddLayer").click(function()
  {

    $.post("../lib/php/GeoserverREST.php",
      {

      }).done(function(data,status)
        {
        $("#status").html("done");
        data = jQuery.parseJSON(data);
        console.log(data[0]);


        map.removeLayer(wms_map);
        var raster_source = new ol.source.TileWMS
        ({
          url:'http://localhost:8080/geoserver/Canola/ows?',
          params:{'LAYERS': 'Canola:Riskmap'+data[0]},
          serverType: 'geoserver',
          crossOrigin:'anonymous'
        });

        console.log(raster_source);

        var wms_map = new ol.layer.Tile({

          source:raster_source
        }); 
        // map.removeLayer(wms_map);
        map.addLayer(wms_map);
        console.log(map.getTarget())
        map.removeInteraction(select); // deselect the polygon, better present the riskmap on the ol.map

        console.log(coords);
        zoomX = (coords[0] + coords[2])/2 ;
        zoomY = (coords[1] + coords[3])/2;
        view.animate({
          center: [zoomX, zoomY],
          zoom: 10,
          duration: 2000
        });
      })  
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
  
});



$("#LayerDisplay").click(function()
  {
    var LayerType = document.getElementById("LayerType").value;
    console.log(LayerType);
    if (LayerType == 0)
    {
    $.post("../lib/php/GeoserverRainREST.php",
      {

      }).done(function(data,status)
        {
        $("#status").html("done");
        data = jQuery.parseJSON(data);
        console.log(data[0]);

        // var layerName = 'Canola:Riskmap'+



        var raster_source = new ol.source.TileWMS
        ({
          url:'http://localhost:8080/geoserver/Canola/ows?',
          params:{'LAYERS': 'Canola:Rain'+data[0]},
          serverType: 'geoserver',
          crossOrigin:'anonymous'
        });

        console.log(raster_source);

        var wms_map = new ol.layer.Tile({

          source:raster_source
        }); 
        
        // map.removeLayer(wms_map);
        map.addLayer(wms_map);
        console.log(map.getTarget())
        map.removeInteraction(select); // deselect the polygon, better present the riskmap on the ol.map

        console.log(coords);
        zoomX = (coords[0] + coords[2])/2 ;
        zoomY = (coords[1] + coords[3])/2;
        view.animate({
          center: [zoomX, zoomY],
          zoom: 10,
          duration: 2000
        });
      })
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