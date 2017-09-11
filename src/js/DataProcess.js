/* 
This code generate the model process functionality of the system

Created Data:2017-09-06
Created By: Jiaqi Guo(Max) 

*/


$("#ProcessData").click(function()
  {
  // var floweringDate = document.getElementById("floweringDate").value;
  // console.log(floweringDate);
  var CropDensity = document.getElementById("Cropdst").value;
  var DiseaseHistory = document.getElementById("DiseaseHistory").value;
  var RegionRisk = document.getElementById("RegionR").value;
  $.post("../lib/php/riskAnalysis.php", 
  {    
       CropDensity:CropDensity,
       DiseaseHistory:DiseaseHistory,
       RegionRisk:RegionRisk,
  })
  .done(function(databack, status)
  {
      $("#status").html("done");
      // data = databack;
      data = jQuery.parseJSON(databack);
      // data = databack;
      console.log(data);
//&& data[1]
      if (data[0])
      {
        $("#tifResponse3").html('<a href="' + data + '" class="positive ui button" download=>Download risk Data</a>').appendTo('#button3');
      }
  })
  });
        

