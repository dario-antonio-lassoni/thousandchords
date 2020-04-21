<?php
  session_start();
  include_once 'config.php';
  include_once DIR_UTIL . "dbUtility.php";
  $userId = sql_inj_filter("POST", "userId");
  $contentId = sql_inj_filter("POST", "contentId");  
  $rating = sql_inj_filter("POST", "rating");

  if($rating <= 0 || $rating > 5){ //Sicurezza nel caso venisse modificato il valore dall'inspector per la votazione
    header("Location: /php/content.php?idcont=" .$contentId);
    exit;
  }else{
    if(mysqli_connect_error()){
      die('Errore di connesione al DB ('.mysqli_connect_errno().') '.mysqli_connect_error());
    }else{
      $sql = "insert into RATING (user, content, rating)
              values('".$userId."','".$contentId."','".$rating."')";

      $result = $conn->query($sql);
      header("Location: /php/content.php?idcont=" .$contentId);
      exit;
    }
  }
?>