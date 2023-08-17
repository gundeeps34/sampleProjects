<?php
session_start();
$connect = mysqli_connect("localhost", "root", "", "cc");
if (isset($_POST['add_to_cart'])) {
    if (isset($_SESSION['cart'])) {

        $session_array_id = array_column($_SESSION['cart'], "id");

        if (!in_array($_GET['id'], $session_array_id)) {

            $session_array = array(
                'id' => $_GET['id'],
                "name" => $_POST['name'],
                "price" => $_POST['price'],
                "quantity" => $_POST['quantity']
            );

            $_SESSION['cart'][] = $session_array;

        }
    } else {
        $session_array = array(
            'id' => $_GET['id'],
            "name" => $_POST['name'],
            "price" => $_POST['price'],
            "quantity" => $_POST['quantity']
        );

        $_SESSION['cart'][] = $session_array;
    }
}


?>


<!DOCTYPE html>
<html>

<head>
    <title>Shopping Cart</title>
    <link rel="stylesheet" type="text/css"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
        }

        .container-fluid {
            margin-top: 20px;
        }


        .row .col-md-6 h2 {
            margin: 20px 0;
            text-align: center;
            color: #333;
        }

        .col-md-4 {
            padding: 10px;
            text-align: center;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            object-fit: cover;
        }

        .col-md-4 img {
            display: block;
            margin: 0 auto 10px;
            max-height: 150px;
        }

        .col-md-4 h5 {
            margin: 5px 0;
            color: #555;
        }


        .table {
            margin-top: 20px;
        }

        .table th,
        .table td {
            vertical-align: middle !important;
        }

        .table th {
            text-align: center;
            background-color: #f8f9fa;
            color: #555;
            font-weight: bold;
        }

        .table td {
            background-color: #fff;
        }

        .table td:last-child {
            width: 120px;
        }

        .table td.total {
            font-weight: bold;
            color: #555;
        }

        .btn-warning {
            background-color: #ffc107;
            border-color: #ffc107;
            color: #fff;
        }

        .btn-warning:hover {
            background-color: #e0a800;
            border-color: #e0a800;
        }

        .btn-danger {
            background-color: #dc3545;
            border-color: #dc3545;
            color: #fff;
        }

        .btn-danger:hover {
            background-color: #c82333;
            border-color: #bd2130;
        }

        .btn-block {
            display: block;
            width: 100%;
            margin-top: 10px;
        }

        .clear-all-btn {
            margin-top: 20px;
            text-align: center;
        }

        .clear-all-btn button {
            background-color: #f00;
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            border: none;
            border-radius: 4px;
            padding: 10px 20px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .clear-all-btn button:hover {
            background-color: #c00;
        }

        @media screen and (max-width: 768px) {
            .col-md-4 {
                margin-bottom: 20px;
            }
        }
    </style>
</head>

<body>

    <div class="container-fluid">
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-6">
                    <h2 class="text-center">Shopping Cart Data</h2>
                    <?php

                    $query = "SELECT * FROM The_cart";
                    $result = mysqli_query($connect, $query);

                    while ($row = mysqli_fetch_array($result)) { ?>
                        <div class="col-md-4">
                            <form method="post" action="shopping_cart.php?id=<?= $row['id'] ?>">
                                <img src="shopping_cart_images/<?= $row['pic'] ?>" style='height: 150px;'>
                                <h5 class="text-center">
                                    <?= $row['name']; ?>
                                </h5>
                                <h5 class="text-center">$
                                    <?= number_format($row['price'], 2); ?>
                                </h5>
                                <input type="hidden" name="name" value="<?= $row['name'] ?>">
                                <input type="hidden" name="price" value="<?= $row['price'] ?>">
                                <input type="number" name="quantity" value=1 class="form-control">
                                <input type="submit" name="add_to_cart" class="btn btn-warning btn-block my-2"
                                    value="Add To Cart">
                            </form>
                        </div>
                    <?php }

                    ?>
                </div>
                <div class="col-md-6">
                    <h2 class="text-center">Item Selected</h2>

                    <?php
                    $output = "";
                    $output .= " 
                            <table class='table table-bordered table-striped'>
                                <tr>
                                    <th>ID</th>
                                    <th>Item Name</th>
                                    <th>Item Price</th>
                                    <th>Item Quantity</th>
                                    <th>Total Price</th>
                                    <th>Action</th>
                                </tr>
                        ";
                    if (!empty($_SESSION['cart'])) {

                        foreach ($_SESSION['cart'] as $key => $value)
                            $output .= "
                                <tr>
                                    <td>" . $value['id'] . "</td>
                                    <td>" . $value['name'] . "</td>
                                    <td>" . $value['price'] . "</td>
                                    <td>" . $value['quantity'] . "</td>
                                    <td>$" . number_format($value['price'] * $value['quantity'], 2) . "</td>
                                    <td>
                                        <a href='shopping_cart.php?action-remove&id=" . $value['id'] . "'>
                                            <button class='btn btn-danger btn-block'>Remove</button>
                                        </a>
                                    </td>
                                    
                                ";

                        $total += $value['quantity'] * $value['price'];
                    }


                    $output .= "
                            <tr>
                                <td colspan='3'></td>
                                <td></b>Total Price</b></td>
                                <td>" . number_format($total, 2) . "</td>
                                <td>
                                    <a href='shopping_cart.php?action=clearall'>
                                        <button class-'btn btn-warning btn-block'>Clear</button>
                                    </a>
                                </td>
                            </tr>
                        ";




                    echo $output;

                    ?>
                </div>
            </div>
        </div>
    </div>



    <?php


    if (isset($_GET['action'])) {
        if ($_GET['action'] == "clearall") {
            unset($_SESSION['cart']);
        }


        if ($_GET['action'] == "remove") {

            foreach ($_SESSION['cart'] as $key => $value) {
                if ($value['id'] == $_GET['id']) {
                    unset($_SESSION['cart'][$key]);
                }
            }

        }

    }


    ?>





</body>

</html>