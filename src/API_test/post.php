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


	$json = file_get_contents(('php://input'));
    // echo $json;
    $object = json_decode($json);
 
    // $description = $object->description;
    // $categorie = $object->categorie;
    // $nom = $object->nom;
    $marquage = $object->marquage;
    $domaine = $object->domaine;
    $dateEtalonnage = $object->dateEtalonnage;
    $ptsEtalonnage = $object->ptsEtalonnage;
    $numCertificat = $object->numCertificat;
    $typeTc = $object->typeTc;
try {

      //appel localhost
      $pdo = new PDO("mysql:host=127.0.0.1;dbname=api;charset=utf8", "root", "", [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ]);
    
      //appel web
      // $pdo = new PDO("mysql:host=127.0.0.1;dbname=drpnngev_api;charset=utf8", "drpnngev_ludo", "q!2R(O9EJss6i0", [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ]);
  

    $query= $pdo->prepare("INSERT INTO etalonnages(marquage, domaine, dateEtalonnage,ptsEtalonnage, numCertificat, typeTc) VALUES('" . $marquage . "', '" . $domaine . "', '" . $dateEtalonnage . "','" . $ptsEtalonnage . "', '" . $numCertificat . "', '" . $typeTc . "')");
    $query->execute();


} catch (PDOException $e) {
    echo $e->getMessage();
}