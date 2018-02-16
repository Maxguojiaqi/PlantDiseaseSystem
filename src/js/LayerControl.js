

// $( "#datepicker1" ).on( "click", datepicker());

// initiate the two date picker interface

var date;

$( function() {
$( "#datepicker1" ).datepicker();
} );

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


});


$( function() {
$( "#datepicker2" ).datepicker();
} );


// Implement Slider functionality

var slider = document.getElementById("myRange");
var output = document.getElementById("opacity");
output.innerHTML = slider.value;

slider.oninput = function() 
{
	var Opacity = this.value / 100;
	temperatureLayer.setOpacity(Opacity);
	rainLayer.setOpacity(Opacity);
	output.innerHTML = this.value;
}


$( "#municipal" ).on( "click", function() 
{

  if(document.getElementById("municipal").checked == true)
  {
  	map.addInteraction(select);
  	map.addLayer(manitoba_municipal_map);
  }

  else
  {
  	
  	map.removeInteraction(select);
  	map.removeLayer(manitoba_municipal_map);
  }

});

$( "#township" ).on( "click", function() 
{

  if(document.getElementById("township").checked == true)
  {
  	map.addInteraction(select);
  	map.addLayer(manitoba_township_map);
  	console.log(document.getElementById("datepicker1").value);
  }

  else
  {
  	map.removeInteraction(select);
  	map.removeLayer(manitoba_township_map);
  }

});


$("#layerdropdown").on("change", function() 
{
   	var layerType =  document.getElementById("layerdropdown").value;
   	console.log(typeof(layerType));
   	console.log(layerType);

   	if (layerType==0)
   	{
		map.addLayer(temperatureLayer);
		map.removeLayer(rainLayer);
   	}

   	else if (layerType==1)
   	{
		map.addLayer(rainLayer);
		map.removeLayer(temperatureLayer);
   	}

   	else 
   	{
   		map.removeLayer(temperatureLayer);
   		map.removeLayer(rainLayer);
   	}
   	
});
