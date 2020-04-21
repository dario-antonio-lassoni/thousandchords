<?php

  $host = "localhost";
  $dbusername = "root";
  $dbpassword = "";
  $dbname = "thousandchords";
  
  $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

  function sql_inj_filter($method, $filtered_string){
    global $conn;
    if($method == "GET"){
      return mysqli_real_escape_string($conn, $_GET[$filtered_string]);
    }else if($method == "POST"){
      return mysqli_real_escape_string($conn, $_POST[$filtered_string]);
    }
  }

?>