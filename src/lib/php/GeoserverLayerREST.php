
<?php

// ************************************************************** 
// This code use cURL command to create,style a new layer on Geoserver 
// through Geoserver REST API
// Created By: Jiaqi Guo(Max)  
// Last Modified: 2017-09-22
// ***************************************************************


require('../../lib/fb/fb.php');

session_start();

$timeStamp = $_SESSION['Tstamp'];

FB::info($timeStamp+" from Rest.php");
function runGeoRest($timeStamp,$dataName)
{
  // FB::info("start working Rest");
  $dataname = $dataName;

  // FB::info($timeStamp);

  // Creating URL and xmlString 
  $urlStore="http://localhost:8080/geoserver/rest/workspaces/Canola/coveragestores?configure=all";
  $urlLayer="http://localhost:8080/geoserver/rest/workspaces/Canola/coveragestores/".$dataName.$timeStamp."/coverages";
  $urlStyle = "http://localhost:8080/geoserver/rest/layers/Canola:".$dataName.$timeStamp;

  $xmlStrStore = "<coverageStore>
   <name>".$dataName.$timeStamp."</name>
   <workspace>Canola</workspace>
   <enabled>true</enabled>
   <type>GeoTIFF</type>
   <url>/var/www/html/PlantDiseaseSys/data/".$dataName.$timeStamp.".tif</url>
   </coverageStore>";

   $xmlLayer = "<coverage>
    <name>".$dataName.$timeStamp."</name>
    <title>".$dataName.$timeStamp."</title>
    <srs>EPSG:4326</srs>
    </coverage>";

  $xmlStrStyle = "<layer><defaultStyle><name>".$dataName."</name></defaultStyle><enabled>true</enabled></layer>";

  //########################################################################################################################
  // Creating a new Store on Geoserver, using generated Rain.tif

  // Open log file
  $logfh = fopen("/var/www/html/PlantDiseaseSys/src/lib/php/GeoserverPHP.log", 'a') or die("can't open log file");
  $dateTimeZone = "TimeZone: ".date_default_timezone_get();
  $dateTime = date('Y-m-d H:i:s');
  fwrite($logfh ,"-----------------------------------------------------------------------------------"."\n");
  fwrite($logfh ,$dateTimeZone."\n");
  fwrite($logfh ,$dateTime."\n");

  // Initiate cURL session
  $ch = curl_init($urlStore);
  // Optional settings for debugging
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //option to return string
  curl_setopt($ch, CURLOPT_VERBOSE, 1);
  curl_setopt($ch, CURLOPT_STDERR, $logfh); // logs curl messages
  //Required POST request settings
  curl_setopt($ch, CURLOPT_POST, 1);
  $passwordStr = "admin:geoserver";
  curl_setopt($ch, CURLOPT_USERPWD, $passwordStr); // log on using user and password
  //POST data
  curl_setopt($ch, CURLOPT_HTTPHEADER,array("Content-type: application/xml"));

  curl_setopt($ch, CURLOPT_POSTFIELDS, $xmlStrStore); // actual post request

  //POST return code
  $successCode = 201;

  $buffer = curl_exec($ch); // Execute the curl request

  // Check for errors and process results
  $info = curl_getinfo($ch);
  if ($info['http_code'] != $successCode) {
    $msgStr = "# Unsuccessful cURL request to "."\n";
    $msgStr .= $urlStore." [". $info['http_code']. "]\n";
    fwrite($logfh, $msgStr);
  } else {
    $msgStr = "# Successful cURL request to ".$urlStore."\n";
    fwrite($logfh, $msgStr);
  }
  fwrite($logfh, $buffer."\n");

  curl_close($ch); // free resources if curl handle will not be reused
  fclose($logfh);  // close logfile


  // FB::info("store created");
  //########################################################################################################################
  // Creating a new Layer on Geoserver with the store

  // Open log file
  $logfh = fopen("/var/www/html/PlantDiseaseSys/src/lib/php/GeoserverPHP.log", 'a') or die("can't open log file");
  $dateTimeZone = "TimeZone: ".date_default_timezone_get();
  $dateTime = date('Y-m-d H:i:s');
  fwrite($logfh ,"-----------------------------------------------------------------------------------"."\n");
  fwrite($logfh ,$dateTimeZone."\n");
  fwrite($logfh ,$dateTime."\n");

  $ch = curl_init($urlLayer);
  // Optional settings for debugging
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //option to return string
  curl_setopt($ch, CURLOPT_VERBOSE, 1);
  curl_setopt($ch, CURLOPT_STDERR, $logfh); // logs curl messages
  //Required POST request settings
  curl_setopt($ch, CURLOPT_POST, 1);
  $passwordStr = "admin:geoserver";
  curl_setopt($ch, CURLOPT_USERPWD, $passwordStr); // log on using user and password
  //POST data
  curl_setopt($ch, CURLOPT_HTTPHEADER,array("Content-type: application/xml"));

  curl_setopt($ch, CURLOPT_POSTFIELDS, $xmlLayer); // actual post request

  //POST return code
  $successCode = 201;

  $buffer = curl_exec($ch); // Execute the curl request

  // Check for errors and process results
  $info = curl_getinfo($ch);
  if ($info['http_code'] != $successCode) {
    $msgStr = "# Unsuccessful cURL request to "."\n";
    $msgStr .= $urlLayer." [". $info['http_code']. "]\n";
    fwrite($logfh, $msgStr);
  } else {
    $msgStr = "# Successful cURL request to ".$urlLayer."\n";
    fwrite($logfh, $msgStr);
  }
  fwrite($logfh, $buffer."\n");

  curl_close($ch); // finish curl
  fclose($logfh);  // close logfile

  // FB::info("layer published");

  //######################################################################################################################
  // Styling the layer using representable color ramp

  // Open log file
  $logfh = fopen("/var/www/html/PlantDiseaseSys/src/lib/php/GeoserverPHP.log", 'a') or die("can't open log file");
  $dateTimeZone = "TimeZone: ".date_default_timezone_get();
  $dateTime = date('Y-m-d H:i:s');
  fwrite($logfh ,"-----------------------------------------------------------------------------------"."\n");


  $ch = curl_init($urlStyle);
  // Optional settings for debugging
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // option to return string
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");// generate a put request
  curl_setopt($ch, CURLOPT_VERBOSE, 1);
  curl_setopt($ch, CURLOPT_STDERR, $logfh); // logs curl messages
  curl_setopt($ch, CURLOPT_HTTPHEADER,array("Content-type: application/xml"));
  curl_setopt($ch, CURLOPT_POSTFIELDS, $xmlStrStyle); // actual put request sent
  $passwordStr = "admin:geoserver";
  curl_setopt($ch, CURLOPT_USERPWD, $passwordStr); // log on using user and password
  //POST data
  $buffer = curl_exec($ch); // Execute the curl request
  echo $buffer;

  // return code
  $successCode = 200;

  // Check for errors and process results
  $info = curl_getinfo($ch);
  if ($info['http_code'] != $successCode) {
    $msgStr = "# Unsuccessful cURL request to "."\n";
    $msgStr .= $urlStyle." [". $info['http_code']. "]\n";
    fwrite($logfh, $msgStr);
  } else {
    $msgStr = "# Successful cURL request to ".$urlStyle."\n";
    fwrite($logfh, $msgStr);
  }
  fwrite($logfh, $buffer."\n");

  curl_close($ch); // finish curl
  fclose($logfh);  // close logfile

  // FB::info("style added");
}


// $rain6h = "rain6h";
// $rain2w = "rain2w";

FB::info($timeStamp);
runGeoRest($timeStamp, "rain6h");
runGeoRest($timeStamp, "rain2w");
runGeoRest($timeStamp, "AveSoil");
runGeoRest($timeStamp, "satIndex");
runGeoRest($timeStamp, "wetIndex");
runGeoRest($timeStamp, "pMatrix");
runGeoRest($timeStamp, "temperature");
runGeoRest($timeStamp, "croppingHistory");

// echo json_encode(array($timeStamp));
echo json_encode(array($timeStamp));
?>