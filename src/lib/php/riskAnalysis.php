<?php

// ob_strart();
// $firephp = FirePHP::getInstance(true);
// $todays_date = date(‘l jS of F Y h:i:s A‘);
// $firephp->log($todays_date, ‘Date‘);
// FB::info('Info message');
// FB::warn('Warn message');
// FB::error('Error message');
// FB::trace('Simple Trace');

require('../../lib/fb/fb.php');


// FB::info(simplexml_load_file("info.xml"));          $_REQUEST['CropDensity'];   $_REQUEST['DiseaseHistory']; $_REQUEST['RegionRisk'];  


function runPython()
{
    $CropDensity =  $_REQUEST['CropDensity'];
    FB::info($CropDensity);
    $DiseaseHistory = $_REQUEST['DiseaseHistory'];  
    FB::info($DiseaseHistory); 
    $RegionRisk = $_REQUEST['RegionRisk']; 
    FB::info($RegionRisk);  
    // FB::info($CropDensity);

    if ($CropDensity == 0)
    {
    	$CropDensity = 0;
    }
    else if ($CropDensity == 1)
    {
    	$CropDensity = 5;
    }
    else 
    {
    	$CropDensity = 10;
    }


    if ($DiseaseHistory==0)
    {
        $DiseaseHistory = 5;
    }
    else if ($DiseaseHistory ==1)
    {
        $DiseaseHistory = 10;
    }
    else 
    {
        $DiseaseHistory = 15;
    }


    if ($RegionRisk==0)
    {
        $RegionRisk = 10;
    }
    else if ($RegionRisk ==1)
    {
        $RegionRisk = 20;
    }
    else 
    {
        $RegionRisk = 30;
    }

    FB::info($CropDensity);

    FB::info(gettype($CropDensity));
    $CropDensity = (int)$CropDensity;
    $DiseaseHistory = (int)$DiseaseHistory;
    $RegionRisk = (int)$RegionRisk;
    FB::info(gettype($CropDensity));
    FB::info($CropDensity);

    $temp_cd = json_encode($CropDensity);
    $temp_dh = json_encode($DiseaseHistory);
    $temp_rr = json_encode($RegionRisk);

    // echo $temp_cd;
    FB::info($temp_cd);
    $result = shell_exec('python3 ../py/riskcalc.py ' ."'".$temp_cd."'");
    $result = shell_exec('python3 ../py/raster_calc.py '.'-A ../../../data/rain-data.tif -B ../../../data/cropping_history.tif --outfile=../../../data/riskmap1.tif --calc="A+B"');
    $result = shell_exec('python3 ../py/raster_calc.py '.'-A ../../../data/CropDensity.tif  -B ../../../data/riskmap1.tif --outfile=../../../data/riskmap.tif --calc="A+B"');
    // FB::info($result);
    $riskmap_save = "../php/temp/riskmap.tif";
    $riskmap_path = "../../data/riskmap.tif";
    return ($riskmap_path);
}



$riskResult = runPython();

echo json_encode(array($riskResult));

// $clean = shell_exec('python3 ../SCRIPT/python/cleanup.py'); json_encode


?>
