<?php

class helperClass{

  function extractHead($arr){
    foreach($arr as $value)
      if ($value->Type === 'head') return $value;
    return 0;
  }

}

 ?>
