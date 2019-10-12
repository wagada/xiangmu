<?php
    header("Content-Type: text/html;charset=utf-8");
    include 'conn.php';
    $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
    $sql = "DELETE FROM userinfo WHERE id in($id)";
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