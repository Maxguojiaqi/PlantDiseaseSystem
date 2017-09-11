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
    $CropDensity = $_REQUEST['CropDensity'];
    FB::info($CropDensity);
    $DiseaseHistory = $_REQUEST['DiseaseHistory'];
    FB::info($DiseaseHistory); 
    $RegionRisk = $_REQUEST['RegionRisk'];
    FB::info($RegionRisk);  
    // FB::info($CropDensity);
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


    // echo $temp_cd;
    FB::info($temp_array);
    FB::info(gettype($temp_array));
    // unlink("../php/temp/riskmap.tif");
    // unlink("../php/temp/riskmap1.tif");
    
    $result = shell_exec('python3 ../py/riskcalc.py ' ."'".$temp_array."'");
    $result = shell_exec('python3 ../py/raster_calc.py '.'-A ../../../data/rain-data.tif -B ../../../data/cropping_history.tif --outfile=../../../data/riskmap1.tif --calc="A+B"');
    $result = shell_exec('python3 ../py/raster_calc.py '.'-A ../../../data/CropDensity.tif  -B ../../../data/riskmap1.tif --outfile=../../../data/riskmap.tif --calc="A+B"');
    // FB::info($result);
    $riskmap_path = "../../data/riskmap.tif";
    return ($riskmap_path);
}


// unlink("../php/temp/CropDensity.tif");

$riskmap_save = "../php/temp/riskmap.tif";
$riskResult = runPython();

// chmod()
$path = realpath($riskmap_save);
FB::info($path);

chmod($path, 666);
if (is_writable($path))
{
    unlink("../php/temp/riskmap.tif");
}

else 
    FB::info("file is not writable()");

echo json_encode(array($riskResult));

// $clean = shell_exec('python3 ../SCRIPT/python/cleanup.py'); json_encode


?>
