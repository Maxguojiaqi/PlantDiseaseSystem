/* 
This code generate the data download functionality of the system

Created Data:2017-09-06
Created By: Jiaqi Guo(Max) 

*/

var coords;
var select = new ol.interaction.Select();
    map.addInteraction(select);

// var selectedFeature = select.getFeatures();
selectclick = select;
selectclick.on('select', function(e)
{ 
  console.log(e);
  if (e!== null)
  {
  console.log(e),
  coords = e.selected[0].f.target.l;
  console.log(coords);
  }
});


/****************************  Download data locally     *****************************/
// console.log(coords);
$("#AoiData").click(function()
  {
  $.post("../lib/php/riskDownload.php", 
  { 
       minX: String(coords[0]),
       minY: String(coords[1]),
       maxX: String(coords[2]),
       maxY: String(coords[3]),
  })
  .done(function(data, status)
  {
      $("#status").html("done");
      data = jQuery.parseJSON(data);
      console.log(data);
//&& data[1]
      if (data[0]&&data[1])
      { console.log(data[0]);
        $("#tifResponse1").html('<a href="' + data[0] + '" class="positive ui button" download=>Download Rain Data</a>').appendTo('#button1');
        $("#tifResponse2").html('<a href="' + data[1] + '" class="positive ui button" download=>Download Cropping History Data</a>').appendTo('#button2');
      }
  })
  });