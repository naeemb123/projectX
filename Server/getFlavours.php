<?php
include "dbConnection.php";
 $db = new connectDatabase();
 $cafeID = 1; //hardcoded
 echo ($db->getAvailable_flavours($cafeID));
?>
