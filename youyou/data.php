<?php
  $callbackName = $_GET['callback'];
  $index = $_GET['index'];
  $question = $_GET['q'];

  $time = explode ( " ", microtime () );  
  $time = $time [1] . ($time [0] * 1000);  
  $time2 = explode ( ".", $time );  
  $time = $time2 [0];

  $data = '{"sendTime":1422250366963,"resTime":'.$time.',"index":'.$index.',"question":"'.$question.'"}';
  echo $callbackName.'('.$data.')';
?>