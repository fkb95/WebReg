<?php
session_start();
error_reporting(0);
include('connection.php');

$db_table = "accountwithuser";
$username = $_GET["username"];
$password = $_GET["password"];
$remember = $_GET["remember"];
$md5password = md5($password);
$_SESSION["username"] = $username;

if(is_null($username) or is_null($password)){
    echo "Username or password empty";
}else{
    $db_connection = mysql_connect($db_ip,$db_user,$db_pass) or die ("Can't create a connection");
    mysql_select_db($db_name) or die ("Database not found");
    $sql = "CALL getAccountWithUser('".$username."','".$md5password."');";    
    $query = mysql_query($sql) or die ("Query failed".mysql_error());
    mysql_close();
    
    $users = array();
    while(($row =  mysql_fetch_assoc($query))) {
        $users[] = $row;
    }
    $_SESSION["userid"] = $users[0]["UserID"];
    echo json_encode($users);
}

?>
