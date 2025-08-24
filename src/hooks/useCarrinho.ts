import { useState, useEffect } from 'react';
import { Produto, produtos } from '../data/produtos';

export interface ItemCarrinho extends Produto {
    quantidade: number;
}

export const useCarrinho = () => {
    const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);

    // Carrega carrinho do localStorage
    useEffect(() => {
        const carrinhoSalvo = localStorage.getItem('carrinho');
        if (carrinhoSalvo) {
            setCarrinho(JSON.parse(carrinhoSalvo));
        }
    }, []);

    // Salva carrinho no localStorage sempre que muda
    useEffect(() => {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }, [carrinho]);

    const adicionarAoCarrinho = (produtoId: number) => {
        const produto = produtos.find(p => p.id === produtoId);
        if (!produto) return;

        setCarrinho(prev => {
            const itemExistente = prev.find(item => item.id === produtoId);
            if (itemExistente) {
                return prev.map(item =>
                    item.id === produtoId
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                );
            }
            return [...prev, { ...produto, quantidade: 1 }];
        });
    };

    const removerDoCarrinho = (produtoId: number) => {
        setCarrinho(prev => prev.filter(item => item.id !== produtoId));
    };

    const atualizarQuantidade = (produtoId: number, novaQuantidade: number) => {
        if (novaQuantidade <= 0) {
            removerDoCarrinho(produtoId);
            return;
        }
        setCarrinho(prev =>
            prev.map(item =>
                item.id === produtoId
                    ? { ...item, quantidade: novaQuantidade }
                    : item
            )
        );
    };

    const limparCarrinho = () => {
        setCarrinho([]);
    };

    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);

    return {
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        atualizarQuantidade,
        limparCarrinho,
        totalItens
    };
};
