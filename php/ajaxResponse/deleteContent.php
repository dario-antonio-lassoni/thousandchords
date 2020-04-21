<?php
  session_start();
  include "../util/dbUtility.php";

  $idContent = sql_inj_filter('POST','idContent');
  

  if(mysqli_connect_error()){
    die('Errore di connesione al DB ('.mysqli_connect_errno().') '.mysqli_connect_error());
  }else{
    $sql = "CALL deleteContent(".$idContent.");";

    $result = $conn->query($sql);
    //-- serve l'if???
    if($result){
      echo 1;
    }else{
      echo 0;
    }
 }
?>