<?php header('Access-Control-Allow-Origin: *'); ?>
<?php

 $conn = mysqli_connect("localhost", "root", "", "ecommerce");
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
    $filename = $_FILES["picture_file"]["name"];
    $tempname = $_FILES["picture_file"]["tmp_name"];   
    $folder = "image/".$filename;
    $sql = "INSERT INTO product(name, price, description, picture, quantity, category)
        VALUES ( '".$_POST['name']."','".$_POST['price']."','".$_POST['description']."','".$_POST['picture']."','".$_POST['quantity']."','".$_POST['category']."')";
    
        
    if (mysqli_query($conn,$sql)) {
    $data = array("data" => "You Data added successfully");
        echo json_encode($data);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
    if (move_uploaded_file($tempname, $folder))  {
            $msg = "Image uploaded successfully";
        }else{
            $msg = "Failed to upload image";
      }
?>