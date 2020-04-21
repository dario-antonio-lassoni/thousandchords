<?php
  session_start();
  require_once __DIR__ . "/config.php";
  
  include DIR_UTIL . "dbUtility.php";
  
  $searchField = sql_inj_filter('GET','input_search');
  $page = $_GET['page'];


  if(mysqli_connect_error()){
    die("Errore di connesione al DB (".mysqli_connect_errno().") ".mysqli_connect_error());
  }else{
    $sql = "SELECT title, version, album, artist, genre, username, uploadDate, avgRating, c.id
            FROM song s INNER JOIN content c ON s.id = c.song
                        INNER JOIN user u ON c.user = u.id
            WHERE s.title LIKE '%" .$searchField. "%' 
            LIMIT 130"; //Limita la ricerca a 130 risultati, dunque a 13 pagine (grandezza minima table)
  }
    $result = $conn->query($sql); //RISULTATO SE QUERY ESEGUITA O MENO (?)
?>


<!DOCTYPE html>
<html lang="it">
	<head>
		<meta charset="utf-8"> 
    	<meta name = "description" content = "ThousandChords">
    	<meta name = "keywords" content = "Chords, Accordi, Canzoni, Musica">
		<title>ThousandChords</title>
    <link rel="stylesheet" type="text/css" href="../css/mainstyle.css">
    <link rel="shortcut icon" type="image/x-icon" href="../img/favicon.ico" />
    <script src="../js/misc.js"></script>

  	</head>

  	<body>
		<div class="wrapper">
      <div id="notification_bar"></div>


      <?php
        if(isset($_SESSION["message"])){
          echo "<script>addNotification(\"".$_SESSION["message"]."\");</script>";
          unset($_SESSION["message"]);
        }
      
        include DIR_BASE . "header.php";
			?>
			<div id="main_content">
        <?php 
          $numRows = mysqli_num_rows($result);
          echo "<div class=\"charts\">";
          //fetching
          if ($numRows > 0){
            for($j = 0; $j < ($numRows / 10); ++$j){ //numero di pagine risultati
              for($i = 0; $i < 10; ++$i){ //numero risultati per pagina
                $arrResultSet[$j][$i] = mysqli_fetch_assoc($result);
              }
            }

            //creazione tabella risultati
            echo "<table>";
            echo "<caption> Risultati per: \"" .$searchField. "\" pagina ".$page."</caption>";
            echo "<tbody>";
            echo "<tr><th>Titolo</th><th>Versione</th><th>Album</th><th>Artista</th><th>Genere</th><th>Utente</th><th>Data di caricamento</th><th>Voto</th></tr>";
            for($i = 0; $i < 10; ++$i){
              if($arrResultSet[$page-1][$i] != ""){ //se esiste ancora un risultato nella pagina indicata, stampa
                echo "<tr>";
                echo "  <td><a href=\"content.php?idcont=".$arrResultSet[$page-1][$i]["id"]."\">" .$arrResultSet[$page-1][$i]["title"]. "</a></td>";
                echo "  <td>" .$arrResultSet[$page-1][$i]["version"]."</td>"; 
                echo "  <td>" .$arrResultSet[$page-1][$i]["album"]. "</td>";
                echo "  <td>" .$arrResultSet[$page-1][$i]["artist"]. "</td>";
                echo "  <td>" .$arrResultSet[$page-1][$i]["genre"]. "</td>";
                echo "  <td>" .$arrResultSet[$page-1][$i]["username"]. "</td>";
                echo "  <td>" .$arrResultSet[$page-1][$i]["uploadDate"]. "</td>";
 							
                if($arrResultSet[$page-1][$i]["avgRating"] == NULL) 
								  echo "  <td>NV</td>";
							  else
								  echo "  <td>" .$arrResultSet[$page-1][$i]["avgRating"]. "<img src=\"../img/star.png\" alt=\"\" class=\"star\"></td>";
              
                echo "</tr>";  
              }            
            }
            echo "</tbody>";
            echo "</table>";
          }else{
            echo "Nessun risultato";
          }
          
          if($page > 1)
            echo "<a class=\"btn\" href=\"../php/search.php?input_search=".$searchField."&page=".($page - 1)."\"><img class=\"arrow\" alt=\"Indietro\" src=\"../img/left-arrow.png\"></a>";
       
          for($i = 0; $i < ($numRows / 10); ++$i){
            echo "<a class=\"btn\" href=\"../php/search.php?input_search=".$searchField."&page=".($i+1)."\">".($i+1)."</a>";
          }
          if($page < ($numRows / 10))
            echo "<a class=\"btn\" href=\"../php/search.php?input_search=".$searchField."&page=".($page + 1)."\"><img class=\"arrow\" alt=\"Avanti\" src=\"../img/right-arrow.png\"></a>";

          echo "</div>"; 

        
        ?>
      </div>
      <?php 
				include DIR_BASE . "footer.php";
			?>
		</div>
		

  	</body>
</html>