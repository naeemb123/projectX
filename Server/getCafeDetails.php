<?php
include "dbConnection.php";

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$cafeName = $request->name;
$db = new connectDatabase();
echo ($db->getCafeDetails($cafeName));
 ?>
