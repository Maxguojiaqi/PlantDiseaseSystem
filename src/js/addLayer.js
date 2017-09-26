

$("#buttonAddLayer").click(function()
  {

    $.post("../lib/php/GeoserverREST.php",{},function(status)
    {
        $("#status").html("done");
        var raster_source = new ol.source.TileWMS
        ({
          url:'http://localhost:8080/geoserver/Canola/ows?',
          params:{'LAYERS': 'Canola:Riskmap'},
          serverType: 'geoserver',
          crossOrigin:'anonymous'
        });

        var wms_map = new ol.layer.Tile({

          source:raster_source
        }); 

        map.addLayer(wms_map);

    })

  });