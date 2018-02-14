/**********************************************************************
This code generate the data download functionality of the system

Created By: Jiaqi Guo(Max) 
Last Modified: 2017-09-18
***********************************************************************/

/*define(["PlantDiseaseController"], function(PlantDiseaseController) { 
  ...
  PlantDiseaseController.setServerUrl("../lib/php/riskDownload.php")  

  $("#AoiData").click(function()
  {


    PlantDiseaseController.prepareLayerForExport(coords)  
  }

})

*/
// Getting Polygon coordinates from DOM on click

var coords;
var timeStamp;
// var source;
var select = new ol.interaction.Select();
// var rain6h_map = new ol.layer.Tile({ });
// var rain2w_map = new ol.layer.Tile({ });
// var aveSoil_map = new ol.layer.Tile({ });
// var satIndex_map = new ol.layer.Tile({ });
// var wetIndex_map = new ol.layer.Tile({ });
// var PM_map = new ol.layer.Tile({ });
// var temperature_map = new ol.layer.Tile({ });
// var cropping_map = new ol.layer.Tile({ });



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


wmsLayer.setExtent = coords;


// Download data from data server to process server

$("#AoiData").click(function()
  {
    console.log(coords[0]);
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


  //   $.post("../lib/php/GeoserverLayerREST.php",
  //     {

  //     }).done(function(data,status)
  //       {
  //       $("#status").html("done");
  //       data = jQuery.parseJSON(data);
  //       console.log(data[0]);

  //       timeStamp = data[0];

        
  //       function setLayerSource (dataname)
  //       {
  //       var dataname = dataname;
  //       source = new ol.source.TileWMS
  //         ({
  //           url:'http://localhost:8080/geoserver/Canola/ows?',
  //           params:{'LAYERS': 'Canola:' + dataname + timeStamp},
  //           serverType: 'geoserver',
  //           crossOrigin:'anonymous'
  //         });
  //       }


  //       console.log("the timestamp:"+timeStamp);

  //       setLayerSource("rain6h");
  //       console.log(source);
  //       rain6h_map.setSource(source);
  //       rain6h_map.setVisible(false);
  //       map.removeLayer(rain6h_map); // remove the old layer, can't add duplicate map layer.
  //       map.addLayer(rain6h_map);


  //       setLayerSource("rain2w");
  //       console.log(source);
  //       rain2w_map.setSource(source);
  //       rain2w_map.setVisible(false);
  //       map.removeLayer(rain2w_map)
  //       map.addLayer(rain2w_map);  


  //       setLayerSource("AveSoil");
  //       console.log(source);
  //       aveSoil_map.setSource(source);
  //       aveSoil_map.setVisible(false);
  //       map.removeLayer(aveSoil_map)
  //       map.addLayer(aveSoil_map);


  //       setLayerSource("satIndex");
  //       console.log(source);
  //       satIndex_map.setSource(source);
  //       satIndex_map.setVisible(false);
  //       map.removeLayer(satIndex_map)
  //       map.addLayer(satIndex_map);

  //       setLayerSource("wetIndex");
  //       console.log(source);
  //       wetIndex_map.setSource(source);
  //       wetIndex_map.setVisible(false);
  //       map.removeLayer(wetIndex_map)
  //       map.addLayer(wetIndex_map);

  //       setLayerSource("pMatrix");
  //       console.log(source);
  //       PM_map.setSource(source);
  //       PM_map.setVisible(false);
  //       map.removeLayer(PM_map)
  //       map.addLayer(PM_map);

  //       setLayerSource("temperature");
  //       console.log(source);
  //       temperature_map.setSource(source);
  //       temperature_map.setVisible(false);
  //       map.removeLayer(temperature_map)
  //       map.addLayer(temperature_map);

  //       setLayerSource("croppingHistory");
  //       console.log(source);
  //       cropping_map.setSource(source);
  //       cropping_map.setVisible(false);
  //       map.removeLayer(cropping_map)
  //       map.addLayer(cropping_map);
  // }) 



});

