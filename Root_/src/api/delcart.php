<?php
    header("Content-Type: text/html;charset=utf-8");
    include 'conn.php';
    
    $listid = isset($_REQUEST['listid']) ? $_REQUEST['listid'] : '';
    // echo $listid;
    $sql = "DELETE FROM shopcart WHERE id in ($listid)";
    $res = $conn->query($sql);
    // $arr = $res->fetch_all(MYSQLI_ASSOC);

    // echo json_encode($res);
?>