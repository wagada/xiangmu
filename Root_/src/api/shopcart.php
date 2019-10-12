<?php
    header("Content-Type: text/html;charset=utf-8");
    include 'conn.php';

    $sql = "SELECT * FROM shopcart ";

    
    $res = $conn->query($sql);
    $arr = $res->fetch_all(MYSQLI_ASSOC);

    echo json_encode($arr);
?>