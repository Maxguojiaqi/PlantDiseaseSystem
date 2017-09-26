/*******************************************************************
This code generate the basemap using sing OpenLayers API
Area of interest boundary vector data stored in Geoserver

Created By: Jiaqi Guo(Max) 
Last Modified: 2017-09-18
*******************************************************************/

// var coords;

// async function MapUI()
// {

// Create Base Map and Layer using OpenLayers

  var view = new ol.View
  ({
  // change projection to geoserver's projection

    projection: "EPSG:4326",
    center: [-98.5284468774974,52.71391708013823],
          zoom: 7
  });

  // creating a openlayer base map

  var osm_map =  new ol.layer.Tile
  ({
    source: new ol.source.OSM()
  });

  // creating a map layer from geoserver

  var vector_source =  new ol.source.Vector
  ({
        url: 'http://ulysses.gis.agr.gc.ca/geoserver/manitoba/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=manitoba:GeoBase_MUNI_MB_1_0_eng&maxFeatures=5000&outputFormat=application%2Fjson', 
        format: new ol.format.GeoJSON()
  });

  var vector_map =  new ol.layer.Vector
  ({
    source: vector_source 

  });

  // var raster_source = await new ol.source.TileWMS
  // ({
  //   url:'http://localhost:8080/geoserver/Canola/ows?',
  //   params:{'LAYERS': 'Canola:Riskmap'},
  //   serverType: 'geoserver',
  //   crossOrigin:'anonymous'
  // });

  // var wms_map = await new ol.layer.Tile({

  //   source:raster_source
  // });

  var map =  new ol.Map({

    layers: [osm_map, vector_map],
    target: 'map',
    view: view
    });


  // var button = document.createElement('button');
  // button.innerHTML = "⌨";

  // button.addEventListener('click', handleSidebar, false);
  // var element = document.createElement('div');
  // element.className = 'open-sidebar ol-unselectable ol-control';
  // element.appendChild(button);
  // var RotateNorthControl = new ol.control.Control
  // ({
  //     element: element
  // });
  // map.addControl(RotateNorthControl);
  // return map;


// var coords;
// var select = new ol.interaction.Select();
//     map.addInteraction(select);

// // var selectedFeature = select.getFeatures();           

// selectclick = select;
// selectclick.on('select', function(e)
// { 
//   if (e!== null)
//   {
//   console.log(e),
//   coords = e.selected[0].c.target.s;
//   console.log(coords);
//   }
// });



//   var select = new ol.interaction.Select();
//       map.addInteraction(select);

//   selectclick = select;
//   selectclick.on('select', function(e)
//   { 
//     console.log(e);
//     if (e!== null)
//     {
//     console.log(e),
//     coords = e.selected[0].f.target.l;
//     console.log(coords);
//     }
//   });


// }

// MapUI();



