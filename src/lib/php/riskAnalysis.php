<!--************************************************************** 
This code generate the model process functionality of the system

Created By: Jiaqi Guo(Max)  
Last Modified: 2017-09-18
***************************************************************-->

<?php
require('../../lib/fb/fb.php');

session_start();

$timeStamp = $_SESSION['Tstamp'];
FB::info($timeStamp);





function runPython()
{
    $CropDensity = $_REQUEST['CropDensity'];
    // FB::info($CropDensity);
    $DiseaseHistory = $_REQUEST['DiseaseHistory'];
    // FB::info($DiseaseHistory); 
    $RegionRisk = $_REQUEST['RegionRisk'];



    // FB::info($RegionRisk);  
    $riskArray = array($CropDensity, $DiseaseHistory,$RegionRisk);
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

    FB::info($riskValue);
    FB::info(gettype($riskValue[1]));
    $temp_cd = json_encode($riskValue[0]);
    $temp_dh = json_encode($riskValue[1]);
    $temp_rr = json_encode($riskValue[2]);

    $temp_array = json_encode($riskValue);
    FB::info($temp_array);
    FB::info(gettype($temp_array));
    $result = shell_exec('python3 ../py/riskcalc.py ' ."'".$temp_array."'");
    $result = shell_exec('python3 ../py/raster_calc.py '.'-A ../../../data/rain-data.tif -B ../../../data/cropping_history.tif --outfile=../../../data/riskmap1.tif --calc="A+B"');
    $result = shell_exec('python3 ../py/raster_calc.py '.'-A ../../../data/CropDensity.tif  -B ../../../data/riskmap1.tif --outfile=../../../data/riskmap.tif --calc="A+B"');
    $riskmap_path = "../../data/riskmap.tif";
    return ($riskmap_path);
}



$riskmap_save = "../php/temp/riskmap.tif";
$riskResult = runPython();



echo json_encode(array($riskResult));




?>
