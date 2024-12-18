<?php
include('db_config.php');  // Inclui o arquivo de configuração do banco de dados

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coleta os dados do formulário
    $username = $_POST['username'];  // O nome de usuário enviado pelo formulário
    $title = $_POST['title'];        // O título da postagem
    $content = $_POST['content'];    // O conteúdo da postagem
    $date = date('Y-m-d H:i:s');     // Data e hora atual

    // Preparação da consulta para inserir os dados no banco
    $sql = "INSERT INTO posts (user_id, title, content, date) 
            VALUES ((SELECT id FROM users WHERE username = :username), :title, :content, :date)";
    
    // Prepara e executa a consulta
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':content', $content);
    $stmt->bindParam(':date', $date);
    $stmt->execute();

    echo "Postagem criada com sucesso!";
}
?>
