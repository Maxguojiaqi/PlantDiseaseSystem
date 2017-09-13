/******************************************************************* 
This code generate the model process functionality of the system

Created By: Jiaqi Guo(Max) 
Last Modified: 2017-09-18
*******************************************************************/


// Process data from process server

$("#ProcessData").click(function()
  {
    // Make sure button is hidden before data is succsessfully processed
    document.getElementById("buttonDownload3").style.visibility="hidden";
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
        document.getElementById("buttonDownload3").style.visibility="visible"; 
    })
  });
        

