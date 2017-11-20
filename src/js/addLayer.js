/******************************************************************* 
This Code Generate Display Layer to Map function
Name: Jiaqi Guo(Max)
*******************************************************************/





$("#RainDisplay").click(function()
  {
    var RainType = document.getElementById("RainType").value;

    console.log(rain6h_map.getVisible());
    console.log(risk_map.getVisible());
    console.log(RainType);
    console.log(typeof(RainType));

    if (RainType == 0)
      {
        rain2w_map.setVisible(false);
        aveSoil_map.setVisible(false);
        satIndex_map.setVisible(false);
        wetIndex_map.setVisible(false);
        PM_map.setVisible(false);
        rain6h_map.setVisible(true);
        console.log(map.getTarget());
        console.log(rain6h_map.getVisible())

      }

    else if (RainType == 1)
    {
      rain6h_map.setVisible(false);
      aveSoil_map.setVisible(false);
      satIndex_map.setVisible(false);
      wetIndex_map.setVisible(false);
      PM_map.setVisible(false);
      rain2w_map.setVisible(true);
      console.log(map.getTarget());
      console.log(risk_map.getVisible())
     }
    
});


$("#A_SoilMoistureDisplay").click(function()
  {
    var A_SoilMoistureType = document.getElementById("A_SoilMoistureType").value;

    console.log(rain6h_map.getVisible());
    console.log(risk_map.getVisible());
    console.log(A_SoilMoistureType);
    console.log(typeof(A_SoilMoistureType));

    if (A_SoilMoistureType == 0)
      {
        rain2w_map.setVisible(false);
        rain6h_map.setVisible(false);
        satIndex_map.setVisible(false);
        wetIndex_map.setVisible(false);
        PM_map.setVisible(false);
        aveSoil_map.setVisible(true);

      }

    else if (A_SoilMoistureType == 1)
    {
      rain6h_map.setVisible(false);
      rain2w_map.setVisible(false);
      aveSoil_map.setVisible(false);
      wetIndex_map.setVisible(false);
      PM_map.setVisible(false);
      satIndex_map.setVisible(true);

      console.log(map.getTarget());
      console.log(risk_map.getVisible())
     }
    
});

$("#B_SoilMoistureDisplay").click(function()
  {
    var B_SoilMoistureType = document.getElementById("B_SoilMoistureType").value;

    console.log(rain6h_map.getVisible());
    console.log(risk_map.getVisible());
    console.log(B_SoilMoistureType);
    console.log(typeof(B_SoilMoistureType));

    if (B_SoilMoistureType == 0)
      {
        rain2w_map.setVisible(false);
        rain6h_map.setVisible(false);
        satIndex_map.setVisible(false);
        PM_map.setVisible(false);
        aveSoil_map.setVisible(false);
        wetIndex_map.setVisible(true);

      }

    else if (B_SoilMoistureType == 1)
    {
      rain6h_map.setVisible(false);
      rain2w_map.setVisible(false);
      aveSoil_map.setVisible(false);
      satIndex_map.setVisible(false);
      wetIndex_map.setVisible(false);
      PM_map.setVisible(true);
      console.log(map.getTarget());
      console.log(risk_map.getVisible())
     }
    
});


$("#RiskDisplay").click(function()
  {

    rain6h_map.setVisible(false);
    rain2w_map.setVisible(false);
    aveSoil_map.setVisible(false);
    satIndex_map.setVisible(false);
    wetIndex_map.setVisible(false);
    PM_map.setVisible(false);
    risk_map.setVisible(true);

    console.log(map.getTarget());
    console.log(risk_map.getVisible())
     
    
});