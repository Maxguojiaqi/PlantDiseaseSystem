<!--*************************************************************
This code generate the data download functionality of the system

Created By: Jiaqi Guo(Max)  
Last Modified: 2017-09-18
**************************************************************-->

<?php
require('../../lib/fb/fb.php');

// Request data from JavaScript

if (empty($_REQUEST["minX"]) || empty($_REQUEST["minY"]) || empty($_REQUEST["maxX"]) || empty($_REQUEST["maxY"]) || !is_numeric($_REQUEST["minX"]) || !is_numeric($_REQUEST["minY"]) || !is_numeric($_REQUEST["maxX"]) || !is_numeric($_REQUEST["maxY"]))
{
    // Throws error if inputs aren't entered or numeric. 
    $errMsg = "*Error, All fields are required and must be WGS84 coordinates.";    
}

else
{
	$minX = $_REQUEST['minX'];
	$minY = $_REQUEST['minY'];
	$maxX = $_REQUEST['maxX'];
	$maxY = $_REQUEST['maxY'];   	     
}     

// Testing to see if data pass in fine from FirePHP
FB::info($minX);
FB::info($minY);
FB::info($maxX);
FB::info($maxY);

$url_cropping_history = 'http://ulysses.gis.agr.gc.ca:8080/geoserver/ows?service=WCS&version=2.0.1&request=GetCoverage&CoverageId=PlantDisease:crophistor_geo&subset=Long('.$minX.','.$maxX.')&subset=Lat('.$minY.','.$maxY.')';

// Setup the headers and post options, then execute curlPOST  
$ch_rain = curl_init($url_cropping_history);    

curl_setopt($ch_rain, CURLOPT_RETURNTRANSFER, 1);

$ch_result_cropping_history = curl_exec($ch_rain);
$contentType = curl_getinfo($ch_rain, CURLINFO_CONTENT_TYPE);

curl_close($ch_rain);

$filesave_cropping_history = "../../../data/cropping_history.tif";
file_put_contents($filesave_cropping_history, $ch_result_cropping_history);

$cropping_path = "../../data/cropping_history.tif";

// getting WCS data from geoserver using url

$url_rain = 'http://ulysses.gis.agr.gc.ca:8080/geoserver/ows?service=WCS&version=2.0.1&request=GetCoverage&CoverageId=PlantDisease:rain&&subset=Long('.$minX.','.$maxX.')&subset=Lat('.$minY.','.$maxY.')';
FB::info($url_rain);

// Setup the headers and post options, then execute curlPOST 

$ch = curl_init($url_rain);    
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
FB::trace("function working");
$ch_result_soil = curl_exec($ch);

$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
FB::info($contentType);
curl_close($ch);
FB::trace("function worked");

// Check if the file is correct .tif format

$reader = new XMLReader();
$reader->xml(ch_result_soil);
if ($reader->read())
	{
		$errMsg = "\n\n" . date("Y-m-d H:i:s") . " ERROR " . $_SERVER["REQUEST_TIME"] . "\n\t " . __FILE__ . "\n\t Request XML error: POST request returned without a valid GeoTIFF.\n\t Refer to XML for info:\n\t XML Response:\n\t url: {$url}\n\t xml:\n\t {$ch_result} ";
		file_put_contents("error/errorlog.txt", $errMsg, FILE_APPEND);
		return("this is an error save tiff file");
	}
else
	{
		$filesave = "../../../data/rain-data.tif";
		file_put_contents($filesave, $ch_result_soil);
		$download_path = "../../data/rain-data.tif";
		return ($download_path);
	}

echo json_encode(array($download_path,$cropping_path));



?>
