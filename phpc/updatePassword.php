<?php

include('connection.php');

$accountid = $_GET["accountid"];
$oldpassword = $_GET["oldpassword"];
$newpassword = $_GET["newpassword"];
$newpassword2 = $_GET["newpassword2"];

if(is_null($oldpassword) or is_null($newpassword) or is_null($newpassword2)){
    echo "Invalid data";
}else{
    if($newpassword = $newpassword2){
        $db_connection = mysql_connect($db_ip,$db_user,$db_pass) or die ("Can't create a connection");
        mysql_select_db($db_name) or die ("Database not found");
        $sql="CALL updatePassword(".$accountid.",'".$newpassword."');";
        $query = mysql_query($sql) or die ("Query failed ".mysql_error());
        mysql_close();
        echo "Password changed.";
    }else{
        echo "New passwords don't match.";
    }    
}

?>