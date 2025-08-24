import React from 'react';
import { ItemCarrinho } from '../hooks/useCarrinho';

interface CartPageProps {
    cartItems: ItemCarrinho[];
    onUpdateQuantity: (id: number, quantidade: number) => void;
    onRemoveFromCart: (id: number) => void;
    onClearCart: () => void;
}

const CartPage: React.FC<CartPageProps> = ({
    cartItems,
    onUpdateQuantity,
    onRemoveFromCart,
    onClearCart
}) => {
    const total = cartItems.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        // Aqui você pode implementar a lógica de checkout
        alert('Redirecionando para o checkout...');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 mt-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        <i className="fas fa-shopping-cart mr-3"></i>
                        Meu Carrinho
                    </h1>
                </div>

                {cartItems.length === 0 ? (
                    <div className="text-center py-16">
                        <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-6"></i>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                            Seu carrinho está vazio
                        </h2>
                        <p className="text-gray-500 mb-8">
                            Adicione alguns produtos para continuar suas compras
                        </p>
                        <a
                            href="/"
                            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            <i className="fas fa-arrow-left mr-2"></i>
                            Continuar Comprando
                        </a>
                    </div>
                ) : (
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Lista de Produtos */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-2xl font-semibold mb-6">
                                        Produtos no Carrinho ({cartItems.length})
                                    </h2>
                                    
                                    <div className="space-y-4">
                                        {cartItems.map(item => (
                                            <div key={item.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                                                <img 
                                                    src={item.imagem} 
                                                    alt={item.nome}
                                                    className="w-20 h-20 object-cover rounded-lg mr-4"
                                                />
                                                
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg mb-1">{item.nome}</h3>
                                                    <p className="text-gray-600 text-sm mb-2">{item.categoria}</p>
                                                    <p className="text-green-600 font-bold text-lg">
                                                        R$ {item.preco.toFixed(2)}
                                                    </p>
                                                </div>
                                                
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantidade - 1))}
                                                            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                                                        >
                                                            <i className="fas fa-minus text-sm"></i>
                                                        </button>
                                                        
                                                        <span className="w-12 text-center font-semibold">
                                                            {item.quantidade}
                                                        </span>
                                                        
                                                        <button
                                                            onClick={() => onUpdateQuantity(item.id, item.quantidade + 1)}
                                                            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                                                        >
                                                            <i className="fas fa-plus text-sm"></i>
                                                        </button>
                                                    </div>
                                                    
                                                    <div className="text-right">
                                                        <p className="font-bold text-lg">
                                                            R$ {(item.preco * item.quantidade).toFixed(2)}
                                                        </p>
                                                    </div>
                                                    
                                                    <button
                                                        onClick={() => onRemoveFromCart(item.id)}
                                                        className="text-red-500 hover:text-red-700 p-2"
                                                        title="Remover item"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <button
                                            onClick={onClearCart}
                                            className="text-red-500 hover:text-red-700 font-semibold"
                                        >
                                            <i className="fas fa-trash mr-2"></i>
                                            Limpar Carrinho
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Resumo do Pedido */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                                    <h2 className="text-2xl font-semibold mb-6">Resumo do Pedido</h2>
                                    
                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between">
                                            <span>Subtotal:</span>
                                            <span>R$ {total.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Frete:</span>
                                            <span className="text-green-600">Grátis</span>
                                        </div>
                                        <div className="border-t pt-4">
                                            <div className="flex justify-between text-xl font-bold">
                                                <span>Total:</span>
                                                <span className="text-green-600">R$ {total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <button
                                        onClick={handleCheckout}
                                        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
                                    >
                                        <i className="fas fa-credit-card mr-2"></i>
                                        Finalizar Compra
                                    </button>
                                    
                                    <a
                                        href="/"
                                        className="block text-center mt-4 text-green-600 hover:text-green-700 font-semibold"
                                    >
                                        <i className="fas fa-arrow-left mr-2"></i>
                                        Continuar Comprando
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
