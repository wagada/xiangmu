<?php
    header("Content-Type: text/html;charset=utf-8");
    include 'conn.php';
    $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
    $editpsw = isset($_REQUEST['editpsw']) ? $_REQUEST['editpsw'] : '';
    $sql = "UPDATE userinfo SET psw = '$editpsw' WHERE id = $id";
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