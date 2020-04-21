<?php
  session_start();
  include "../util/dbUtility.php";

  $title = $_POST['title'];
  $album = sql_inj_filter('POST','album');
  $artist = sql_inj_filter('POST','artist');
  $genre = sql_inj_filter('POST','genre');
  $content = sql_inj_filter('POST','content');
  $idContent = sql_inj_filter("POST", "idContent");

  if(mysqli_connect_error()){
    die('Errore di connesione al DB ('.mysqli_connect_errno().') '.mysqli_connect_error());
  }else{
    $sql = "CALL editContent(".$idContent.",\"".$title."\",\"".$album."\",\"".$artist."\",\"".$genre."\",\"".$content."\");";

    $result = $conn->query($sql);
    
    //Serve?
    if($result){
      echo 1;
    }else{
      echo 0;
    }
 }
?>