<?php
    include 'conn.php';

    $tel = isset($_REQUEST['zz'])? $_REQUEST['zz'] : '';
    $password = isset($_REQUEST['password'])? $_REQUEST['password'] : '';

    $sql = "SELECT * FROM userinfo WHERE tel='$tel' AND psw='$password'";
    $res = $conn->query($sql);
    if($res->num_rows){
        echo 'yes';
    }else{
        echo 'no';
    }
?>