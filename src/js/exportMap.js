/******************************************************************* 
This Code Generate export display map function 
Last Modified: 2017-09-29
Name: Jiaqi Guo(Max)
*******************************************************************/


document.getElementById('buttonExportMap').addEventListener('click', function() {
  map.once('postcompose', function(event) {
    var canvas = event.context.canvas;
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
    } else {
      canvas.toBlob(function(blob) {
        saveAs(blob, 'map.png');
      });
    }
  });
  map.renderSync();
  // map.removeLayer(wms_map);
});