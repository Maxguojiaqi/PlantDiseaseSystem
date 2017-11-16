<?php

// ************************************************************** 
// This code generate the model process functionality of the system

// Created By: Jiaqi Guo(Max)  
// Last Modified: 2017-09-18
// ***************************************************************




require('../../lib/fb/fb.php');

session_start();

$timeStamp = $_SESSION['Tstamp'];
FB::info("TimeStampNumber: ".$timeStamp);


// $croppingHistory = "croppingHistory".$timeStamp.".tif";
// $rainData = "rainData".$timeStamp.".tif";
// $Riskmap1 = "riskmap1".$timeStamp.".tif";
// $Riskmap = "riskmap".$timeStamp.".tif";
// $CropDensity = "CropDensity".$timeStamp.".tif";

function runPython($timeStamp)
{

    $croppingHistory = "croppingHistory".$timeStamp.".tif";
    $rainData = "rainCalc".$timeStamp.".tif";
    $Riskmap1 = "risk".$timeStamp.".tif";
    $Riskmap = "riskmap".$timeStamp.".tif";
    $CropMap = "CropDensity".$timeStamp.".tif";

    $CropDensity = $_REQUEST['CropDensity'];
    // FB::info($CropDensity);
    $DiseaseHistory = $_REQUEST['DiseaseHistory'];
    // FB::info($DiseaseHistory); 
    $RegionRisk = $_REQUEST['RegionRisk'];



    // FB::info($RegionRisk);  
    $riskArray = array($CropDensity,$DiseaseHistory,$RegionRisk);
    $riskValue = array();

    foreach($riskArray as $riskFactor)
    {
        if($riskFactor == 0)
        {
            $riskValue[] = 0;
        }

        else if ($riskFactor == 1)
        {
            $riskValue[] = 5;
        }
        else 
        {
            $riskValue[] = 10;
        }
    }
    $timeStamp = (int)$timeStamp;
    FB::info("TimeStampNumber: ".$timeStamp);
    array_push($riskValue,$timeStamp);
    FB::info($riskValue);
    FB::info(gettype($riskValue[1]));
    $temp_cd = json_encode($riskValue[0]);
    $temp_dh = json_encode($riskValue[1]);
    $temp_rr = json_encode($riskValue[2]);

    $temp_array = json_encode($riskValue);
    FB::info($temp_array);
    FB::info(gettype($temp_array));

    $result = shell_exec('python3 ../py/riskcalc.py ' ."'".$temp_array."'");
    $result = shell_exec('python3 ../py/raster_calc.py '.'-A ../../../data/'.$rainData.' -B ../../../data/'.$croppingHistory.' --outfile=../../../data/'.$Riskmap1.' --calc="A+B"');
    $result = shell_exec('python3 ../py/raster_calc.py '.'-A ../../../data/'.$CropMap.' -B ../../../data/'.$Riskmap1.' --outfile=../../../data/'.$Riskmap.' --calc="A+B"');
}



$riskmap_path = "../../data/"."riskmap".$timeStamp.".tif";
$riskResult = runPython($timeStamp);

FB::info($riskmap_path);

echo json_encode(array($riskmap_path));




?>
