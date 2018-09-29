<?php

include('connection.php');

$userid = $_GET["userid"];
$year = $_GET["year"];

if(is_null($userid) or is_null($year)){
    echo "UserID or Year invalid";
}else{
   $db_connection = mysql_connect($db_ip,$db_user,$db_pass) or die ("Can't create a connection");
    mysql_select_db($db_name) or die ("Database not found");
    $sql="CALL getStudentClass(".$userid.",".$year.");";
    $query = mysql_query($sql) or die ("Query failed ".mysql_error());
    $class = mysql_fetch_array($query);
    mysql_close();
    echo json_encode($class); 
}

?>