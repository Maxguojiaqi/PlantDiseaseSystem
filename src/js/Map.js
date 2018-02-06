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
  center: [-98.04789,49.53473],
    zoom: 9
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




var vector_source = new ol.source.Vector
({
  url: 'http://localhost:8080/geoserver/Boundaries/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Boundaries:Manitoba_Municipal_Boundaries&maxFeatures=5000&outputFormat=application%2Fjson',
  format: new ol.format.GeoJSON()
});



var vector_map =  new ol.layer.Vector
({
source: vector_source 

});    


var wmsSource = new ol.source.TileWMS
({
  url:'http://localhost:8080/geoserver/RasterLayer/ows?',
  params:{'LAYERS': 'RasterLayer:CroppingHistory'},
  serverType: 'geoserver',
  crossOrigin:'anonymous'
});


var wmsLayer = new ol.layer.Tile({
source: wmsSource
});



var map = new ol.Map({
  controls: [scaleline],  //, attr
  interactions: ol.interaction.defaults({
    doubleClickZoom: false
}),
  layers: [OSM_layer,wmsLayer,vector_map],
  target: 'map',
  view: view
});




test1 = new ol.control.MousePosition;
map.addControl(test1);

$(".page-intro").modal('show');





