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

}

 ?>
