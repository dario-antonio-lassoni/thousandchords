<?php
    session_start();

    require_once __DIR__ . "/config.php";
    include DIR_UTIL . "dbUtility.php";
    
    $idContent = sql_inj_filter('GET', 'idcont');

    if(mysqli_connect_error()){
        die("Errore di connesione al DB (".mysqli_connect_errno().") ".mysqli_connect_error());
    }else{
        $sql = "select s.title, s.artist, c.content, c.version, c.id as contentId, u.username, c.avgRating
                from content c inner join song s on c.song = s.id
                               inner join user u on c.user = u.id
                where c.id ='" .$idContent. "'";
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
            for($i = 0; $i < $numRows; ++$i)
                $song = mysqli_fetch_assoc($result);

                if ($numRows > 0){
                echo "<div id=\"content\">";
                echo "<section id=\"infoContent\">";
                echo "<h3>\"" .$song["title"]. "\"" ." di " .$song["artist"]. "</h3>";
                echo "<p>Caricato da: " .$song["username"]. "</p>";
                echo "<p>Versione: " .$song["version"]. "</p>";

                if($song["avgRating"] == NULL)
                    echo "<p>Voto: Nessuna valutazione</p>";
                else
                    echo "<p>Voto: " .$song["avgRating"]. " <img src=\"../img/star.png\" alt=\"\" class=\"star\"></p>";
        
                include DIR_BASE . "ratingForm.php";
                
                echo "<hr>";
                echo "</section>";
                echo "<pre>";
                echo $song["content"];
                echo "</pre>";
                echo "</div>";
            }
        ?>


            </div>

            <div id="utility_bar">
                Autoscroll
                <button class="btn nomargin" id="start_stop_scroll" onclick="startScroll();">Start</button>
                <button class="btn nomargin" id="add_scroll" onclick="increaseSpeedScroll()">+</button>
                <button class="btn nomargin" id="sub_scroll" onclick="decreaseSpeedScroll()">-</button>
    
                Notazione
                <button class="btn nomargin" onclick="changeNotation()">Cambia</button>
                Trasponi chiave:
                <button class="btn nomargin" onclick="transposeDown()">-1</button>
                <button class="btn nomargin" onclick="transposeUp()">+1</button>
                <button class="btn nomargin" onclick="resetKey()">Reset</button>
            </div>
		</div>


        <script src="../js/contentUtility.js"></script>
        <script src="../js/showChord.js"></script>
        <script src="../js/variables.js"></script>

  	</body>
</html>