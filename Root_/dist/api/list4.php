<?php
    header("Content-Type: text/html;charset=utf-8");
    include 'conn.php';

    $page = isset($_REQUEST['ipage']) ? $_REQUEST['ipage'] : '1';
    $num = isset($_REQUEST['num']) ? $_REQUEST['num'] : '4';
    $paixu = isset($_REQUEST['paixu']) ? $_REQUEST['paixu'] : '';
    $types = isset($_REQUEST['types']) ? $_REQUEST['types'] : '';
    $liebiao = isset($_REQUEST['liebiao']) ? $_REQUEST['liebiao'] : '';
    

    $index = ($page - 1) * $num;
    $zz = $num * $page ;
    // echo $types;
    if($paixu) {
        //销量排序
        if($types == "销量 "){
            // $sql = "SELECT * FROM $liebiao ORDER BY sales $paixu LIMIT 0,$zz ";
            // $sql2 = "SELECT * FROM $liebiao ORDER BY sales";
            $sql = "SELECT * FROM $liebiao ORDER BY sales $paixu";
            $sql2 = "SELECT * FROM $liebiao ORDER BY sales";
        } 
        // var_dump ($liebiao,$types,$paixu) ;
        //价格排序
        if($types == "价格 "){
            // $sql = "SELECT * FROM $liebiao ORDER BY price $paixu LIMIT $index,$zz ";
            // $sql2 = "SELECT * FROM $liebiao ORDER BY price";
            $sql = "SELECT * FROM $liebiao ORDER BY price $paixu";
            $sql2 = "SELECT * FROM $liebiao ORDER BY price";
        }

        //评论排序
        if($types == "评论 "){
            // $sql = "SELECT * FROM $liebiao ORDER BY evaluate $paixu LIMIT 0,$zz ";
            // $sql2 = "SELECT * FROM $liebiao ORDER BY evaluate";
            $sql = "SELECT * FROM $liebiao ORDER BY evaluate $paixu";
            $sql2 = "SELECT * FROM $liebiao ORDER BY evaluate";
        }

    }else{
        $sql  = "SELECT * FROM $liebiao";
        $sql2 = "SELECT * FROM $liebiao";
    }
    
    // echo $sql;  
    $res = $conn->query($sql);
    $arr = $res->fetch_all(MYSQLI_ASSOC);
    // var_dump($res);

    $res2 = $conn->query($sql2);

    $data = array(
        'total' => $res2->num_rows,
        'list' => $arr,
        'page' => $page,
        'num' => $num,
    );

    echo json_encode($data);
?>