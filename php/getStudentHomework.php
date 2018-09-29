<?php

include('connection.php');

$classid = $_GET["classid"];
if(is_null($classid)){
    echo "data error";
}else{
    $db_connection = mysql_connect($db_ip,$db_user,$db_pass)
    or die ("Can't create a connection");

    mysql_select_db($db_name) 
    or die ("Database not found");

    $sql = "CALL getStudentHomework('".$classid."');";
    
    $query = mysql_query($sql) 
    or die ("Query failed".mysql_error());
    mysql_close();
    
    $homework = array();

    while(($row =  mysql_fetch_assoc($query))) {
        $homework[] = $row;
    }
    
    echo json_encode($homework);
}

?>