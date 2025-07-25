import React, { useState, useMemo } from 'react';
import { produtos } from '../data/produtos';
import { Product, Category } from '../types';
import ProductCard from './ProductCard';

interface CatalogProps {
  searchTerm?: string;
  onProductClick?: (product: Product) => void;
}

type SortOption = 'relevancia' | 'preco-menor' | 'preco-maior' | 'nome';

const Catalog: React.FC<CatalogProps> = ({ searchTerm = '', onProductClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('todos');
  const [sortBy, setSortBy] = useState<SortOption>('relevancia');
  
  // Calcular o preço máximo primeiro
  const maxPrice = Math.max(...produtos.map(p => p.preco));
  const [priceRange, setPriceRange] = useState({ min: 0, max: maxPrice });

  const filteredProducts = useMemo(() => {
    let filtered = produtos;

    // Filtrar por categoria
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(product => product.categoria === selectedCategory);
    }

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por faixa de preço
    filtered = filtered.filter(product => 
      product.preco >= priceRange.min && product.preco <= priceRange.max
    );

    // Ordenar produtos
    switch (sortBy) {
      case 'preco-menor':
        filtered.sort((a, b) => a.preco - b.preco);
        break;
      case 'preco-maior':
        filtered.sort((a, b) => b.preco - a.preco);
        break;
      case 'nome':
        filtered.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      default:
        // relevância (manter ordem original)
        break;
    }

    return filtered;
  }, [selectedCategory, searchTerm, sortBy, priceRange]);

  const categoryButtons: { key: Category; label: string; icon: string; count: number }[] = [
    { key: 'todos', label: 'Todos', icon: '🌟', count: produtos.length },
    { key: 'cha', label: 'Chás', icon: '🍃', count: produtos.filter(p => p.categoria === 'cha').length },
    { key: 'cosmetico', label: 'Cosméticos', icon: '💄', count: produtos.filter(p => p.categoria === 'cosmetico').length },
    { key: 'alimento', label: 'Alimentos', icon: '🍯', count: produtos.filter(p => p.categoria === 'alimento').length },
    { key: 'suplemento', label: 'Suplementos', icon: '💊', count: produtos.filter(p => p.categoria === 'suplemento').length },
    { key: 'oleo', label: 'Óleos', icon: '🌿', count: produtos.filter(p => p.categoria === 'oleo').length }
  ];

  return (
    <section id="catalogo" className="catalogo py-16 bg-white">
      <div className="w-full px-6 lg:px-12 xl:px-16">
        <div className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{fontSize: '4rem'}}>
              🛍️ Nosso Catálogo Completo
            </h2>
            <p className="text-lg text-gray-600 text-center">
              Explore nossa seleção completa de produtos naturais organizados por categoria
            </p>
          </div>
        
        {/* Filtros Premium - Design Ultra Moderno */}
        <div className="relative mb-8">
          {/* Background com gradiente e glassmorphism */}
          <div className="bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
            {/* Header Premium */}
            <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 px-4 py-8">
              {/* Efeito de brilho mais visível */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/20 to-white/5"></div>
              
              <div className="relative flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6">
                <div className="flex flex-col lg:flex-row items-center gap-6 text-center lg:text-left">
                  <div className="relative">
                    <div className="w-20 h-20 bg-white/30 rounded-3xl flex items-center justify-center backdrop-blur-sm border-2 border-white/40 shadow-2xl">
                      <i className="fas fa-sparkles text-white text-3xl drop-shadow-lg"></i>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <i className="fas fa-star text-white text-sm"></i>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Filtros Inteligentes</h2>
                    <p className="text-green-100 text-xl font-medium drop-shadow-md">Descubra produtos incríveis feitos para você</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-white/30 backdrop-blur-sm px-8 py-4 rounded-3xl border-2 border-white/40 shadow-xl">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-leaf text-yellow-300 text-xl drop-shadow-lg"></i>
                      <span className="text-white font-bold text-2xl drop-shadow-lg">
                        {filteredProducts.length} 
                      </span>
                      <span className="text-green-100 font-semibold text-lg drop-shadow-md">
                        {filteredProducts.length === 1 ? 'produto natural' : 'produtos naturais'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="px-4 py-8">
              {/* Categorias com Design Card Premium */}
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                    <h3 className="text-xl font-bold text-gray-800">Explore por Categoria</h3>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent"></div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {categoryButtons.map(({ key, label, icon, count }) => (
                    <div key={key} className="group">
                      <button
                        onClick={() => setSelectedCategory(key)}
                        className={`relative w-full p-6 rounded-3xl font-semibold transition-all duration-500 transform hover:scale-105 border-2 overflow-hidden ${
                          selectedCategory === key
                            ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white border-green-400 shadow-2xl shadow-green-500/30 scale-105'
                            : 'bg-white/70 backdrop-blur-sm text-gray-700 border-gray-200/50 hover:border-green-300 hover:shadow-xl hover:bg-white/90 shadow-lg'
                        }`}
                      >
                        {/* Efeito shimmer no hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        
                        <div className="relative flex flex-col items-center gap-3">
                          <div className={`text-3xl transition-all duration-300 ${
                            selectedCategory === key ? 'scale-110 drop-shadow-lg' : 'group-hover:scale-125'
                          }`}>
                            {icon}
                          </div>
                          <span className="text-sm font-bold">{label}</span>
                          <div className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                            selectedCategory === key 
                              ? 'bg-white/30 text-white shadow-lg' 
                              : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 group-hover:from-green-100 group-hover:to-emerald-100 group-hover:text-green-700'
                          }`}>
                            {count} itens
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Separador Elegante com Ícone */}
              <div className="relative flex items-center justify-center mb-10">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-300"></div>
                <div className="mx-6 p-3 bg-white rounded-full border-2 border-gray-200 shadow-lg">
                  <i className="fas fa-sliders-h text-green-600"></i>
                </div>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-300"></div>
              </div>

              {/* Controles Avançados */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4">
                {/* Ordenação Premium */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <i className="fas fa-sort-amount-down text-white text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Ordenação</h3>
                      <p className="text-gray-500 text-sm">Como você quer ver os produtos</p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:ring-4 focus:ring-green-100 focus:border-green-400 outline-none transition-all duration-300 font-semibold text-gray-700 text-lg shadow-lg hover:shadow-xl appearance-none cursor-pointer"
                    >
                      <option value="relevancia">🌟 Mais Relevantes</option>
                      <option value="preco-menor">💰 Menor Preço</option>
                      <option value="preco-maior">💎 Maior Preço</option>
                      <option value="nome">🔤 Ordem Alfabética</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <i className="fas fa-chevron-down text-gray-400"></i>
                    </div>
                  </div>
                </div>

                {/* Faixa de Preço Premium */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                      <i className="fas fa-coins text-white text-lg"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Faixa de Preço</h3>
                      <p className="text-gray-500 text-sm">Ajuste conforme seu orçamento</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-green-50/30 p-6 rounded-2xl border border-gray-200/50 shadow-inner">
                    <div className="flex items-center justify-between mb-6">
                      <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                        <span className="text-sm text-gray-500">Mínimo</span>
                        <div className="font-bold text-gray-700">R$ 0</div>
                      </div>
                      <div className="flex-1 mx-4 text-center">
                        <div className="text-2xl font-bold text-green-600">R$ {priceRange.max}</div>
                        <div className="text-xs text-gray-500">valor selecionado</div>
                      </div>
                      <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                        <span className="text-sm text-gray-500">Máximo</span>
                        <div className="font-bold text-gray-700">R$ {maxPrice}</div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-premium"
                        style={{
                          background: `linear-gradient(to right, #10b981 0%, #10b981 ${(priceRange.max / maxPrice) * 100}%, #e5e7eb ${(priceRange.max / maxPrice) * 100}%, #e5e7eb 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-2">
                        <span>💰 Econômico</span>
                        <span>💎 Premium</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resultados da busca */}
        {searchTerm && (
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            <p className="text-blue-800">
              <i className="fas fa-search mr-2"></i>
              Resultados para: <strong>"{searchTerm}"</strong> ({filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'})
            </p>
          </div>
        )}

        {/* Grid de Produtos */}
        <div className="produtos-grid">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-search text-4xl text-gray-400"></i>
                </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-600 mb-6">
                Tente ajustar os filtros ou buscar por outros termos
              </p>
              <button 
                onClick={() => {
                  setSelectedCategory('todos');
                  setSortBy('relevancia');
                  setPriceRange({ min: 0, max: maxPrice });
                }}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="w-full max-w-sm">
                  <ProductCard
                    product={product}
                    onProductClick={onProductClick}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Estatísticas dos produtos */}
        {filteredProducts.length > 0 && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl text-center">
              <div className="text-3xl mb-2">🌱</div>
              <h3 className="font-bold text-lg text-green-800">100% Natural</h3>
              <p className="text-green-600">Produtos sem conservantes</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl text-center">
              <div className="text-3xl mb-2">🚚</div>
              <h3 className="font-bold text-lg text-blue-800">Entrega Rápida</h3>
              <p className="text-blue-600">Frete grátis acima de R$ 100</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl text-center">
              <div className="text-3xl mb-2">💝</div>
              <h3 className="font-bold text-lg text-purple-800">Garantia</h3>
              <p className="text-purple-600">30 dias para trocas</p>
            </div>
          </div>
        )}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
