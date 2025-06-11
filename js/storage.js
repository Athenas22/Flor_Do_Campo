// js/storage.js

const CHAVE_CARRINHO = 'flor_do_campo_carrinho';

/**
 * Obtém o carrinho do localStorage.
 * @returns {Array} O carrinho de compras.
 */
export function obterCarrinho() {
  return JSON.parse(localStorage.getItem(CHAVE_CARRINHO)) || [];
}

/**
 * Salva o carrinho no localStorage.
 * @param {Array} carrinho - O array de itens do carrinho.
 */
export function salvarCarrinho(carrinho) {
  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
}