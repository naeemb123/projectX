<?php

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
    $result = $conn->query("SELECT name, url,type from Selection_flavours a , Flavours as b where cafeID='$cafeID' and a.flavourName = b.Name");
    $data = array();
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
        // $stringArray=array('Flavours'=>explode(',',$rs["flavours"]),'Heads'=>explode(',',$rs["heads"]));
        $name=$rs['name'];
        $url=$rs['url'];
        $type=$rs['type'];
        $tempdata = array('name'=>$name,'url'=>$url,'type'=>$type);
        array_push($data,$tempdata);
        unset($tempdata);
    }
    return json_encode($data);
  }

  function getAvailable_heads($cafeID){
    global $conn;
    $result = $conn->query("SELECT Name , url, price FROM Selection_heads as a,Heads as b WHERE cafeID = '$cafeID' and a.headName = b.Name");
    $data=array();
    while($rs = $result->fetch_array(MYSQLI_ASSOC)){
      $name = $rs['Name'];
      $url = $rs['url'];
      $price = $rs['price'];
      $tempdata = array('name'=> $name,'url'=>$url,'price'=>$price);
      array_push($data,$tempdata);
      unset($tempdata);
    }
    return json_encode($data);
  }

  function getAvailable_extras($cafeID){
    global $conn;
    $result = $conn->query("SELECT name, url, price FROM Selection_extras as a,Extras as b WHERE a.extraName = b.name and cafeid = '$cafeID'");
    $data=array();
    while($rs = $result->fetch_array(MYSQLI_ASSOC)){
      $name = $rs['name'];
      $url = $rs['url'];
      $price = $rs['price'];
      $tempdata = array('name'=> $name,'url'=>$url,'price'=>$price);
      array_push($data,$tempdata);
      unset($tempdata);
    }
    return json_encode($data);

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

}

 ?>
