<?php
    header("Content-Type: text/html;charset=utf-8");
    include 'conn.php';
    
    $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : '';
    $imgurl = isset($_REQUEST['imgurl']) ? $_REQUEST['imgurl'] : '';
    $goodsname = isset($_REQUEST['goodsname']) ? $_REQUEST['goodsname'] : '';
    $prcie = isset($_REQUEST['price']) ? $_REQUEST['price'] : '';
    $size = isset($_REQUEST['size']) ? $_REQUEST['size'] : '';

    $sql = "INSERT INTO shopcart (id,imgurl,goodsname,price,size) VALUES ($id,'$imgurl','$goodsname',$prcie,'$size')";
    $res = $conn->query($sql);
    // $arr = $res->fetch_all(MYSQLI_ASSOC);

    echo json_encode($res);
?>