<?php
    header("Content-Type: text/html;charset=utf-8");
    include 'conn.php';
    $addtel = isset($_REQUEST['addtel']) ? $_REQUEST['addtel'] : '';
    $addpsw = isset($_REQUEST['addpsw']) ? $_REQUEST['addpsw'] : '';
    $sql = "INSERT INTO userinfo (tel,psw) VALUES ($addtel,'$addpsw')";
    $res = $conn->query($sql);
    // $arr = $res->fetch_all(MYSQLI_ASSOC);
    if($res){
        $data = array(
            'code' => 0,
        );
    }else{
        $data = array(
            'code' => 1,
        );
    }
    
    echo json_encode($data);
?>