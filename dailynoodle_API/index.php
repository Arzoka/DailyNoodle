<?php
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }

    exit(0);
}

header("Content-Type: application/json");


    $conn = mysqli_connect("notuko-dailynoodledb.db.transip.me:3306", "notuko_admin", "Taiga250123!", "notuko_dailynoodledb");

    if ($conn) {
        mysqli_set_charset($conn, "utf8");

        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $sql = "SELECT * FROM data WHERE id = $id";
        } else {
            $sql = "SELECT * FROM data";
        }

        $result = mysqli_query($conn, $sql);

        if ($result) {
            $response = array();
            while ($row = mysqli_fetch_assoc($result)) {
                $response[] = $row;
            }
            echo json_encode($response, JSON_PRETTY_PRINT);
        } else {
            echo 'No result';
        }

        mysqli_close($conn);
    } else {
        echo 'Connection failed';
    }

?>