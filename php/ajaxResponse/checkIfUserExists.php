<?php
  include "../util/dbUtility.php";

  $username = sql_inj_filter('POST','username');

    
  if(mysqli_connect_error()){
    die('Errore di connesione al DB ('.mysqli_connect_errno().') '.mysqli_connect_error());
  }else{
    $sql = "select *
            from user
            where username ='" .$username."'";
            
    $result = $conn->query($sql);
    if($result){
      $numRow = mysqli_num_rows($result);
      if ($numRow == 1){
        echo 1;  //Ritorna 1 alla richiesta ajax se l'username esiste
      }else{
        echo 0; 
      }
    }
  }
?>