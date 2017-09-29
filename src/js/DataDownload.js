/**********************************************************************
This code generate the data download functionality of the system

Created By: Jiaqi Guo(Max) 
Last Modified: 2017-09-18
***********************************************************************/


// Getting Polygon coordinates from DOM on click

var coords;
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
          console.log(data[0]);
          //Show button when data is succsessfully downloaded
          document.getElementById("buttonDownload1").style.visibility="visible";
          document.getElementById("buttonDownload2").style.visibility="visible";
      })
  });