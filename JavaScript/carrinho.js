// Carrinho.js - Funcionalidades do carrinho de compras
import { produtos } from './dados/produtos.js';

// Variáveis globais
let cart = JSON.parse(localStorage.getItem('carrinho')) || [];
let appliedCoupon = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
});

function initializeCart() {
    updateCartDisplay();
    updateCartSidebar();
    updateCartCount();
    setupEventListeners();
}

function setupEventListeners() {
    // Event listeners para página do carrinho
    const clearCartBtn = document.getElementById('clear-cart');
    const applyCouponBtn = document.getElementById('apply-coupon');
    const removeCouponBtn = document.getElementById('remove-coupon');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);
    if (applyCouponBtn) applyCouponBtn.addEventListener('click', applyCoupon);
    if (removeCouponBtn) removeCouponBtn.addEventListener('click', removeCoupon);
    if (checkoutBtn) checkoutBtn.addEventListener('click', checkout);
    
    // Event listeners para sidebar do carrinho
    const cartToggle = document.getElementById('cart-toggle');
    if (cartToggle) {
        cartToggle.addEventListener('change', function() {
            if (this.checked) {
                loadCartSidebar();
            }
        });
    }
}

// Funções principais do carrinho
function addToCart(produtoId) {
    // Busca o produto pelo ID nos dados importados
    const produto = produtos.find(p => p.id === produtoId);
    
    if (!produto || !produto.disponivel) {
        showToast('Produto indisponível', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.id === produtoId);
    
    if (existingItem) {
        existingItem.quantidade += 1;
    } else {
        cart.push({ ...produto, quantidade: 1 });
    }
    
    saveCart();
    updateCartDisplay();
    updateCartSidebar();
    updateCartCount();
    showToast('Produto adicionado ao carrinho!', 'success');
}

// Função auxiliar para encontrar produto quando não há importação
function findProductById(id) {
    // Fallback: busca o produto no DOM ou retorna um produto básico
    const productCard = document.querySelector(`[data-product-id="${id}"]`);
    if (productCard) {
        return {
            id: id,
            nome: productCard.querySelector('.product-name')?.textContent || 'Produto',
            preco: parseFloat(productCard.querySelector('.product-price')?.textContent?.replace('R$', '').replace(',', '.')) || 0,
            imagem: productCard.querySelector('img')?.src || '',
            categoria: productCard.querySelector('.product-category')?.textContent || 'geral',
            disponivel: true
        };
    }
    return null;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
    updateCartSidebar();
    updateCartCount();
    showToast('Produto removido do carrinho', 'info');
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantidade = newQuantity;
        saveCart();
        updateCartDisplay();
        updateCartSidebar();
        updateCartCount();
    }
}

function clearCart() {
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
        cart = [];
        appliedCoupon = null;
        saveCart();
        updateCartDisplay();
        updateCartCount();
        showToast('Carrinho limpo', 'info');
    }
}

// Funções de exibição
function updateCartDisplay() {
    const emptyCart = document.getElementById('empty-cart');
    const cartContent = document.getElementById('cart-content');
    const cartSummary = document.getElementById('cart-summary');
    
    if (!emptyCart || !cartContent) return; // Não está na página do carrinho
    
    if (cart.length === 0) {
        emptyCart.classList.remove('hidden');
        cartContent.classList.add('hidden');
        if (cartSummary) cartSummary.textContent = '0 itens no carrinho';
    } else {
        emptyCart.classList.add('hidden');
        cartContent.classList.remove('hidden');
        if (cartSummary) {
            cartSummary.textContent = `${cart.length} ${cart.length === 1 ? 'item' : 'itens'} no carrinho`;
        }
        renderCartItems();
        updateOrderSummary();
    }
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    
    container.innerHTML = cart.map(item => `
        <div class="p-6">
            <div class="flex items-center gap-4">
                <div class="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img src="${item.imagem}" alt="${item.nome}" class="w-full h-full object-cover" 
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OWEzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW08L3RleHQ+PC9zdmc+'" />
                </div>
                
                <div class="flex-1 min-w-0">
                    <h3 class="text-lg font-semibold text-gray-900 truncate">${item.nome}</h3>
                    <p class="text-sm text-gray-500 capitalize">${item.categoria}</p>
                    <p class="text-xl font-bold text-green-600 mt-1">R$ ${item.preco.toFixed(2)}</p>
                </div>
                
                <div class="flex items-center gap-3">
                    <div class="flex items-center border border-gray-300 rounded-lg">
                        <button onclick="updateQuantity(${item.id}, ${item.quantidade - 1})" class="p-2 hover:bg-gray-100 transition-colors">
                            <i class="fas fa-minus text-gray-500"></i>
                        </button>
                        <span class="px-4 py-2 text-gray-900 font-semibold min-w-[3rem] text-center">${item.quantidade}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantidade + 1})" class="p-2 hover:bg-gray-100 transition-colors">
                            <i class="fas fa-plus text-gray-500"></i>
                        </button>
                    </div>
                    
                    <button onclick="removeFromCart(${item.id})" class="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            
            <div class="mt-4 flex justify-end">
                <p class="text-lg font-semibold text-gray-900">
                    Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2)}
                </p>
            </div>
        </div>
    `).join('');
}

