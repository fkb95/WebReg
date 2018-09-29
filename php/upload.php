<?php
session_start();
error_reporting(0);

function createThumbnail($new_width, $new_height, $extension)
{
    $path = "../src/img/";
    $filename = $_SESSION["username"];

    $mime = getimagesize($_FILES['upl']['tmp_name']);

    if($mime['mime']=='image/png'){ $src_img = imagecreatefrompng($_FILES['upl']['tmp_name']); }
    if($mime['mime']=='image/jpg'){ $src_img = imagecreatefromjpeg($_FILES['upl']['tmp_name']); }
    if($mime['mime']=='image/jpeg'){ $src_img = imagecreatefromjpeg($_FILES['upl']['tmp_name']); }
    if($mime['mime']=='image/pjpeg'){ $src_img = imagecreatefromjpeg($_FILES['upl']['tmp_name']); }

    $old_x          =   imageSX($src_img);
    $old_y          =   imageSY($src_img);

    if($old_x > $old_y) 
    {
        $thumb_w    =   $new_width;
        $thumb_h    =   $old_y*($new_height/$old_x);
    }

    if($old_x < $old_y) 
    {
        $thumb_w    =   $old_x*($new_width/$old_y);
        $thumb_h    =   $new_height;
    }

    if($old_x == $old_y) 
    {
        $thumb_w    =   $new_width;
        $thumb_h    =   $new_height;
    }

    $dst_img        =   ImageCreateTrueColor($thumb_w,$thumb_h);

    imagecopyresampled($dst_img,$src_img,0,0,0,0,$thumb_w,$thumb_h,$old_x,$old_y); 
    
    //------------------------------------Creazione vera e propria dell'immagine-----------------------------------
        $result = imagejpeg($dst_img,$path.$filename.".jpg",80);
        modifyimgpath("src/img/".$_SESSION["username"].".jpg");
    //--------------------------------------------------------------------------------------------------------------
    
    imagedestroy($dst_img); 
    imagedestroy($src_img);

    return $result;
}

function modifyimgpath($path){
    if(!is_null($path)){
        include('connection.php');
        $userid = $_SESSION["userid"];
        $db_connection = mysql_connect($db_ip,$db_user,$db_pass) or die ("Can't create a connection");
        mysql_select_db($db_name) or die ("Database not found");
        $sql="UPDATE user SET ProfileImage = '".$path."' WHERE UserID=".$userid.";";
        $query = mysql_query($sql) or die ("Query failed ".mysql_error());
        mysql_close();
    }
}

$allowed = array('png', 'jpg', 'gif','zip');

if(isset($_FILES['upl']) && $_FILES['upl']['error'] == 0){
    
    $width = 500;       //variabili per l'altezza massima del redimensionamento
    $heigth = 500;      //l'immagine viene scalata, e non diventa quindi per forza 100*100, ma 100*100 è la risoluzione massima
    
	$extension = pathinfo($_FILES['upl']['name'], PATHINFO_EXTENSION);

	if(!in_array(strtolower($extension), $allowed)){
		echo '{"status":"error"}';
		exit;
	}else{        
        createThumbnail($width, $heigth, $extension);
    exit;
    }    
}

echo '{"status":"error"}';
exit;
?>