// Armazena usuários no localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];

// Função para exibir mensagens
const showMessage = (element, message, isError = false) => {
  element.textContent = message;
  element.style.color = isError ? 'red' : 'green';
};

// Cadastro
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Verifica se o email já existe
    if (users.find((user) => user.email === email)) {
      showMessage(
        document.getElementById('signup-msg'),
        'Email já cadastrado!',
        true
      );
      return;
    }

    // Adiciona usuário
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));

    showMessage(
      document.getElementById('signup-msg'),
      'Cadastro realizado com sucesso!'
    );
    signupForm.reset();
  });
}

// Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      showMessage(
        document.getElementById('login-msg'),
        'Login realizado com sucesso!'
      );
      setTimeout(() => {
        window.location.href = 'user-page.html';
      }, 1000);
    } else {
      showMessage(
        document.getElementById('login-msg'),
        'Email ou senha incorretos!',
        true
      );
    }
  });
}