function loadCartSidebar() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">Seu carrinho está vazio</p>';
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="flex items-center gap-3 p-3 border-b">
            <img src="${item.imagem}" alt="${item.nome}" class="w-12 h-12 object-cover rounded" 
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM5OWEzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWc8L3RleHQ+PC9zdmc+'" />
            <div class="flex-1 min-w-0">
                <h4 class="text-sm font-medium text-gray-900 truncate">${item.nome}</h4>
                <p class="text-xs text-gray-500">Qtd: ${item.quantidade}</p>
                <p class="text-sm font-semibold text-green-600">R$ ${(item.preco * item.quantidade).toFixed(2)}</p>
            </div>
        </div>
    `).join('');
}

function updateOrderSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    const shipping = subtotal >= 100 ? 0 : 15;
    const discount = appliedCoupon ? subtotal * 0.1 : 0;
    const total = subtotal + shipping - discount;
    
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `R$ ${total.toFixed(2)}`;
    
    // Update shipping info
    const shippingInfo = document.getElementById('shipping-info');
    const shippingMessage = document.getElementById('shipping-message');
    
    if (shippingInfo && shippingMessage) {
        if (subtotal >= 100) {
            shippingInfo.className = 'mb-6 p-3 bg-green-50 border border-green-200 rounded-lg';
            shippingMessage.innerHTML = '<i class="fas fa-check-circle mr-1"></i>Frete grátis aplicado!';
        } else {
            shippingInfo.className = 'mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg';
            shippingMessage.innerHTML = `<i class="fas fa-info-circle mr-1"></i>Adicione mais R$ ${(100 - subtotal).toFixed(2)} para frete grátis!`;
        }
    }
    
    // Update discount display
    const discountLine = document.getElementById('discount-line');
    const discountElement = document.getElementById('discount');
    
    if (discountLine && discountElement) {
        if (discount > 0) {
            discountLine.classList.remove('hidden');
            discountElement.textContent = `-R$ ${discount.toFixed(2)}`;
        } else {
            discountLine.classList.add('hidden');
        }
    }
}

function updateCartCount() {
    const cartCounts = document.querySelectorAll('#cart-count, .cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantidade, 0);
    
    cartCounts.forEach(element => {
        if (element) {
            element.textContent = totalItems;
        }
    });
}

// Funções de cupom
function applyCoupon() {
    const couponInput = document.getElementById('coupon-input');
    if (!couponInput) return;
    
    const couponCode = couponInput.value.trim().toLowerCase();
    
    if (couponCode === 'flordocampo10') {
        appliedCoupon = couponCode;
        const couponForm = document.getElementById('coupon-form');
        const couponApplied = document.getElementById('coupon-applied');
        
        if (couponForm) couponForm.classList.add('hidden');
        if (couponApplied) couponApplied.classList.remove('hidden');
        
        updateOrderSummary();
        showToast('Cupom aplicado com sucesso! 10% de desconto', 'success');
    } else {
        showToast('Cupom inválido. Tente: FLORDOCAMPO10', 'error');
    }
    
    couponInput.value = '';
}

function removeCoupon() {
    appliedCoupon = null;
    const couponForm = document.getElementById('coupon-form');
    const couponApplied = document.getElementById('coupon-applied');
    
    if (couponForm) couponForm.classList.remove('hidden');
    if (couponApplied) couponApplied.classList.add('hidden');
    
    updateOrderSummary();
    showToast('Cupom removido', 'info');
}

// Funções de checkout
function checkout() {
    if (cart.length === 0) {
        showToast('Carrinho vazio', 'error');
        return;
    }
    
    showToast('Redirecionando para o checkout...', 'info');
    setTimeout(() => {
        alert('Pedido realizado com sucesso! Obrigado pela compra.');
        cart = [];
        appliedCoupon = null;
        saveCart();
        updateCartDisplay();
        updateCartCount();
    }, 2000);
}

// Funções utilitárias
function saveCart() {
    localStorage.setItem('carrinho', JSON.stringify(cart));
}

function updateCartSidebar() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return; // Não existe sidebar
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-500 text-center py-8">Seu carrinho está vazio</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="flex items-center gap-3 p-3 border-b">
                <img src="${item.imagem}" alt="${item.nome}" class="w-12 h-12 object-cover rounded">
                <div class="flex-1">
                    <h4 class="font-medium text-sm">${item.nome}</h4>
                    <p class="text-green-600 font-bold">R$ ${item.preco.toFixed(2)}</p>
                </div>
                <div class="flex items-center gap-2">
                    <button onclick="updateQuantity(${item.id}, ${item.quantidade - 1})" class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm">-</button>
                    <span class="text-sm font-medium">${item.quantidade}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantidade + 1})" class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm">+</button>
                </div>
            </div>
        `).join('');
    }
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 transition-all duration-300 ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 'bg-blue-600'
    }`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Disponibilizar funções globalmente para uso em onclick
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;

// Função para visualizar produto
function viewProduct(produtoId) {
    console.log('Visualizando produto:', produtoId);
    // Por enquanto só redireciona para a página de produto
    window.location.href = `./ProductPage/produto.html?id=${produtoId}`;
}

// Disponibilizar globalmente
window.viewProduct = viewProduct;

// Exportar para módulos
export {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    updateCartCount,
    loadCartSidebar,
    showToast,
    viewProduct
};
