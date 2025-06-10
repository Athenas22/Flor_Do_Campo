// espera a página carregar
document.addEventListener("DOMContentLoaded", function() {
    // pega info se ta logado
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    // pega o icone do usuario
    const userIcon = document.querySelector(".fa-user").parentElement;
    
    // se tiver logado
    if (isLoggedIn === "true") {
        // muda o icone pra mostrar q ta logado
        userIcon.innerHTML = '<i class="fas fa-user-check"></i>';
        userIcon.title = "Minha Conta";
    } else {
        // se nao tiver logado manda pra pagina de login
        userIcon.href = "login.html";
    }
});
