

<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
header("HTTP/1.1 200 OK");
die();
}
$indiceFromJS = file_get_contents(('php://input'));
try {

    //appel localhost
    $pdo = new PDO("mysql:host=127.0.0.1;dbname=api;charset=utf8", "root", "", [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ]);
    
    //appel web
    // $pdo = new PDO("mysql:host=127.0.0.1;dbname=drpnngev_api;charset=utf8", "drpnngev_ludo", "q!2R(O9EJss6i0", [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ]);

    if ($indiceFromJS == "") {
        $query = $pdo->prepare('SELECT * FROM etalonnages');
        $query->execute();
    } else {
        $query = $pdo->prepare('SELECT * FROM etalonnages WHERE id = :id');
        $query->execute(['id' => $indiceFromJS]);
    }

    $posts = $query->fetchAll();
    // print_r($posts);

    header('Content-Type: application/json');
    echo json_encode($posts);
} catch (PDOException $e) {
    echo $e->getMessage();
}