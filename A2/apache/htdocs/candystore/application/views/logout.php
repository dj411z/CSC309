<?php
	session_start();
	header("Cache-Control: no cache, must-revalidate"); 
	$_SESSION = array();
	setcookie("loggedIn");
	setcookie("count");
	$referer = $_SERVER["HTTP_REFERER"];
	$url = parse_url($referer);
	header("Location: " .$url["path"]);
?>

