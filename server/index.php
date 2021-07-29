<?php 

 $serverName ="localhost";
 $username ="root";
 $password ="";
 $databaseName ="ecommerce";
 $conn = new mysqli($serverName,$username,$password,$databaseName);
 if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
 $query = mysqli_query($conn, "SELECT * from userdetails");
    $rows = array();
    while($r = mysqli_fetch_assoc($query)) {
        $rows[] = $r;
    }
    print json_encode($rows);
 ?>