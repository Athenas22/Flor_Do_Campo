import React from 'react';
import { useCartContext } from '../contexts/CartContext';
import { formatPrice } from '../utils/helpers';

const CartSidebar: React.FC = () => {
  const { 
    cartItems, 
    isCartOpen, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    toggleCart,
    clearCart 
  } = useCartContext();

  const itemCount = cartItems.reduce((total, item) => total + item.quantidade, 0);

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 z-[98] transition-opacity duration-300"
          onClick={toggleCart}
        />
      )}

      {/* Cart Sidebar */}
      <aside className={`fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl transition-transform duration-300 ease-in-out z-[99] ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <div>
              <h2 className="text-xl font-bold text-gray-800">🛍️ Seu Carrinho</h2>
              <p className="text-sm text-gray-600">{itemCount} {itemCount === 1 ? 'item' : 'itens'}</p>
            </div>
            <button 
              onClick={toggleCart}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <i className="fas fa-times text-xl text-gray-600"></i>
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-shopping-cart text-3xl text-gray-400"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Carrinho Vazio</h3>
                <p className="text-gray-600 mb-6">Adicione produtos para começar suas compras</p>
                <button 
                  onClick={toggleCart}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <img 
                          src={item.imagem} 
                          alt={item.nome}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1">
                          {item.nome}
                        </h4>
                        <p className="text-green-600 font-bold text-lg mb-3">
                          {formatPrice(item.preco)}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 bg-white rounded-lg border border-gray-200 p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                              className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                              <i className="fas fa-minus text-xs"></i>
                            </button>
                            <span className="font-semibold text-gray-800 min-w-[20px] text-center">
                              {item.quantidade}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                              className="w-8 h-8 rounded-md bg-green-100 flex items-center justify-center text-green-600 hover:bg-green-200 transition-colors"
                            >
                              <i className="fas fa-plus text-xs"></i>
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Subtotal</p>
                            <p className="font-bold text-gray-800">
                              {formatPrice(item.preco * item.quantidade)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {cartItems.length > 1 && (
                  <button 
                    onClick={clearCart}
                    className="w-full py-2 text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                  >
                    <i className="fas fa-trash mr-2"></i>
                    Limpar Carrinho
                  </button>
                )}
              </div>
            )}
          </div>
          
          {/* Footer com total e checkout */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 bg-white p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold text-gray-800">Total:</span>
                  <span className="font-bold text-2xl text-green-600">
                    {formatPrice(getCartTotal())}
                  </span>
                </div>
                
                <div className="text-center text-sm text-gray-600">
                  <p>💳 Parcelamento disponível</p>
                  <p>🚚 Frete grátis acima de R$ 100</p>
                </div>
                
                <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  <i className="fas fa-credit-card mr-2"></i>
                  Finalizar Compra
                </button>
                
                <button 
                  onClick={toggleCart}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  Continuar Comprando
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default CartSidebar;
