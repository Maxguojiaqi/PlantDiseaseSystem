/**********************************************************************
This code generate the data download functionality of the system

Created By: Jiaqi Guo(Max) 
Last Modified: 2017-09-18
***********************************************************************/


// Getting Polygon coordinates from DOM on click

var coords;
var timeStamp;
var rain_map = new ol.layer.Tile({ });
var select = new ol.interaction.Select();
map.addInteraction(select);

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




// Download data from data server to process server

$("#AoiData").click(function()
  {
    // Make sure button is hidden before data is succsessfully downloaded
    document.getElementById("buttonDownload1").style.visibility="hidden";
    document.getElementById("buttonDownload2").style.visibility="hidden";
    // document.getElementById("buttonDisplayRain").style.visibility="hidden";
    // map.removeLayer(wms_map);
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
          console.log(data[0]);

          $("#buttonDownload1").attr("href",data[0]);
          $("#buttonDownload2").attr("href",data[1]);


          // var link = "../../data/rain-data.tif";
          
          //Show button when data is succsessfully downloaded
          document.getElementById("buttonDownload1").style.visibility="visible";
          document.getElementById("buttonDownload2").style.visibility="visible";
          // document.getElementById("buttonDisplayRain").style.visibility="visible";
      })


    $.post("../lib/php/GeoserverRainREST.php",
      {

      }).done(function(data,status)
        {
        $("#status").html("done");
        data = jQuery.parseJSON(data);
        console.log(data[0]);

        timeStamp = data[0];
        

        var rain_source = new ol.source.TileWMS
                ({
                  url:'http://localhost:8080/geoserver/Canola/ows?',
                  params:{'LAYERS': 'Canola:Rain'+ timeStamp},
                  serverType: 'geoserver',
                  crossOrigin:'anonymous'
                });

        console.log(rain_source);
        console.log("the timestamp:"+timeStamp);

        rain_map.setSource(rain_source);
        rain_map.setVisible(false);

        map.addLayer(rain_map);
  }) 



});

