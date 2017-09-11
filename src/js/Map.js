/* 
This code generate the basemap using sing OpenLayers API
Area of interest boundary vector data stored in Geoserver

Created Data:2017-08-25
Created By: Jiaqi Guo(Max) 

*/



/****************************  Define Map Layers and Map  *****************************/
console.log("5");
var view = new ol.View({
  //change projection to geoserver's projection
  projection: "EPSG:4326",
  center: [-98.5284468774974,52.71391708013823],
        zoom: 7
});
// creating a openlayer base map
var osm_map = new ol.layer.Tile({
  source: new ol.source.OSM()
});
// creating a map layer from own server
var vector_source = new ol.source.Vector({
      url: 'http://ulysses.gis.agr.gc.ca/geoserver/manitoba/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=manitoba:GeoBase_MUNI_MB_1_0_eng&maxFeatures=5000&outputFormat=application%2Fjson',
      format: new ol.format.GeoJSON()
  });

var vector_map = new ol.layer.Vector({
  source: vector_source

});

var map = new ol.Map({

layers: [osm_map, vector_map],
target: 'map',
view: view
});

