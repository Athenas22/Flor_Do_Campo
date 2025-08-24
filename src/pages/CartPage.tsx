import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../contexts/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCartContext();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 15;
  const discount = appliedCoupon ? subtotal * 0.1 : 0; // 10% de desconto
  const total = subtotal + shipping - discount;

  const handleCouponApply = () => {
    // Simular validação de cupom
    if (couponCode.toLowerCase() === 'flordocampo10') {
      setAppliedCoupon(couponCode);
      setCouponCode('');
    } else {
      alert('Cupom inválido!');
    }
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simular processamento do pedido
    setTimeout(() => {
      alert('Pedido realizado com sucesso!');
      clearCart();
      setIsProcessing(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20">
            <div className="text-center">
              <div className="w-40 h-40 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-10">
                <i className="fas fa-shopping-cart text-5xl text-green-600"></i>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Seu carrinho está vazio</h2>
              <p className="text-lg text-gray-600 mb-12">Que tal adicionar alguns produtos naturais incríveis?</p>
              <Link
                to="/"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
              >
                <i className="fas fa-arrow-left text-lg"></i>
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Seu Carrinho</h1>
            <p className="text-lg text-gray-600">{cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'} no carrinho</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Lista de produtos */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Produtos</h2>
                    <button
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700 text-base font-medium transition-colors"
                    >
                      Limpar carrinho
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-8">
                      <div className="flex items-center gap-6">
                        {/* Imagem do produto */}
                        <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={item.imagem}
                            alt={item.nome}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbTwvdGV4dD48L3N2Zz4=';
                            }}
                          />
                        </div>

                        {/* Informações do produto */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-semibold text-gray-900 truncate">{item.nome}</h3>
                          <p className="text-base text-gray-500 capitalize mt-1">{item.categoria}</p>
                          <p className="text-2xl font-bold text-green-600 mt-2">R$ {item.preco.toFixed(2)}</p>
                        </div>

                        {/* Controles de quantidade */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, Math.max(0, item.quantidade - 1))}
                              className="p-3 hover:bg-gray-100 transition-colors"
                            >
                              <i className="fas fa-minus text-gray-500"></i>
                            </button>
                            <span className="px-6 py-3 text-gray-900 font-semibold min-w-[4rem] text-center text-lg">
                              {item.quantidade}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                              className="p-3 hover:bg-gray-100 transition-colors"
                            >
                              <i className="fas fa-plus text-gray-500"></i>
                            </button>
                          </div>

                          {/* Botão remover */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <i className="fas fa-trash text-lg"></i>
                          </button>
                        </div>
                      </div>

                      {/* Subtotal do item */}
                      <div className="mt-6 flex justify-end">
                        <p className="text-xl font-semibold text-gray-900">
                          Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cupom de desconto */}
              <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Cupom de Desconto</h3>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-check-circle text-green-600 text-lg"></i>
                      <span className="text-green-800 font-medium text-lg">Cupom "{appliedCoupon}" aplicado!</span>
                    </div>
                    <button
                      onClick={() => setAppliedCoupon(null)}
                      className="text-red-500 hover:text-red-700 text-lg"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Digite seu cupom"
                      className="flex-1 px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-base"
                    />
                    <button
                      onClick={handleCouponApply}
                      className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-base"
                    >
                      Aplicar
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Resumo do pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sticky top-28">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Resumo do Pedido</h2>

                <div className="space-y-6">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Frete</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">Grátis</span>
                      ) : (
                        `R$ ${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 text-base">
                      <span>Desconto</span>
                      <span className="font-semibold">-R$ {discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-green-600">R$ {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Informações de frete */}
                {subtotal < 100 && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-base text-blue-800">
                      <i className="fas fa-info-circle mr-2"></i>
                      Adicione mais R$ {(100 - subtotal).toFixed(2)} para frete grátis!
                    </p>
                  </div>
                )}

                {/* Botões de ação */}
                <div className="mt-8 space-y-4">
                  <button
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-3">
                        <i className="fas fa-spinner fa-spin text-lg"></i>
                        Processando...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        <i className="fas fa-credit-card text-lg"></i>
                        Finalizar Compra
                      </span>
                    )}
                  </button>

                  <Link
                    to="/"
                    className="w-full inline-flex items-center justify-center gap-3 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors text-lg"
                  >
                    <i className="fas fa-arrow-left text-lg"></i>
                    Continuar Comprando
                  </Link>
                </div>

                {/* Segurança */}
                <div className="mt-8 text-center">
                  <div className="flex items-center justify-center gap-3 text-base text-gray-500">
                    <i className="fas fa-shield-alt text-green-600 text-lg"></i>
                    <span>Compra 100% segura</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
