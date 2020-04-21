<?php
  include "../util/dbUtility.php";
  
  $chord = sql_inj_filter('POST','chord');
    
  if(mysqli_connect_error()){
    die('Errore di connesione al DB ('.mysqli_connect_errno().') '.mysqli_connect_error());
  }else{
    $sql = "select name, numVariations, imgpath, imgtype
            from chord
            where name ='" .$chord."'";
            
    $result = $conn->query($sql);

    if($result){
      $numRows = mysqli_num_rows($result);
      if ($numRows > 0){
        for($i = 0; $i < $numRows; ++$i){
            $arrChord = mysqli_fetch_assoc($result);
        }
        echo json_encode($arrChord);
      }else{
        echo json_encode(0); //caso errore: accordo non trovato nel db
      }
    }
  }
?>