import { obterCarrinho, salvarCarrinho } from "./storage.js";

const cartItemsContainer = document.getElementById("cart-items");
const cartTotalSpan = document.getElementById("cart-total");
const cartToggleButton = document.getElementById("cart-toggle");

/**
 * Adiciona um item ao carrinho ou incrementa sua quantidade se já existir.
 * @param {object} produto - O produto a ser adicionado.
 */
function adicionarAoCarrinho(produto) {
    const carrinho = obterCarrinho();
    const itemExistente = carrinho.find(item => item.id === produto.id);

    if (itemExistente) {
        // Se o item já existe, apenas incrementa a quantidade
        itemExistente.quantidade++;
    } else {
        // Se é um item novo, adiciona ao carrinho com quantidade 1
        carrinho.push({ ...produto, quantidade: 1 });
    }
    
    salvarCarrinho(carrinho);
    atualizarCarrinhoUI();
}

/**
 * Altera a quantidade de um item no carrinho ou o remove se a quantidade for zero.
 * @param {string} produtoId - O ID do produto.
 * @param {'increase' | 'decrease'} acao - A ação a ser realizada.
 */
function alterarQuantidade(produtoId, acao) {
    let carrinho = obterCarrinho();
    const itemIndex = carrinho.findIndex(item => item.id === produtoId);

    if (itemIndex > -1) {
        if (acao === 'increase') {
            carrinho[itemIndex].quantidade++;
        } else if (acao === 'decrease') {
            carrinho[itemIndex].quantidade--;
        }

        // Se a quantidade chegar a zero, remove o item do carrinho
        if (carrinho[itemIndex].quantidade <= 0) {
            carrinho.splice(itemIndex, 1);
        }
    }

    salvarCarrinho(carrinho);
    atualizarCarrinhoUI();
}

/**
 * Remove um item do carrinho, independente da quantidade.
 * @param {string} produtoId - O ID do produto a ser removido.
 */
function removerItem(produtoId) {
    let carrinho = obterCarrinho();
    carrinho = carrinho.filter(item => item.id !== produtoId);
    salvarCarrinho(carrinho);
    atualizarCarrinhoUI();
}

/**
 * Atualiza a interface do usuário (UI) do carrinho, agora com quantidades.
 */
export function atualizarCarrinhoUI() {
    const carrinho = obterCarrinho();
    
    if (!cartItemsContainer || !cartTotalSpan) return;

    cartItemsContainer.innerHTML = ""; // Limpa a lista

    if (carrinho.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-500">Seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach(item => {
            const div = document.createElement("div");
            div.className = "flex justify-between items-center border-b pb-4";
            
            const precoTotalItem = item.preco * item.quantidade;

            // **NOVO HTML para o item, com controles de quantidade**
            div.innerHTML = `
                <div class="flex-grow pr-4">
                    <span class="font-semibold">${item.nome}</span>
                    <span class="block text-sm text-gray-500">R$ ${parseFloat(item.preco).toFixed(2)} / un.</span>
                </div>
                <div class="flex items-center gap-3">
                    <button class="qty-btn text-lg font-bold text-gray-600 hover:text-black" data-id="${item.id}" data-action="decrease">-</button>
                    <span class="w-8 text-center">${item.quantidade}</span>
                    <button class="qty-btn text-lg font-bold text-gray-600 hover:text-black" data-id="${item.id}" data-action="increase">+</button>
                </div>
                <div class="w-24 text-right font-bold pl-4">
                    <span>R$ ${precoTotalItem.toFixed(2)}</span>
                </div>
                <button class="remover-item-btn text-red-500 hover:text-red-700 ml-4" data-id="${item.id}" title="Remover Item">
                    <i class="fas fa-trash-alt"></i>
                </button>
            `;
            cartItemsContainer.appendChild(div);
        });
    }

    // **NOVO CÁLCULO do total, considerando a quantidade**
    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    cartTotalSpan.textContent = total.toFixed(2);
}

/**
 * Inicializa toda a funcionalidade do carrinho.
 */
export function inicializarCarrinho() {
    // Listener para ADICIONAR itens ao carrinho
    document.body.addEventListener("click", (event) => {
        const target = event.target.closest('.btn-carrinho');
        if (target) {
            const produto = {
                id: target.dataset.id,
                nome: target.dataset.nome,
                preco: parseFloat(target.dataset.preco),
            };
            adicionarAoCarrinho(produto);
            
            // Abre o carrinho ao adicionar um item
            if (!cartToggleButton.checked) {
                cartToggleButton.checked = true;
            }
        }
    });

    // Listener para os botões do carrinho (Remover e Quantidade)
    cartItemsContainer.addEventListener('click', (event) => {
        const target = event.target;

        // **NOVO: Lógica para os botões de quantidade (+/-)**
        if (target.closest('.qty-btn')) {
            const btn = target.closest('.qty-btn');
            const produtoId = btn.dataset.id;
            const acao = btn.dataset.action;
            alterarQuantidade(produtoId, acao);
        }

        // Lógica para o botão de remover (lixeira)
        if (target.closest('.remover-item-btn')) {
            const btn = target.closest('.remover-item-btn');
            const produtoId = btn.dataset.id;
            removerItem(produtoId);
        }
    });

    // Atualiza a UI quando a página carrega
    atualizarCarrinhoUI();
}
