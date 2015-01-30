<?php
  $callbackName = $_GET['callback'];
  $param = $_GET['param'];

  $index = json_decode($param)->SQ;
  // $question = $_GET['q'];

  $time = explode ( " ", microtime () );  
  $time = $time [1] . ($time [0] * 1000);  
  $time2 = explode ( ".", $time );  
  $time = $time2 [0];

  $SR = array(
      "RID" => 1,
      "SN" => "产品详情"
  );

  $data1 = array("SQ" => 0, "RQT" => "2015-01-29 02:277", "RPT" => $time,"SR" => $SR);

  $back = array("errno" => 0, "errmsg" => "", "data" => $data1);

  // $data = '{"sendTime":1422250366963,"resTime":'.$time.',"index":'.$index.',"answer":{"default":"我太笨了，不知道你这个问题的答案，见笑了^-^","list":["查看我是否有优惠券？","当前所看产品可用优惠券类型？"]},"question":"'.$question.'"}';
  // echo $callbackName.'('.$data.')';
  echo $callbackName.'('.json_encode($back).')';
?>