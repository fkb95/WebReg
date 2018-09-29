<?php

include('connection.php');

$db_connection = mysql_connect($db_ip,$db_user,$db_pass)
or die ("Can't create a connection");

mysql_select_db($db_name) or die ("Database not found");

$sql = "SELECT * FROM gradetype;";

$query = mysql_query($sql) or die ("Query failed".mysql_error());
mysql_close();

$gradetypes = array();

while(($row =  mysql_fetch_assoc($query))) {
    $gradetypes[] = $row;
}
    
echo json_encode($gradetypes);

?>