/******************************************************************* 
This code generate the model process functionality of the system

Created By: Jiaqi Guo(Max) 
Last Modified: 2017-09-18
*******************************************************************/


// Process data from process server

var timeStampRisk;
var risk_map = new ol.layer.Tile({ });
$("#ProcessData").click(function()
  {
    // Make sure button is hidden before data is succsessfully processed
    document.getElementById("buttonDownload3").style.visibility="hidden";
    document.getElementById("buttonAddLayer").style.visibility="hidden";
    document.getElementById("buttonExportMap").style.visibility="hidden";


    var CropDensity = document.getElementById("Cropdst").value;
    var DiseaseHistory = document.getElementById("DiseaseHistory").value;
    var RegionRisk = document.getElementById("RegionR").value;
    
    $.post("../lib/php/riskAnalysis.php", 
    {    
         CropDensity:CropDensity,
         DiseaseHistory:DiseaseHistory,
         RegionRisk:RegionRisk,
    })
    .done(function(data,status)
    {
        $("#status").html("done");
        data = jQuery.parseJSON(data);
        console.log(data[0]);
        
        $("#buttonDownload3").attr("href",data[0]);

        
        document.getElementById("buttonDownload3").style.visibility="visible"; 
        document.getElementById("buttonAddLayer").style.visibility="visible"; 
        document.getElementById("buttonExportMap").style.visibility="visible"; 

    })


    $.post("../lib/php/GeoserverREST.php",
      {

      }).done(function(data,status)
        {
        $("#status").html("done");
        data = jQuery.parseJSON(data);
        timeStampRisk = data[0];
        console.log("timeStamp:"+timeStampRisk);

    var riskmap_source = new ol.source.TileWMS
    ({
      url:'http://localhost:8080/geoserver/Canola/ows?',
      params:{'LAYERS': 'Canola:Riskmap'+ timeStampRisk},
      serverType: 'geoserver',
      crossOrigin:'anonymous'
    });

    console.log(riskmap_source);

    risk_map.setSource(riskmap_source);
    risk_map.setVisible(false);
    
    map.addLayer(risk_map);

    })


});
        

