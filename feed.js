let postsFeed = document.getElementById("posts-feed");

// Carregar postagens do localStorage e exibi-las
window.onload = () => {
  let postsData = JSON.parse(localStorage.getItem("posts")) || [];
  
  // Verifique se há postagens armazenadas
  if (postsData.length > 0) {
    postsData.forEach(post => {
      postsFeed.innerHTML += `
      <div class="feed-item background">
        <p><strong>Usuário</strong>: ${post.text}</p>
      </div>
      `;
    });
  } else {
    postsFeed.innerHTML = "<p>Nenhuma postagem encontrada no feed.</p>";
  }
};
