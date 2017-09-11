/* 
This code generate the basic layout of the Web-GIS graphic user interface
Left sidebar contains the tools avaliable for the system

Created Data:2017-09-4
Created By: Jiaqi Guo(Max) 

*/
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
acc[i].onclick = function() {
  this.classList.toggle("active");
  var panel = this.nextElementSibling;
  if (panel.style.maxHeight){
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
  } 
}
}

function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
    document.getElementById("map").style.marginLeft = "350px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("map").style.marginLeft= "0";
}






var button = document.createElement('button');
button.innerHTML = "⌨";

var handleSidebar = function(e) {
    document.getElementById("mySidenav").style.width = "350px";
    document.getElementById("map").style.marginLeft = "350px";
};

button.addEventListener('click', handleSidebar, false);

var element = document.createElement('div');
element.className = 'open-sidebar ol-unselectable ol-control';
element.appendChild(button);

var RotateNorthControl = new ol.control.Control({
    element: element
});
map.addControl(RotateNorthControl);

// select region from JSON vector data            

var coords;
var select = new ol.interaction.Select();
    map.addInteraction(select);

// var selectedFeature = select.getFeatures();           

selectclick = select;
selectclick.on('select', function(e)
{ 
  if (e!== null)
  {
  console.log(e),
  coords = e.selected[0].c.target.s;
  console.log(coords);
  }
});