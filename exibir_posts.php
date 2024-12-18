<?php
include('db_config.php'); // Inclui o arquivo de configuração de banco de dados

// Consulta para recuperar todas as postagens
$sql = "SELECT * FROM posts";
$stmt = $conn->prepare($sql);
$stmt->execute();
$posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Exibe as postagens
foreach ($posts as $post) {
    echo "<h3>" . htmlspecialchars($post['title']) . "</h3>";
    echo "<p>" . htmlspecialchars($post['content']) . "</p>";
    echo "<small>Postado em: " . $post['date'] . "</small>";
    echo "<hr>";
}
?>
