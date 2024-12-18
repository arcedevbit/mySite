<?php
// Dados do banco de dados
$servername = "localhost";  // Em geral, 'localhost' funciona
$username = "u944079764_user_master";  // Substitua pelo usuário do banco de dados
$password = ".Vidaloka10";    // Substitua pela senha do banco de dados
$dbname = "u944079764_user_data"; // Nome do banco de dados que você criou no Hostinger

try {
    // Conectando ao banco de dados com PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Conexão falhou: " . $e->getMessage();
}
?>
