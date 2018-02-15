



// initiate the two date picker interface
$( function() {
$( "#datepicker1" ).datepicker();
} );

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
	wmsLayer.setOpacity(Opacity);
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
  }

  else
  {
  	map.removeInteraction(select);
  	map.removeLayer(manitoba_township_map);
  }

});