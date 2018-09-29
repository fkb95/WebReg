<?php

include('connection.php');

$userid = $_GET["userid"];
$classid = $_GET["classid"];

if(is_null($userid) or is_null($classid)){
    echo "data error";
}else{
    $db_connection = mysql_connect($db_ip,$db_user,$db_pass)
    or die ("Can't create a connection");

    mysql_select_db($db_name) 
    or die ("Database not found");

    $sql = "CALL getStudentSubjects('".$userid."','".$classid."');";
    
    $query = mysql_query($sql) 
    or die ("Query failed".mysql_error());
    mysql_close();
    
    $subjects = array();

    while(($row =  mysql_fetch_assoc($query))) {
        $subjects[] = $row;
    }
    
    echo json_encode($subjects);
}

?>