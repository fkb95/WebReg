<?php

include('connection.php');

$userid = $_GET["userid"];
$subjectid = $_GET["subjectid"];

if(is_null($userid) or is_null($subjectid)){
    echo "data error";
}else{
    $db_connection = mysql_connect($db_ip,$db_user,$db_pass)
    or die ("Can't create a connection");

    mysql_select_db($db_name) 
    or die ("Database not found");

    $sql = "CALL getStudentGradesForSubject('".$userid."','".$subjectid."');";
    
    $query = mysql_query($sql) 
    or die ("Query failed".mysql_error());
    mysql_close();
    
    $grades = array();

    while(($row =  mysql_fetch_assoc($query))) {
        $grades[] = $row;
    }
    
    echo json_encode($grades);
}

?>
