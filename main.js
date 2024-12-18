// Carregar o nome de usuário e foto de perfil ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  const userName = localStorage.getItem('userName') || 'Nome do Usuário';
  document.getElementById('user-name').textContent = userName;

  const profilePhoto = localStorage.getItem('profilePhoto') || 'default-profile.png';
  document.getElementById('profile-photo').src = profilePhoto;
});

// Função para editar o nome de usuário
function editUserName() {
  const userName = prompt('Digite seu novo nome de usuário:');
  if (userName) {
    localStorage.setItem('userName', userName);
    document.getElementById('user-name').textContent = userName;
    alert("Nome de usuário alterado com sucesso!"); // Feedback visual
  }
}

// Funcionalidade de Excluir Postagens
function deletePost(index) {
  const confirmDelete = confirm('Você tem certeza de que deseja excluir esta postagem?');
  if (confirmDelete) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
  }
}

// Função para atualizar a foto de perfil com validação
function updateProfilePhoto(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const image = new Image();
      image.src = e.target.result;

      image.onload = function() {
        // Verifica se a imagem excede o limite de 500x500px
        if (image.width > 500 || image.height > 500) {
          document.getElementById('message').textContent = 'A imagem deve ser no máximo 500x500 pixels.';
        } else {
          document.getElementById('message').textContent = ''; // Limpa a mensagem de erro
          const imageUrl = e.target.result;
          localStorage.setItem('profilePhoto', imageUrl);
          document.getElementById('profile-photo').src = imageUrl;
        }
      };

      image.onerror = function() {
        document.getElementById('message').textContent = 'Formato de imagem inválido. Por favor, adicione uma imagem válida.';
      };
    };
    reader.readAsDataURL(file);
  }
}

// Função para capturar e salvar os dados da postagem no localStorage
function submitPost(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  if (!title || !content) {
    alert('Por favor, preencha o título e o conteúdo!');
    return;
  }

  const post = {
    user: localStorage.getItem('userName') || 'Nome do Usuário',
    title: title,
    content: content,
    date: new Date().toLocaleString(),
    profilePhoto: localStorage.getItem('profilePhoto') || 'default-profile.png'
  };

  const posts = JSON.parse(localStorage.getItem('posts')) || [];
  posts.push(post);
  localStorage.setItem('posts', JSON.stringify(posts));
  window.location.href = 'index.html';
}

// Seleciona os elementos
const btnPerfil = document.getElementById('btnPerfil');
const btnPosts = document.getElementById('btnPosts');
const leftDiv = document.querySelector('.left');
const rightDiv = document.querySelector('.right');

// Função para mostrar a seção Perfil e esconder a seção Posts
btnPerfil.addEventListener('click', () => {
  leftDiv.style.display = 'block';  // Mostra a div Left
  rightDiv.style.display = 'none';  // Esconde a div Right
});

// Função para mostrar a seção Posts e esconder a seção Perfil
btnPosts.addEventListener('click', () => {
  rightDiv.style.display = 'block'; // Mostra a div Right
  leftDiv.style.display = 'none';   // Esconde a div Left
});

// Inicializa: Exibe apenas a seção Perfil ao carregar a página
window.addEventListener('load', () => {
  leftDiv.style.display = 'block';
  rightDiv.style.display = 'none';
});

//Debounce na busca
let debounceTimer;
const searchInput = document.getElementById('search-bar');

searchInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    searchPosts(searchInput.value);
  }, 500); // Executa a pesquisa após 500ms
});

//Feedback Imediato
function showSuccessMessage(message) {
  const toast = document.createElement('div');
  toast.classList.add('toast', 'success');
  toast.innerText = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000); // Remove após 3 segundos
}

// Mostrar sucesso ao enviar post
showSuccessMessage("Postagem enviada com sucesso!");

/* Transições e animações */
function toggleSection() {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.toggle('visible'));
}

// Marcar o botão ativo
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Carregamento de Dados:
function showLoadingIndicator() {
  const loadingIndicator = document.createElement('div');
  loadingIndicator.classList.add('loading');
  loadingIndicator.innerText = 'Carregando...';
  document.body.appendChild(loadingIndicator);
}

function hideLoadingIndicator() {
  const loadingIndicator = document.querySelector('.loading');
  if (loadingIndicator) {
    loadingIndicator.remove();
  }
}

// Usar no carregamento de postagens
showLoadingIndicator();
loadPosts();
hideLoadingIndicator();
