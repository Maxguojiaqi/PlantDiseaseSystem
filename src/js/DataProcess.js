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
    document.getElementById("buttonAddLayer").style.visibility="hidden";
    document.getElementById("buttonExportPDF").style.visibility="hidden";


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
        console.log(data[0]);
        $("#status").html("done");
        document.getElementById("buttonDownload3").style.visibility="visible"; 
        document.getElementById("buttonAddLayer").style.visibility="visible"; 
        document.getElementById("buttonExportPDF").style.visibility="visible"; 

    })

  });
        

