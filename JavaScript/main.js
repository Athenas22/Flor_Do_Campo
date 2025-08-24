// Main JavaScript file for Flor do Campo
import { produtos } from './dados/produtos.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Flor do Campo - Produtos Naturais carregado');
    
    // Update cart count
    updateCartCount();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize cart toggle
    initializeCartToggle();
    
    // Load featured products
    loadFeaturedProducts();
    
    // Load catalog
    loadCatalog();
    
    // Initialize category filters
    initializeCategoryFilters();
});

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const cart = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function initializeSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const query = searchInput?.value || '';
            searchProducts(query);
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts(this.value);
            }
        });
    }
}

function initializeCartToggle() {
    const cartToggle = document.getElementById('cart-toggle');
    if (cartToggle) {
        cartToggle.addEventListener('change', function() {
            if (this.checked) {
                loadCartSidebar();
            }
        });
    }
}

function initializeCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-green-600', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            
            // Add active class to clicked button
            this.classList.add('active', 'bg-green-600', 'text-white');
            this.classList.remove('bg-gray-200', 'text-gray-700');
            
            // Filter products
            const category = this.dataset.category;
            filterProductsByCategory(category);
        });
    });
}

function searchProducts(query) {
    console.log('Buscando por:', query);
    const filteredProducts = produtos.filter(produto => 
        produto.nome.toLowerCase().includes(query.toLowerCase()) ||
        produto.categoria.toLowerCase().includes(query.toLowerCase()) ||
        produto.descricao.toLowerCase().includes(query.toLowerCase())
    );
    renderCatalogProducts(filteredProducts);
}

function filterProductsByCategory(category) {
    let filteredProducts;
    if (category === 'todos') {
        filteredProducts = produtos;
    } else {
        filteredProducts = produtos.filter(produto => produto.categoria === category);
    }
    renderCatalogProducts(filteredProducts);
}

function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    const featuredProducts = produtos.filter(produto => produto.destaque);
    
    container.innerHTML = featuredProducts.map(produto => createProductCard(produto)).join('');
}

function loadCatalog() {
    renderCatalogProducts(produtos);
}

function renderCatalogProducts(productsToRender) {
    const container = document.getElementById('catalog-products');
    if (!container) return;
    
    container.innerHTML = productsToRender.map(produto => createProductCard(produto)).join('');
}

function createProductCard(produto) {
    return `
        <div class="product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div class="product-image-container relative">
                <img src="${produto.imagem}" alt="${produto.nome}" class="w-full h-48 object-cover" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbTwvdGV4dD48L3N2Zz4='" />
                ${produto.destaque ? '<span class="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">Destaque</span>' : ''}
                <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button class="favorite-btn bg-white rounded-full p-2 shadow-md hover:bg-gray-100" onclick="toggleFavorite(${produto.id})">
                        <i class="far fa-heart text-red-500"></i>
                    </button>
                </div>
            </div>
            
            <div class="p-4">
                <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full uppercase tracking-wide font-semibold mb-2">
                    ${produto.categoria}
                </span>
                <h3 class="product-name text-lg font-semibold text-gray-900 mb-2">${produto.nome}</h3>
                <p class="product-description text-gray-600 text-sm mb-3">${produto.descricao}</p>
                
                <div class="flex items-center justify-between">
                    <span class="product-price text-2xl font-bold text-green-600">R$ ${produto.preco.toFixed(2)}</span>
                    ${produto.disponivel ? 
                        '<span class="text-green-600 text-sm font-medium">✓ Disponível</span>' : 
                        '<span class="text-red-500 text-sm font-medium">✗ Indisponível</span>'
                    }
                </div>
                
                <div class="mt-4 space-y-2">
                    <button onclick="addToCart(${produto.id})" 
                            class="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors ${!produto.disponivel ? 'opacity-50 cursor-not-allowed' : ''}"
                            ${!produto.disponivel ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart mr-2"></i>
                        Adicionar ao Carrinho
                    </button>
                    
                    <div class="flex space-x-2">
                        <button onclick="viewProduct(${produto.id})" class="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                            <i class="fas fa-eye mr-1"></i>
                            Ver Detalhes
                        </button>
                        <button onclick="shareProduct(${produto.id})" class="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                            <i class="fas fa-share mr-1"></i>
                            Compartilhar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function addToCart(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto || !produto.disponivel) return;
    
    let cart = JSON.parse(localStorage.getItem('carrinho')) || [];
    const existingItem = cart.find(item => item.id === produtoId);
    
    if (existingItem) {
        existingItem.quantidade += 1;
    } else {
        cart.push({ ...produto, quantidade: 1 });
    }
    
    localStorage.setItem('carrinho', JSON.stringify(cart));
    updateCartCount();
    
    // Show feedback
    showToast('Produto adicionado ao carrinho!', 'success');
}

function toggleFavorite(produtoId) {
    let favorites = JSON.parse(localStorage.getItem('favoritos')) || [];
    const index = favorites.indexOf(produtoId);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showToast('Produto removido dos favoritos', 'info');
    } else {
        favorites.push(produtoId);
        showToast('Produto adicionado aos favoritos!', 'success');
    }
    
    localStorage.setItem('favoritos', JSON.stringify(favorites));
}

function viewProduct(produtoId) {
    window.location.href = `./pages/ProductPage/produto.html?id=${produtoId}`;
}

function shareProduct(produtoId) {
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) return;
    
    if (navigator.share) {
        navigator.share({
            title: produto.nome,
            text: produto.descricao,
            url: window.location.href + `#produto-${produtoId}`
        });
    } else {
        // Fallback
        const url = window.location.href + `#produto-${produtoId}`;
        navigator.clipboard.writeText(url);
        showToast('Link copiado para a área de transferência!', 'info');
    }
}

function loadCartSidebar() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    
    const cart = JSON.parse(localStorage.getItem('carrinho')) || [];
    
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
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Export functions for use in other modules
window.FlorDoCampo = {
    updateCartCount,
    searchProducts,
    loadFeaturedProducts,
    loadCatalog,
    addToCart,
    toggleFavorite,
    viewProduct,
    shareProduct
};
