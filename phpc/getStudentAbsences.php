<?php

include('connection.php');

$studentid = $_GET["studentid"];

if(is_null($studentid)){
    echo "UserID invalid";
}else{
    $db_connection = mysql_connect($db_ip,$db_user,$db_pass) or die ("Can't create a connection");
    mysql_select_db($db_name) or die ("Database not found");
    $sql="CALL getStudentAbsences(".$studentid.");";
    $query = mysql_query($sql) or die ("Query failed ".mysql_error());
    mysql_close();
    $absences = array();

    while(($row =  mysql_fetch_assoc($query))) {
        $absences[] = $row;
    }
    
    echo json_encode($absences);
}

?>