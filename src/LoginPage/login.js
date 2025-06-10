// cria um usuario padrao se nao existir
if (!localStorage.getItem("usuarioEmail")) {
    localStorage.clear();
    localStorage.setItem("usuarioEmail", "flor123@gmail.com");
    localStorage.setItem("usuarioSenha", "1234");
}

// espera a pagina carregar
document.addEventListener("DOMContentLoaded", function () {
  // pega os elementos do form
  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("password");
  const lembrarCheckbox = document.getElementById("lembrar");

  // ve se tem email salvo pra lembrar
  const emailLembrado = localStorage.getItem("lembrarEmail");
  if (emailLembrado) {
    emailInput.value = emailLembrado;
    lembrarCheckbox.checked = true;
  }

  // quando enviar o form
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // pega oq foi digitado
    const emailDigitado = emailInput.value.trim().toLowerCase();
    const senhaDigitada = senhaInput.value.trim();
    const lembrar = lembrarCheckbox.checked;

    // pega os dados salvos
    const emailSalvo = localStorage.getItem("usuarioEmail");
    const senhaSalva = localStorage.getItem("usuarioSenha");

    // ve se ta certo
    if (emailDigitado === emailSalvo && senhaDigitada === senhaSalva) {
      // salva que ta logado
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", emailDigitado);

      // salva email se marcou pra lembrar
      if (lembrar) {
        localStorage.setItem("lembrarEmail", emailDigitado);
      } else {
        localStorage.removeItem("lembrarEmail");
      }

      // vai pra pagina principal
      window.location.href = "/index.html";
    } else {
      alert("E-mail ou senha incorretos.");
    }
  });
});
