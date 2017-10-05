<?php
include "dbConnection.php";
$db = new connectDatabase();
$cafeID = 1;
echo ($db->getAvailable_heads($cafeID));
 ?>
