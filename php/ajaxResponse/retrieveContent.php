<?php
  include "../util/dbUtility.php";
  $idContent = sql_inj_filter("POST","idContent");
    
  if(mysqli_connect_error()){
    die('Errore di connesione al DB ('.mysqli_connect_errno().') '.mysqli_connect_error());
  }else{
    $sql = "select s.title, s.album, s.artist, s.genre, c.content
            from content c INNER JOIN song s ON c.song = s.id
            where c.id =" .$idContent;
            
    $result = $conn->query($sql);


    if($result){
      $numRows = mysqli_num_rows($result);
      if ($numRows > 0){
        $arr = mysqli_fetch_assoc($result);
        echo json_encode($arr);
      }else{
        echo json_encode(0);
      }
    }
  }
?>