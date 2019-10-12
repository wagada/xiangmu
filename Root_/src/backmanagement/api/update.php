<?php
    header("Content-Type: text/html;charset=utf-8");
    include 'conn.php';
    $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
    $uptel = isset($_REQUEST['uptel']) ? $_REQUEST['uptel'] : '';
    $uppsw = isset($_REQUEST['uppsw']) ? $_REQUEST['uppsw'] : '';
    $sql = "UPDATE userinfo SET tel = '$uptel' , psw = '$uppsw' WHERE id = $id";
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