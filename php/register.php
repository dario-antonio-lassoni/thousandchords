<?php
  session_start();
  require_once __DIR__ . "/config.php";
  include DIR_UTIL . "dbUtility.php";
  $username = sql_inj_filter('POST','reg_username');
  $password = sql_inj_filter('POST','reg_password');  
  $email = sql_inj_filter('POST','reg_email');

  if(mysqli_connect_error()){
    die('Errore di connesione al DB ('.mysqli_connect_errno().') '.mysqli_connect_error());
  }else{
    $sql = "insert into user (username, password, eMail, registrationDate)
            values('".$username."','".$password."','".$email."', CURRENT_DATE)";

    $result = $conn->query($sql);
    if($result){
      $msg = "Utente registrato correttamente";
    }else{
      $msg = "Errore durante la registrazione";
    }
    $_SESSION["message"] = $msg;
    
    header("Location: {$_SERVER['HTTP_REFERER']}"); //redirect alla pagina visitata precedentemente
    exit;
  }
?>