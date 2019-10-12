<?php
    include 'conn.php';

    $tel = isset($_REQUEST['tel']) ? $_REQUEST['tel'] : '';
    $password = isset($_REQUEST['password']) ? $_REQUEST['password'] : '';
    $sql = "INSERT INTO userinfo(tel,psw) VALUE ('$tel','$password')";
    $res = $conn->query($sql);
    
    if($res){
        echo 'yes';
    }else{
        echo 'no';
    }

?>