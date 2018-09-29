<?php

include('connection.php');

$myclassid = $_GET["myclassid"];

if(is_null($myclassid)){
    echo "classID or Year invalid";
}else{
    $db_connection = mysql_connect($db_ip,$db_user,$db_pass) or die ("Can't create a connection");
    mysql_select_db($db_name) or die ("Database not found");
    $sql="CALL getTeacherListForStudent(".$myclassid.");";
    $query = mysql_query($sql) or die ("Query failed ".mysql_error());
    mysql_close();
    
    $teachers = array();
    while(($row =  mysql_fetch_assoc($query))) {
        $teachers[] = $row;
    }
    echo json_encode($teachers);
}

?>