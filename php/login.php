<?php
  session_start();
	require_once __DIR__ . "/config.php";
  require_once DIR_UTIL . "/session.php"; 
  include DIR_UTIL . "dbUtility.php";

  $username = sql_inj_filter('POST','username');
  $password = sql_inj_filter('POST','password');

  if(mysqli_connect_error()){
    die('Errore di connesione al DB ('.mysqli_connect_errno().') '.mysqli_connect_error());
  }else{
    $sql = "SELECT id, username
            FROM user
            WHERE username ='" .$username. "' AND password ='" .$password. "'";
            
    $result = $conn->query($sql);
    $query = mysqli_fetch_assoc($result);
    if($result){
      $numRow = mysqli_num_rows($result);
      if ($numRow != 1){
        $msg = "Password non valida";
      }else{
        setSession($query["username"], $query["id"]);
        $msg = "Accesso eseguito";
      }

      $_SESSION["message"] = $msg;


      header("Location: {$_SERVER['HTTP_REFERER']}"); //redirect alla pagina visitata precedentemente
      exit;
    }
  }
?>