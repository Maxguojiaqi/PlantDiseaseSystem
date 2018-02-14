/*******************************************************************
This code generate the basemap using sing OpenLayers API
Area of interest boundary vector data stored in Geoserver
Created By: Jiaqi Guo(Max) 
Last Modified: 2017-09-18
*******************************************************************/

// Create Base Map and Layer using OpenLayers


var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');



var overlay = new ol.Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
});

  closer.onclick = function() {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};


// Basemap layer, OSM source
//
var OSM_layer = new ol.layer.Tile({
    // source: new ol.source.OSM()  
      source: new ol.source.BingMaps({
    key: 'Ao3gqEs-MVTd_WIvPO4XGqlFW6poGriaAu_hgkaln2H1d7ckV0ndV96HO5YdhAHP',
    imagerySet: 'Aerial'})
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
  url: 'http://34.201.23.195:8080/geoserver/Boundaries/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Boundaries:Manitoba_Municipal_Boundaries&maxFeatures=5000&outputFormat=application%2Fjson',
  format: new ol.format.GeoJSON()
});



var vector_map =  new ol.layer.Vector
({
source: vector_source,
// visible: false

});    


var wmsSource = new ol.source.TileWMS({
url:'http://34.201.23.195:8080/geoserver/RawTemperature/ows?',
params:{'LAYERS': 'RawTemperature:downsample64'},
serverType: 'geoserver',
crossOrigin:'anonymous'
});

var wmsLayer = new ol.layer.Tile({
  source: wmsSource,
  // extent: [ -100.2761859, 50.947917, -99.8354551, 51.4488523 ]
});

wmsLayer.setOpacity(0.8);


// var extent = [ -100.2761859, 50.947917, -99.8354551, 51.4488523 ];
console.log(wmsLayer.getExtent());

// wmsLayer.getExtent()


// wmsLayer.setExtent = extent;


var map = new ol.Map({
  controls: [scaleline],  //, attr
  interactions: ol.interaction.defaults({
    doubleClickZoom: false
}),
  layers: [OSM_layer,vector_map,wmsLayer],
  target: 'map',
  overlays: [overlay],
  view: view
});


      map.on('dblclick', function(evt) {
        var coordinate = evt.coordinate;
        var viewResolution = /** @type {number} */ (view.getResolution());
        var url = wmsSource.getGetFeatureInfoUrl(
            evt.coordinate, viewResolution, 'EPSG:3857',
            {'INFO_FORMAT': 'text/html'});
        if (url) {
          //content.innerHTML = url;
              // '<iframe seamless src="' + url + '"></iframe>';
              overlay.setPosition(coordinate);
        };

        // var test = url.getElementsByClassName("featureInfo")[0];

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                content.innerHTML = this.responseText;
           }
        };
        xhttp.open("GET", url, true);
        xhttp.send();

        console.log(url);

});

map.on('pointermove', function(evt) {
  if (evt.dragging) {
    return;
  }
  var pixel = map.getEventPixel(evt.originalEvent);
  var hit = map.forEachLayerAtPixel(pixel, function() {
    return true;
  });
  map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});







test1 = new ol.control.MousePosition;
map.addControl(test1);

$(".page-intro").modal('show');

