<?php


$date = new DateTime();
$timestamp = (string)$date->format('U');


session_start();

echo 'this is page 1';

$_SESSION['Tstamp'] = $timestamp;

echo '<br/><a href="time2.php"> time2 </a>';

echo gettype($timestamp) ."\n";
echo "this is a timestamp: " . $timestamp;
?>
