<?php header('Access-Control-Allow-Origin: *'); ?>
<?php 


 $conn = mysqli_connect("localhost", "root", "", "ecommerce");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
    $trp = mysqli_query($conn, "SELECT * from product");
    $rows = array();
    while($r = mysqli_fetch_assoc($trp)) {
        $rows[] = $r;
    }
    print json_encode($rows); //convert php data to json data
 ?>