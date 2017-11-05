<?php

class helperClass{

  function extractHead($arr){
    foreach($arr as $value)
      if ($value->Type === 'head') return $value;
    return 0;
  }

  function getIndex($list,$type){
    for ($i=0; $i< count($list); $i++){
      if ($list[$i][$type] !== null) return $i;
    }
    return -1;
  }

  function getDistinctCategories($tableName,$conn){
    $list = array();
    //Selection_flavours
    $getCafeFlavourSelection = $conn->query("SELECT DISTINCT type FROM $tableName");
    while($rs = $getCafeFlavourSelection->fetch_array(MYSQLI_ASSOC)){
      $tempdata = array($rs['type'] => array());
      array_push($list,$tempdata);
      unset($tempdata);
    }
    return $list;
  }

}

 ?>
