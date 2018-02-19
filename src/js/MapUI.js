/*******************************************************************
This code generate the basemap using sing OpenLayers API
Area of interest boundary vector data stored in Geoserver
Created By: Jiaqi Guo(Max) 
Last Modified: 2017-09-18
*******************************************************************/



// creating the container for the popups

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var coords;
var select = new ol.interaction.Select();



// create the popup overlay
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


// Basemap layer, OSM source using bing map aerial
//
var OSM_layer = new ol.layer.Tile
({
  // source: new ol.source.OSM()
    source: new ol.source.BingMaps({
    key: 'Ao3gqEs-MVTd_WIvPO4XGqlFW6poGriaAu_hgkaln2H1d7ckV0ndV96HO5YdhAHP',
    imagerySet: 'Aerial'})
});



// create map view, specify the initial location, zoom level and projection 
var view = new ol.View
({
  projection: "EPSG:4326",
  center: [-98.04789,49.53473],
  zoom: 9
});

// Create scaleline control
var scaleline = new ol.control.ScaleLine();


// create the Vector source for manitoba municipall boundary data

var manitoba_municipal_source = new ol.source.Vector
({
  url: 'http://34.201.23.195:8080/geoserver/Boundaries/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Boundaries:Manitoba_Municipal_Boundaries&maxFeatures=5000&outputFormat=application%2Fjson',
  format: new ol.format.GeoJSON()
});

// create the Vector layer for manitoba municipall boundary data

var manitoba_municipal_map =  new ol.layer.Vector
({
  source: manitoba_municipal_source,
});    


// create the Vector source for manitoba municipall boundary data

var manitoba_township_source = new ol.source.Vector
({
  url: 'http://34.201.23.195:8080/geoserver/Boundaries/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Boundaries:PAR_MB_TOWNSHIP&maxFeatures=5000&outputFormat=application%2Fjson',
  format: new ol.format.GeoJSON()
});

// create the Vector layer for manitoba municipall boundary data

var manitoba_township_map =  new ol.layer.Vector
({
  source: manitoba_township_source,
});    





// create tilewms source for temperature data
var temperatureSource = new ol.source.TileWMS
({
  url:'http://34.201.23.195:8080/geoserver/RawTemperature/ows?',
  params:{'LAYERS': 'RawTemperature:Temperature20160601'},
  serverType: 'geoserver',
  crossOrigin:'anonymous'
});


// create wmslayer from temperature data 
var temperatureLayer = new ol.layer.Tile
({
  source: temperatureSource
});

// create tilewms source for rain data
var rainSource = new ol.source.TileWMS
({
  url:'http://34.201.23.195:8080/geoserver/RawRain/ows?',
  params:{'LAYERS': 'RawRain:rain20160601'},
  serverType: 'geoserver',
  crossOrigin:'anonymous'
});


// create wmslayer from rain data 
var rainLayer = new ol.layer.Tile
({
  source: rainSource
});

// create tilewms source for PM data
var pmSource = new ol.source.TileWMS
({
  url:'http://34.201.23.195:8080/geoserver/RawPM/ows?',
  params:{'LAYERS': 'RawPM:PM2016060106'},
  serverType: 'geoserver',
  crossOrigin:'anonymous'
});


// create wmslayer from PM data 
var pmLayer = new ol.layer.Tile
({
  source: pmSource
});


// create map interface 

var map = new ol.Map
({
    controls: [scaleline],  //, attr
    interactions: ol.interaction.defaults
    ({
        doubleClickZoom: false
    }),
    layers: [OSM_layer],
    target: 'map',
    overlays: [overlay],
    view: view
});



// when double click, openup a popup with cell info in it
map.on('dblclick', function(evt) 
{
  var coordinate = evt.coordinate;
  var viewResolution = /** @type {number} */ (view.getResolution());
  var url = wmsSource.getGetFeatureInfoUrl(
      evt.coordinate, viewResolution, 'EPSG:3857',
      {'INFO_FORMAT': 'text/html'});
  if (url) {

        overlay.setPosition(coordinate);
  };

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() 
  {
    if (this.readyState == 4 && this.status == 200) 
    {
        content.innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();

  console.log(url);
});


// create pointer, click on the map and trigger popups
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




// adding the interraction method single click to map to acquire the extent of the AOI
// map.addInteraction(select);
selectclick = select;
selectclick.on('select', function(e)
{ 
  console.log(e);
  if (e!== null)
  {
  console.log(e),
  coords = e.selected[0].f.target.l;
  console.log(coords);
  console.log(typeof(coords[0]));
  }
});

