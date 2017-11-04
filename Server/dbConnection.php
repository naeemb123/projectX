<?php

include "helperClass.php";

$servername = "localhost";
$username = "root";
$password = "sheesh";
$dbname = "shisha_db";

$conn = new mysqli($servername, $username, $password,$dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

class connectDatabase{

  function getAvailable_flavours($cafeID){
    global $conn;
    $helper = new helperClass();

    $getCafeFlavourSelection = $conn->query("SELECT DISTINCT type FROM Selection_flavours");
    $flavourList = array();
    $listOfCategories = array();
    while($rs = $getCafeFlavourSelection->fetch_array(MYSQLI_ASSOC)){
      $tempdata = array($rs['type'] => array());
      array_push($listOfCategories,$rs['type']);
      array_push($flavourList,$tempdata);
      unset($tempdata);
    }

    $result = $conn->query("SELECT name, url,type,price from Selection_flavours a , Flavours as b where cafeID='$cafeID' and a.flavourName = b.Name");
    $data = array();
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        // $stringArray=array('Flavours'=>explode(',',$rs["flavours"]),'Heads'=>explode(',',$rs["heads"]));
        $name=$rs['name'];
        $url=$rs['url'];
        $type=$rs['type'];
        $price=$rs['price'];
        $tempdata = array('name'=>$name,'url'=>$url,'type'=>$type,'price'=>$price,'Type'=>'flavour');
        $index = $helper->getIndex($flavourList,$type);
        if ($index == -1) return json_encode("Error: Flavour type is not recognised. type is different to what is stored in the selection_flavours table in DB");
        array_push($flavourList[$index][$type],$tempdata);
        unset($tempdata);
    }
    // array_push($flavourList,array('categories' => $listOfCategories));
    return json_encode($flavourList);
  }

  function getAvailable_heads($cafeID){
    global $conn;
    $result = $conn->query("SELECT Name , url, price FROM Selection_heads as a,Heads as b WHERE cafeID = '$cafeID' and a.headName = b.Name");
    $data=array();
    while($rs = $result->fetch_array(MYSQLI_ASSOC)){
      $name = $rs['Name'];
      $url = $rs['url'];
      $price = $rs['price'];
      $tempdata = array('name'=> $name,'url'=>$url,'price'=>$price, 'Type'=>'head');
      array_push($data,$tempdata);
      unset($tempdata);
    }
    return json_encode($data);
  }

  function getAvailable_extras($cafeID){
    global $conn;
    $helper = new helperClass();
    $getCafeExtraSelection = $conn->query("SELECT DISTINCT type FROM Selection_extras");
    $extraList = array();
    while($rs = $getCafeExtraSelection->fetch_array(MYSQLI_ASSOC)){
      $tempdata = array($rs['type'] => array());
      array_push($extraList,$tempdata);
      unset($tempdata);
    }

    $result = $conn->query("SELECT name, url, price, type FROM Selection_extras as a,Extras as b WHERE a.extraName = b.name and cafeid = '$cafeID'");
    $data=array();
    while($rs = $result->fetch_array(MYSQLI_ASSOC)){
      $name = $rs['name'];
      $url = $rs['url'];
      $price = $rs['price'];
      $type = $rs['type'];
      $tempdata = array('name'=> $name,'url'=>$url,'price'=>$price,'Type'=>'extra','Category'=>$type);
      $index = $helper->getIndex($extraList,$type);
      if ($index == -1) return json_encode("Error: Extra type is not recognised. type is different to what is stored in the selection_extras table in DB");
      array_push($extraList[$index][$type],$tempdata);
      unset($tempdata);
    }
    return json_encode($extraList);

  }

  function getCafeDetails($cafeName){
    global $conn;
    $result = $conn->query("SELECT id,name,openingtime,closingtime,standard_flavour_price,Special_flavour_price,Availability FROM Cafe where name='$cafeName'");
    while($rs = $result->fetch_array(MYSQLI_ASSOC)){
      $id = $rs['id'];$name=$rs['name'];$openingTime = $rs['openingtime'];$closingTime=$rs['closingtime'];
      $standardPrice = $rs['standard_flavour_price'];$specialPrice = $rs['Special_flavour_price'];$Availability=$rs['Availability'];
      $data = array('cafeID'=>$id,'cafeName'=>$name,'openingTime'=>$openingTime,'closingTime'=>$closingTime,
          'standardPrice'=>$standardPrice,'specialPrice'=>$specialPrice,'Availability'=>$Availability);
    }
    return json_encode($data);
  }

  function storeOrderDetails($data){
    global $conn;
    $helper = new helperClass();
    $head = $helper->extractHead($data->Heads);
    if ($head == 0) echo json_encode("Error: Could not find a Head selected");

    $result = $conn->query("SHOW TABLE STATUS LIKE 'transaction'");
    $resultData = $result->fetch_array(MYSQLI_ASSOC);
    $newTransactionID = $resultData['Auto_increment'];

    $sql = "INSERT INTO Transaction (selectedTime, orderDate, cafeID, selectedHead, user)
     VALUES ('$data->SelectedTime','$data->orderDate','$data->cafeID','$head->name','$data->CardHoldersName');";

    foreach($data->Flavours as $flavour){
      $sql .= "INSERT INTO user_selectedFlavours(transactionid,flavourName,username)
      VALUES ('$newTransactionID','$flavour->name','$data->CardHoldersName');";
    }

    foreach($data->Heads as $headExtras){
      if ($headExtras->Type === 'extra'){
        // echo json_encode($headExtras->name . " ");
        $sql .= "INSERT INTO user_selectedExtras(transactionid,extraName,username)
        VALUES ('$newTransactionID','$headExtras->name','$data->CardHoldersName');";
      }
    }

    // echo json_encode($sql);
    if (!$conn->multi_query($sql)) {
      echo "Multi query failed: (" . $conn->errno . ") " . $conn->error;
    } else{
      echo json_encode(1);
    }
  }

}

 ?>
