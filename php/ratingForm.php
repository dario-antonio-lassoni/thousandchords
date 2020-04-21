<?php
  include_once DIR_UTIL . "dbUtility.php";

  if(isLogged()){

    if(mysqli_connect_error()){
      die('Errore di connesione al DB ('.mysqli_connect_errno().') '.mysqli_connect_error());
    }else{
      $sql = "SELECT rating
              FROM rating
              WHERE user ='" .$_SESSION['userId']. "' AND content ='" .$song["contentId"]."'";
              
      $result = $conn->query($sql);
      $query = mysqli_fetch_assoc($result);
      if($result){
        $numRow = mysqli_num_rows($result);
        if ($numRow == 0){      
          echo "<form method = \"POST\" action=\"rating.php\">";  
          echo "<input type=\"hidden\" name=\"userId\" value=".$_SESSION['userId'].">";
          echo "<input type=\"hidden\" name=\"contentId\" value=".$song["contentId"].">";
          echo "<p>Valuta il contenuto:</p>";
          for($i = 0; $i < 5; ++$i){
            echo "<button type=\"submit\" class=\"starRating out\" name=\"rating\" value=".($i+1)."></button>"; 
          }
          echo "<script src=\"../js/rating.js\"></script>";
          echo "</form>"; 
        }else{
          echo "La tua valutazione: ".$query["rating"]. " <img src=\"../img/star.png\" alt=\"\" class=\"star\">";
        }
      }
    }
  }else{
    echo "Accedi per valutare il contenuto";
  }
?>