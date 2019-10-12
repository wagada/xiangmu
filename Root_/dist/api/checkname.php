<?php
    include 'conn.php';

    $tel = isset($_REQUEST['tel']) ? $_REQUEST['tel'] : '';

    $sql = "SELECT * FROM userinfo WHERE tel='$tel' ";

    $res = $conn->query($sql);

    if($res->num_rows){
        echo 'no';
    }else{
        echo 'yes';
    }


?>