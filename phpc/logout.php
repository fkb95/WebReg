<?php

$cookiename = $_GET["cookiename"];

if(isset($_COOKIE[$cookiename])){
    setcookie($cookiename, "", time()-2592000, '/webreg');
	echo "logout succes";
}else{
	echo "logout error";	
}

?>