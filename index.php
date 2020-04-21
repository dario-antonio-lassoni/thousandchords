<?php
	session_start();
  require_once __DIR__ . "/php/config.php";
  include DIR_UTIL . "dbUtility.php";

  if(mysqli_connect_error()){
    die("Errore di connesione al DB (".mysqli_connect_errno().") ".mysqli_connect_error());
  }else{
    $sql = "SELECT title, version, album, artist, genre, username, uploadDate, avgRating, c.id /* TOP 10 QUERY*/
            FROM song s INNER JOIN content c ON s.id = c.song
                        INNER JOIN user u ON c.user = u.id
            ORDER BY avgRating DESC
            LIMIT 10;";
  }
    $result = $conn->query($sql); 
?>

<!DOCTYPE html>
<html lang="it">
	<head>
		<meta charset="utf-8"> 
    <meta name = "description" content = "ThousandChords">
		<meta name = "keywords" content = "Chords, Accordi, Canzoni, Musica">
		<title>ThousandChords</title>
		<link rel="stylesheet" type="text/css" href="css/mainstyle.css">
		<link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico" />
		<script src="js/misc.js"></script>
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
						for($i = 0; $i < 10; ++$i){ //10 risultati da restituire
							$arrResultSet[$i] = mysqli_fetch_assoc($result);
						}
						

						//creazione tabella risultati
						echo "<table>";
						echo "<caption>TOP 10</caption>";
						echo "<tbody>";
						echo "<tr><th>Titolo</th><th>Versione</th><th>Album</th><th>Artista</th><th>Genere</th><th>Utente</th><th>Data di caricamento</th><th>Voto</th></tr>";
						for($i = 0; $i < 10; ++$i){
						if($arrResultSet[$i] != ""){ //se esiste ancora un risultato nella pagina indicata, stampa
							echo "<tr>";
							echo "  <td><a href=\"php/content.php?idcont=".$arrResultSet[$i]["id"]."\">" .$arrResultSet[$i]["title"]. "</a></td>";
							echo "  <td>" .$arrResultSet[$i]["version"]."</td>"; 
							echo "  <td>" .$arrResultSet[$i]["album"]. "</td>";
							echo "  <td>" .$arrResultSet[$i]["artist"]. "</td>";
							echo "  <td>" .$arrResultSet[$i]["genre"]. "</td>";
							echo "  <td>" .$arrResultSet[$i]["username"]. "</td>";
							echo "  <td>" .$arrResultSet[$i]["uploadDate"]. "</td>";
							
							if($arrResultSet[$i]["avgRating"] == NULL) 
								echo "  <td>NV</td>";
							else
								echo "  <td>" .$arrResultSet[$i]["avgRating"]. "<img src=\"img/star.png\" alt=\"\" class=\"star\">";
							
							echo "</tr>";  
						}            
						}
						echo "</tbody>";
						echo "</table>";
					}else{
						echo "Nessun risultato";
					}
					echo "</div>"; 
					
				?>
      
			</div>
			<?php 
				include DIR_BASE . "footer.php";
			?>
		</div>

  	</body>
</html>