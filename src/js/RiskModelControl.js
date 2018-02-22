/*******************************************************************
Implement the LayerControl Panel.
Functionalities: 
Target Date Picker, 
AOI Ancillary Layers Picker, 
Set Model Parameters
Generate Risk Result
Adjust Opacity and Legend Display

Last Modified: Jiaqi Guo(Max) 
Date: 2018-02-21
*******************************************************************/




$("#datepicker2").on("change", function() 
{

  date = document.getElementById("datepicker2").value;
  var serverDate = date.substring(6,10) + date.substring(0,2) + date.substring(3,5);
  console.log(serverDate);

  // set datepicker1's date to be same as datepicker2
  $("#datepicker1").datepicker('setDate', date);
});







$("#AOI").on("change", function() 
{
   	var aoi =  document.getElementById("AOI").value;
   	console.log(typeof(aoi));
   	console.log(aoi);

   	if (aoi==0)
   	{
  		map.removeLayer(manitoba_township_map);
  		map.removeLayer(manitoba_municipal_map);
  		map.addLayer(manitoba_municipal_map);
  		map.addInteraction(select);
  		document.getElementById("municipal").checked = true;
  		document.getElementById("township").checked = false;
      document.getElementById("step2").className = "checkmark icon";
      document.getElementById("step2").style.color = "green";
  	}

   	else if (aoi==1)
   	{
  		map.removeLayer(manitoba_township_map);
  		map.removeLayer(manitoba_municipal_map);
  		map.addLayer(manitoba_township_map);
  		map.addInteraction(select);
  		document.getElementById("township").checked = true;
  		document.getElementById("municipal").checked = false;
      document.getElementById("step2").className = "checkmark icon";
      document.getElementById("step2").style.color = "green";
   	}

   	else
   	{
  		map.removeLayer(manitoba_township_map);
  		map.removeLayer(manitoba_municipal_map);
  		map.removeInteraction(select);
  		document.getElementById("township").checked = false;
  		document.getElementById("municipal").checked = false;
      document.getElementById("step2").className = "remove icon";
      document.getElementById("step2").style.color = "red";
      document.getElementById("aoiFeature").style.color = "red";
      document.getElementById("aoiFeature").innerHTML = "(no feature selected)";

   	}
 });



$("#zoomToSelection").on("click", function() 
{

  view.animate({

    center:[(coords[0] + coords[2])/2, (coords[1]+coords[3])/2],
    zoom: 10
  });

});