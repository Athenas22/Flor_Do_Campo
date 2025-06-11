// js/main.js

import { inicializarCarrinho } from './carrinho.js';
import { mostrarProdutos } from './catalogo.js';

// Espera o DOM carregar completamente para executar os scripts
document.addEventListener('DOMContentLoaded', () => {
    mostrarProdutos();
    inicializarCarrinho();
});