
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

      var loading = 0;
      var loaded = 0;

      var exportButton = document.getElementById('buttonExportPDF');

      exportButton.addEventListener('click', function() {

        exportButton.disabled = true;
        document.body.style.cursor = 'progress';


        // var raster_source = new ol.source.TileWMS
        // ({
        //   url:'http://localhost:8080/geoserver/Canola/ows?',
        //   params:{'LAYERS': 'Canola:Riskmap'},
        //   serverType: 'geoserver',
        //   crossOrigin:'anonymous'
        // });

        // var wms_map = new ol.layer.Tile({

        //   source:raster_source
        // });


        // var layerExtent= wms_map.getExtent();

        // console.log("map extent: "+ layerExtent);



        var width = Math.round(297 * 72 / 25.4);
        var height = Math.round(210 * 72 / 25.4);
        var size = /** @type {ol.Size} */ (map.getSize());
        var layerExtent = map.getView().calculateExtent(size);

        var source = osm_map.getSource();

        var tileLoadStart = function() {
          ++loading;
        };

        var tileLoadEnd = function() {
          ++loaded;
          if (loading === loaded) {
            var canvas = this;
            window.setTimeout(function() {
              loading = 0;
              loaded = 0;
              var data = canvas.toDataURL('image/png');
              var pdf = new jsPDF('landscape', undefined, 'A4');
              pdf.addImage(data, 'JPEG', 0, 0, 297, 210);
              pdf.save('map.pdf');
              source.un('tileloadstart', tileLoadStart);
              source.un('tileloadend', tileLoadEnd, canvas);
              source.un('tileloaderror', tileLoadEnd, canvas);
              map.setSize(size);
              map.getView().fit(layerExtent);
              map.renderSync();
              exportButton.disabled = false;
              document.body.style.cursor = 'auto';
            }, 100);
          }
        };

        map.once('postcompose', function(event) {
          source.on('tileloadstart', tileLoadStart);
          source.on('tileloadend', tileLoadEnd, event.context.canvas);
          source.on('tileloaderror', tileLoadEnd, event.context.canvas);
        });

        map.setSize([width, height]);
        map.getView().fit(layerExtent);
        map.renderSync();

      }, false);