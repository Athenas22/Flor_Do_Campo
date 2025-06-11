import { produtos, categorias } from './dados/produtos.js';

// função filtro
export function mostrarProdutos(categoria = 'todos') {
    // verifica existência
    const container = document.getElementById('produtos-container');
    if (!container) return;
    
    // atualiza para categoria 
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.classList.toggle('categoria-ativa', btn.dataset.categoria === categoria);
    });
    
    // filtra pelo dicionário
    const produtosFiltrados = categoria === 'todos' 
        ? produtos 
        : produtos.filter(produto => produto.categoria === categoria);
    
    // transformma os produtos para html
    const produtosHTML = produtosFiltrados.map(produto => `
        <div class="produto-card" data-id="${produto.id}">
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <div class="categoria">${categorias[produto.categoria] || 'Outro'}</div>
            <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
            <button class="btn-ver-produto" data-id="${produto.id}">Ver Produto</button>
        </div>
    `).join('');
    
    // Exibe os produtos no container
    container.innerHTML = produtosFiltrados.length 
        ? produtosHTML 
        : '<p class="no-products">Nenhum produto encontrado nesta categoria.</p>';
    
    // vai pra produto.html
    document.querySelectorAll('.btn-ver-produto').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = `ProductPage/produto.html?id=${btn.getAttribute('data-id')}`;
        });
    });
}

// inicia no load da pag
document.addEventListener('DOMContentLoaded', () => {
    // Configura os botões de categoria
    document.querySelectorAll('.categoria-btn').forEach(btn => {
        btn.addEventListener('click', () => mostrarProdutos(btn.dataset.categoria));
    });
    
    // mostra td
    mostrarProdutos('todos');
});
