// Importa os dados dos produtos e funções
import { produtos } from './dados/produtos.js';
import { obterCarrinho, salvarCarrinho } from './storage.js';
import { inicializarCarrinho, atualizarCarrinhoUI } from './carrinho.js';

// Função para obter parâmetros da URL
function obterParametrosURL() {
    const params = new URLSearchParams(window.location.search);
    return {
        id: parseInt(params.get('id')) || 1 // Valor padrão 1 se não existir ID na URL
    };
}

// Função para exibir detalhes do produto
function exibirDetalhesProduto() {
    const { id } = obterParametrosURL();
    const produto = produtos.find(p => p.id === id) || produtos[0];
    
    if (!produto) {
        // Redireciona para a página inicial se o produto não for encontrado
        window.location.href = '../index.html';
        return;
    }
    
    // Atualiza os elementos da página com as informações do produto
    document.title = `${produto.nome} - Flor do Campo`;
    
    // Imagem do produto
    const imagemProduto = document.querySelector('.produto-imagem img');
    if (imagemProduto) {
        imagemProduto.src = produto.imagem;
        imagemProduto.alt = produto.nome;
    }
    
    // Nome do produto
    const nomeProduto = document.querySelector('.produto-info h1');
    if (nomeProduto) {
        nomeProduto.textContent = produto.nome;
    }
    
    // Preço do produto
    const precoAtual = document.querySelector('.preco-atual');
    if (precoAtual) {
        precoAtual.textContent = `R$ ${produto.preco.toFixed(2)}`;
    }
      // Botão de comprar
    const btnComprar = document.querySelector('.btn-comprar');
    if (btnComprar) {
        btnComprar.addEventListener('click', () => {
            // Adiciona o produto ao carrinho
            const quantidade = parseInt(document.getElementById('quantidade').value) || 1;
            adicionarAoCarrinho(produto, quantidade);
            
            // Verifica se estamos em ambiente de desenvolvimento ou preview
            const path = window.location.pathname;
            let checkoutUrl = '../CheckoutPage/checkout.html';
            
            // Se estiver no modo preview, ajusta o caminho para o checkout
            if (path.includes('/dist/')) {
                checkoutUrl = '../CheckoutPage/checkout.html';
            }
            
            window.location.href = checkoutUrl;
        });
    }
      // Botão de adicionar ao carrinho
    const btnAdicionarCarrinho = document.querySelector('.btn-adicionar-carrinho');
    if (btnAdicionarCarrinho) {
        btnAdicionarCarrinho.addEventListener('click', () => {
            // Adiciona o produto ao carrinho
            const quantidade = parseInt(document.getElementById('quantidade').value) || 1;
            adicionarAoCarrinho(produto, quantidade);
            
            // Exibir notificação temporária sem redirecionar
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg z-50';
            notification.textContent = `${produto.nome} adicionado ao carrinho!`;
            document.body.appendChild(notification);
            
            // Remove a notificação após 3 segundos
            setTimeout(() => {
                notification.classList.add('fade-out');
                setTimeout(() => document.body.removeChild(notification), 500);
            }, 3000);
        });
    }
    
    // Configura os botões de quantidade
    configurarControlesQuantidade();
}

// Função para adicionar ao carrinho
function adicionarAoCarrinho(produto, quantidade = 1) {
    // Tenta obter o carrinho atual do localStorage
    let carrinho = obterCarrinho();
    
    // Verifica se o produto já está no carrinho
    const index = carrinho.findIndex(item => item.id === produto.id);
    
    if (index !== -1) {
        // Se o produto já estiver no carrinho, incrementa a quantidade
        carrinho[index].quantidade += quantidade;
    } else {
        // Se for um novo produto, adiciona ao carrinho
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: quantidade
        });
    }
    
    // Salva o carrinho de volta no localStorage
    salvarCarrinho(carrinho);
    
    // Atualiza a UI do carrinho lateral
    atualizarCarrinhoUI();
    
    // Se tiver checkbox de carrinho, marca como visível
    const cartToggle = document.getElementById('cart-toggle');
    if (cartToggle) {
        cartToggle.checked = true;
    }
}

// Função para configurar os botões de quantidade
function configurarControlesQuantidade() {
    const btnDiminuir = document.getElementById('diminuir');
    const btnAumentar = document.getElementById('aumentar');
    const inputQuantidade = document.getElementById('quantidade');
    
    if (btnDiminuir && btnAumentar && inputQuantidade) {
        btnDiminuir.addEventListener('click', () => {
            const valorAtual = parseInt(inputQuantidade.value) || 1;
            if (valorAtual > 1) {
                inputQuantidade.value = valorAtual - 1;
            }
        });
        
        btnAumentar.addEventListener('click', () => {
            const valorAtual = parseInt(inputQuantidade.value) || 1;
            inputQuantidade.value = valorAtual + 1;
        });
        
        // Garante que nunca seja menor que 1
        inputQuantidade.addEventListener('change', () => {
            const valorAtual = parseInt(inputQuantidade.value) || 1;
            if (valorAtual < 1) {
                inputQuantidade.value = 1;
            }
        });
    }
}

// Inicia as funções quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    exibirDetalhesProduto();
    inicializarCarrinho(); // Inicializa a funcionalidade do carrinho
    atualizarCarrinhoUI(); // Atualiza a UI do carrinho com os itens existentes
});
