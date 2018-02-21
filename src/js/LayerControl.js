/*******************************************************************
Implement the LayerControl Panel.
Functionalities: 
AOI Ancillary Layers Picker, 
Target Date Picker, 
Target Layer Picker, 
Adjust Opacity and Legend Display

Last Modified: Jiaqi Guo(Max) 
Date: 2018-02-21
*******************************************************************/


// Create date variable that used in datepicker1 and datepicker2 
var date;


// Initiate datepicker1 and datepicker2 
$( function() {
$( "#datepicker1" ).datepicker();
} );


$( function() {
$( "#datepicker2" ).datepicker();
} );


// when finish loading, set the default data and range for datepickers
$(document).ready(function() {
	$("#datepicker1").datepicker('setDate',"06/01/2016");
	$("#datepicker1").datepicker('option',"minDate","06/01/2016");
	$("#datepicker1").datepicker('option',"maxDate","06/15/2016");
	$("#datepicker2").datepicker('setDate',"06/01/2016");
	$("#datepicker2").datepicker('option',"minDate","06/01/2016");
	$("#datepicker2").datepicker('option',"maxDate","06/15/2016");
});


// Date Picker
// Based on the user selected date for datepicker1, change the Geoserver Endpoint
$("#datepicker1").on("change", function() 
{

	date = document.getElementById("datepicker1").value;
	var serverDate = date.substring(6,10) + date.substring(0,2) + date.substring(3,5);
	console.log(serverDate);


	var rainSource = new ol.source.TileWMS
	({
	  url:'http://34.201.23.195:8080/geoserver/RawRain/ows?',
	  params:{'LAYERS': 'RawRain:rain'+ serverDate},
	  serverType: 'geoserver',
	  crossOrigin:'anonymous'
	});

	rainLayer.setSource(rainSource);

	var temperatureSource = new ol.source.TileWMS
	({
	  url:'http://34.201.23.195:8080/geoserver/RawTemperature/ows?',
	  params:{'LAYERS': 'RawTemperature:Temperature' + serverDate},
	  serverType: 'geoserver',
	  crossOrigin:'anonymous'
	});

	temperatureLayer.setSource(temperatureSource);


	// set datepicker2's date to be same as datepicker1
	$("#datepicker2").datepicker('setDate', date);
});



// Implement Opacity Slider functionality

var slider = document.getElementById("myRange");
var output = document.getElementById("opacity");
output.innerHTML = slider.value;

slider.oninput = function() 
{
	var Opacity = this.value / 100;
	temperatureLayer.setOpacity(Opacity);
	rainLayer.setOpacity(Opacity);
	pmLayer.setOpacity(Opacity);
	output.innerHTML = this.value;
}



// Set the AOI Vector layer to when checked, only one boundary allowed 
$( "#municipal" ).on( "click", function() 
{

  if(document.getElementById("municipal").checked == true)
  {
  	document.getElementById("township").checked = false;
  	// map.addInteraction(select);
  	map.addLayer(manitoba_municipal_map);
  	document.getElementById("aoiDropdown").innerHTML = 'Municipal Boundaries';
  	map.removeLayer(manitoba_township_map);
  	map.addInteraction(select);
  }

  else
  {
  	
  	map.removeInteraction(select);
  	map.removeLayer(manitoba_municipal_map);
	document.getElementById("aoiDropdown").innerHTML = 'None';
  	document.getElementById("aoiFeature").style.color = "red";
	document.getElementById("aoiFeature").innerHTML = "(no feature selected)";
  }

});

$( "#township" ).on( "click", function() 
{

  if(document.getElementById("township").checked == true)
  {
  	document.getElementById("municipal").checked = false;
  	map.addInteraction(select);
  	map.addLayer(manitoba_township_map);
  	document.getElementById("aoiDropdown").innerHTML = 'Legal Land Survey';
  	map.removeLayer(manitoba_municipal_map);
  	// map.addInteraction(select);
  }

  else
  {
  	map.removeInteraction(select);
  	map.removeLayer(manitoba_township_map);
  	document.getElementById("aoiDropdown").innerHTML = 'None';
  	document.getElementById("aoiFeature").style.color = "red";
    document.getElementById("aoiFeature").innerHTML = "(no feature selected)";
  }

});


// Layer Picker
// Add target Layer and Layer's legend to the panel

$("#layerdropdown").on("change", function() 
{
   	var layerType =  document.getElementById("layerdropdown").value;
   	console.log(typeof(layerType));
   	console.log(layerType);

   	if (layerType==0)
   	{
		map.addLayer(temperatureLayer);
		map.removeLayer(rainLayer);
		map.removeLayer(pmLayer);
		map.removeLayer(CropHisLayer);
		document.getElementById("layerLegend").src="http://34.201.23.195:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=RawTemperature:Temperature20160601";
   		document.getElementById("legendTitle").innerHTML = "Average Temperature in Past 3 Days";
   	}

   	else if (layerType==1)
   	{
		map.addLayer(rainLayer);
		console.log(rainLayer);
		map.removeLayer(temperatureLayer);
		map.removeLayer(pmLayer);
		map.removeLayer(CropHisLayer);
		document.getElementById("layerLegend").src="http://34.201.23.195:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=RawRain:rain20160601";
		document.getElementById("legendTitle").innerHTML = "Accumulated Precipitation in Past 2 Weeks";
   	}

   	else if (layerType==2)
   	{
   		map.addLayer(pmLayer);
   		console.log(pmLayer);
		map.removeLayer(rainLayer);
		map.removeLayer(temperatureLayer);
		map.removeLayer(CropHisLayer);
		document.getElementById("layerLegend").src="http://34.201.23.195:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=RawPM:PM2016060106";
		document.getElementById("legendTitle").innerHTML = "Persistent Matrix ";
   	}

   	else if (layerType==3)
   	{
   		map.addLayer(CropHisLayer);
   		map.removeLayer(temperatureLayer);
   		map.removeLayer(rainLayer);
   		map.removeLayer(pmLayer);
   		document.getElementById("layerLegend").src="http://34.201.23.195:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=CroppingHistory:CropHist2016";
		document.getElementById("legendTitle").innerHTML = "Cropping History Since Last Time Canola Planted ";
   	}

   	else
   	{
   		map.removeLayer(temperatureLayer);
   		map.removeLayer(rainLayer);
   		map.removeLayer(pmLayer);
   		map.removeLayer(CropHisLayer);
   	}
   	
});
