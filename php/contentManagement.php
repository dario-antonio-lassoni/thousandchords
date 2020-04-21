<?php
	session_start();
	require_once __DIR__ . "/config.php";
	require_once DIR_UTIL . "/session.php"; 
	include DIR_UTIL . '/dbUtility.php';

	if(mysqli_connect_error()){
		die('Errore di connesione al DB ('.mysqli_connect_errno().') '.mysqli_connect_error());
	}else{
		$sql = "SELECT s.*, c.id AS idContent, c.version
				FROM content c INNER JOIN song s ON c.song = s.id
							WHERE user = ".$_SESSION["userId"]. ";";

		$result = $conn->query($sql);
			$numRows = mysqli_num_rows($result);
	}
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
		<script src="../js/contentUtility.js"></script>
		<script src="../js/contentManagement.js"></script>
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

			if(isLogged()){

						if ($numRows > 0){
							//creazione risultati
							for($i = 0; $i < $numRows; ++$i){
								$songs[$i] = mysqli_fetch_assoc($result);
							}
				?>
				<div class="container">
					Contenuti caricati:
					<select id="idContent">
				<?php
							for($i = 0; $i < $numRows; ++$i){
								echo "<option value=\"".$songs[$i]["idContent"]."\">".$songs[$i]["title"]." | ver.".$songs[$i]["version"]." | ".$songs[$i]["album"]." | ".$songs[$i]["artist"]."</option>";
							}
				?>
					</select>
					<input type="submit" id="btn_delete" class="btn" onclick="deleteContent();" value="Elimina">
					<input type="submit" id="btn_modify" class="btn" onclick="enableEditContent();" value="Modifica">
				
				</div>
				<?php
						}   
				?>
				
				
				<div class="container">
				(*) Campo obbligatorio
					<p>
						Titolo: <input type="text" name="title" placeholder="* Max 30 caratteri">
						Album: <input type="text" name="album" placeholder="Max 30 caratteri">
						Artista: <input type="text" name="artist" placeholder="* Max 30 caratteri">
						Genere: 
						<select name="genre">
							<option value="Pop">Pop</option>
							<option value="Rock">Rock</option>
							<option value="Hip Hop">Hip Hop</option>
							<option value="Blues">Blues</option>
							<option value="Jazz">Jazz</option>
							<option value="Rhythm & Blues">Rhythm & Blues</option>
							<option value="Metal">Metal</option>
							<option value="Reggae">Reggae</option>
						</select>
					</p>
					<p>
						<button type="button" class="btn" onclick="insertChord();">Inserisci accordo</button>
						<button type="button"  class="btn" onclick="updatePreview();">Aggiorna anteprima</button>
						<button type="button" id="btn_upload" class="btn" onclick="uploadContent();">Carica</button>
					</p>
					
					<textarea id="input_content" name="content" placeholder="* Inserisci qui il tuo contenuto..."></textarea>
					Anteprima:
					<div id="content" class="preview"></div>
				</div>
			</div>
			<?php 
				}else{ //Se non è loggato
					header("Location: ../"); //redirect all'index
      		exit;
				}
				include DIR_BASE . "footer.php";
			?>
		</div>
		
  	</body>
</html>