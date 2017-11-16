<?php
// *************************************************************
// This code generate the data download functionality of the system
// Created By: Jiaqi Guo(Max)  
// Last Modified: 2017-09-18
// **************************************************************


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


session_start();
$date = new DateTime();
$timeStamp = (string)$date->format('U');
$_SESSION['Tstamp'] = $timeStamp;

FB::info("TimeStampNumber: ".$timeStamp);


// adding TimeStamp to data name
$croppingHistory = "croppingHistory".$timeStamp.".tif";
$rainCalc = "rainCalc".$timeStamp.".tif";
$aveSoil = "AveSoil".$timeStamp.".tif";
$pMatrix = "pMatrix".$timeStamp.".tif";
$rain6h = "rain6h".$timeStamp.".tif";
$rain2w = "rain2w".$timeStamp.".tif";
$satIndex = "satIndex".$timeStamp.".tif";
$temperature = "temperature".$timeStamp.".tif";
$wetIndex = "wetIndex".$timeStamp.".tif";

$url_cropping_history = 'http://ulysses.gis.agr.gc.ca:8080/geoserver/ows?service=WCS&version=2.0.1&request=GetCoverage&CoverageId=PlantDisease:crophistor_geo&subset=Long('.$minX.','.$maxX.')&subset=Lat('.$minY.','.$maxY.')';
$url_rainCalc = 'http://localhost:8080/geoserver/ows?service=WCS&version=2.0.1&request=GetCoverage&CoverageId=AOI:rainCalc&&subset=Long('.$minX.','.$maxX.')&subset=Lat('.$minY.','.$maxY.')';
$url_aveSoil = 'http://localhost:8080/geoserver/ows?service=WCS&version=2.0.1&request=GetCoverage&CoverageId=AOI:AveSoil&subset=Long('.$minX.','.$maxX.')&subset=Lat('.$minY.','.$maxY.')';
$url_pMatrix = 'http://localhost:8080/geoserver/ows?service=WCS&version=2.0.1&request=GetCoverage&CoverageId=AOI:pmatrix&&subset=Long('.$minX.','.$maxX.')&subset=Lat('.$minY.','.$maxY.')';
$url_rain6h = 'http://localhost:8080/geoserver/ows?service=WCS&version=2.0.1&request=GetCoverage&CoverageId=AOI:rain6h&subset=Long('.$minX.','.$maxX.')&subset=Lat('.$minY.','.$maxY.')';
$url_rain2w = 'http://localhost:8080/geoserver/ows?service=WCS&version=2.0.1&request=GetCoverage&CoverageId=AOI:rain2w&&subset=Long('.$minX.','.$maxX.')&subset=Lat('.$minY.','.$maxY.')';
$url_satIndex = 'http://localhost:8080/geoserver/ows?service=WCS&version=2.0.1&request=GetCoverage&CoverageId=AOI:satIndex&subset=Long('.$minX.','.$maxX.')&subset=Lat('.$minY.','.$maxY.')';
$url_temperature = 'http://localhost:8080/geoserver/ows?service=WCS&version=2.0.1&request=GetCoverage&CoverageId=AOI:temperature&&subset=Long('.$minX.','.$maxX.')&subset=Lat('.$minY.','.$maxY.')';
$url_wetIndex = 'http://localhost:8080/geoserver/ows?service=WCS&version=2.0.1&request=GetCoverage&CoverageId=AOI:wetindex&&subset=Long('.$minX.','.$maxX.')&subset=Lat('.$minY.','.$maxY.')';




// Testing to see if data pass in fine from FirePHP
FB::info($minX);
FB::info($minY);
FB::info($maxX);
FB::info($maxY);


function downloadData ($serverUrl, $fileName)
{

// Setup the headers and post options, then execute curlPOST  
$ch_work = curl_init($serverUrl);    

curl_setopt($ch_work, CURLOPT_RETURNTRANSFER, 1);

$ch_result = curl_exec($ch_work);
$contentType = curl_getinfo($ch_work, CURLINFO_CONTENT_TYPE);

curl_close($ch_work);

$filesave = "../../../data/".$fileName;
file_put_contents($filesave, $ch_result);


}

downloadData($url_cropping_history,$croppingHistory);
downloadData($url_rainCalc,$rainCalc);
downloadData($url_aveSoil,$aveSoil);
downloadData($url_pMatrix,$pMatrix);
downloadData($url_rain6h,$rain6h);
downloadData($url_rain2w,$rain2w);
downloadData($url_satIndex,$satIndex);
downloadData($url_temperature,$temperature);
downloadData($url_wetIndex,$wetIndex);


$download_path = "../../data/".$rainCalc;
$cropping_path = "../../data/".$croppingHistory;
echo json_encode(array($download_path,$cropping_path));



?>
