<?php
  session_start();
  include "../util/dbutility.php";

  $title = sql_inj_filter('POST','title');
  $album = sql_inj_filter('POST','album');
  $artist = sql_inj_filter('POST','artist');
  $genre = sql_inj_filter('POST','genre');
  $content = sql_inj_filter('POST','content');
  
  if(mysqli_connect_error()){
    die('Errore di connesione al DB ('.mysqli_connect_errno().') '.mysqli_connect_error());
  }else{
    $sql = "CALL addContent(".$_SESSION["userId"].",\"".$title."\",\"".$album."\",\"".$artist."\",\"".$genre."\",\"".$content."\");";

    $result = $conn->query($sql);
    
    //Serve?
    if($result){
      echo $content;
    }else{
      echo 0;
    }
 }
?>