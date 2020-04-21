<?php
  require_once __DIR__ . "/config.php";
  require_once DIR_UTIL . "/session.php";
?>

<div class="header">
    <a href="/"> <!-- link homepage -->
      <div id="logo"></div>
    </a>

<?php 
    if(isLogged()){
?>
      <button class="btn" id="log" onclick="window.location='/php/logout.php';">Logout</button>
      <button class="btn" onclick="window.location='/php/contentManagement.php';">Contenuti</button>
<?php
    }else{
?>
      <button class="btn" id="log" onclick="openLoginForm()">Login</button>
      <button class="btn" onclick="openRegForm()">Registrati</button>
<?php
    }
?>

</div>

<script src="../js/forms.js"></script>
<script src="../js/ajax.js"></script>
