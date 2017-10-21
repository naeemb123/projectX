<?php

include "dbConnection.php";
$postdata = file_get_contents("php://input");
$data = json_decode($postdata);
$db = new connectDatabase();
// foreach($data->Flavours as $flavour){
//   echo json_encode($flavour->name);
// }
echo ($db->storeOrderDetails($data));
 ?>
