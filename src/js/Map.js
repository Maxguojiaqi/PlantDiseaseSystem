/*******************************************************************
This code generate the basemap using sing OpenLayers API
Area of interest boundary vector data stored in Geoserver

Created By: Jiaqi Guo(Max) 
Last Modified: 2017-09-18
*******************************************************************/

// Create Base Map and Layer using OpenLayers


// Basemap layer, OSM source
//
var OSM_layer = new ol.layer.Tile({
    source: new ol.source.OSM()
});


var view = new ol.View
({
// change projection to geoserver's projection

  projection: "EPSG:4326",
  center: [-98.5284468774974,52.71391708013823],
    zoom: 6
});

// Create scaleline control
//
var scaleline = new ol.control.ScaleLine();
//        var attr = new ol.control.Attribution();

// Create custom style 
//
var myStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255,100,50,.2)'
    }),
    stroke: new ol.style.Stroke({
        color: 'rgba(255,100,50,1)'
    }),
    image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
            color: 'rgba(255,100,50,.2)'
        })
    })
});    

var vector_source =  new ol.source.Vector
({
  url: 'http://ulysses.gis.agr.gc.ca/geoserver/manitoba/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=manitoba:GeoBase_MUNI_MB_1_0_eng&maxFeatures=5000&outputFormat=application%2Fjson', 
  format: new ol.format.GeoJSON()
});

var vector_map =  new ol.layer.Vector
({
source: vector_source 

});    


var map = new ol.Map({
  controls: [scaleline],  //, attr
  interactions: ol.interaction.defaults({
    doubleClickZoom: false
}),
  layers: [OSM_layer, vector_map],
  target: 'map',
  view: view
});

$(".page-intro").modal('show');





