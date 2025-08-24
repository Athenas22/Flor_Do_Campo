import React, { useState, useMemo } from 'react';
import Banner from '../components/Banner';
import ProductCard from '../components/ProductCard';
import { useProdutos } from '../hooks/useProdutos';
import { DebugSupabase } from '../components/DebugSupabase';

interface HomeProps {
    onAddToCart: (id: number) => void;
    searchQuery?: string;
}

const Home: React.FC<HomeProps> = ({ onAddToCart, searchQuery }) => {
    const [selectedCategory, setSelectedCategory] = useState('todos');
    const { produtos, produtosDestaque, loading, error, filtrarPorCategoria, buscarPorTexto } = useProdutos();

    // Filtrar produtos por busca
    const produtosFiltradosPorBusca = useMemo(() => {
        if (!searchQuery) return produtos;
        
        return produtos.filter(produto =>
            produto.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
            produto.categoria.toLowerCase().includes(searchQuery.toLowerCase()) ||
            produto.descricao.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, produtos]);

    // Filtrar produtos por categoria
    const produtosFiltrados = useMemo(() => {
        if (selectedCategory === 'todos') return produtosFiltradosPorBusca;
        return produtosFiltradosPorBusca.filter(produto => produto.categoria === selectedCategory);
    }, [produtosFiltradosPorBusca, selectedCategory]);

    // Categorias únicas disponíveis
    const categorias = useMemo(() => {
        const categoriasUnicas = Array.from(new Set(produtos.map(p => p.categoria)));
        return ['todos', ...categoriasUnicas];
    }, [produtos]);

    // Executar busca quando searchQuery mudar
    React.useEffect(() => {
        if (searchQuery) {
            buscarPorTexto(searchQuery);
        }
    }, [searchQuery, buscarPorTexto]);

    // Executar filtro por categoria
    const handleCategoryFilter = (categoria: string) => {
        setSelectedCategory(categoria);
        if (categoria === 'todos') {
            filtrarPorCategoria('todos');
        } else {
            filtrarPorCategoria(categoria);
        }
    };

    // Loading state
    if (loading && produtos.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-xl text-gray-600">Carregando produtos...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <i className="fas fa-exclamation-triangle text-6xl text-red-500 mb-4"></i>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Erro ao carregar produtos</h2>
                    <p className="text-gray-500 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner apenas se não houver busca */}
            {!searchQuery && <Banner />}
            
            {/* Produtos em Destaque */}
            {!searchQuery && (
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                <i className="fas fa-star text-yellow-500 mr-2"></i>
                                Produtos em Destaque
                            </h2>
                            <p className="text-xl text-gray-600">
                                Descubra nossa seleção especial de produtos naturais com qualidade premium
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {produtosDestaque.map(produto => (
                                <ProductCard
                                    key={produto.id}
                                    produto={produto}
                                    onAddToCart={onAddToCart}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Catálogo de Produtos */}
            <section id="produtos" className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            {searchQuery ? `Resultados para "${searchQuery}"` : 'Todos os Produtos'}
                        </h2>
                        <p className="text-xl text-gray-600">
                            {searchQuery 
                                ? `${produtosFiltrados.length} produto(s) encontrado(s)`
                                : 'Explore toda nossa linha de produtos naturais e orgânicos'
                            }
                        </p>
                    </div>

                    {/* Filtros de Categoria */}
                    {!searchQuery && (
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            {categorias.map(categoria => (
                                <button
                                    key={categoria}
                                    onClick={() => handleCategoryFilter(categoria)}
                                    className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                                        selectedCategory === categoria
                                            ? 'bg-green-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-green-100'
                                    }`}
                                >
                                    {categoria === 'todos' ? 'Todos' : categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Grid de Produtos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {produtosFiltrados.map(produto => (
                            <ProductCard
                                key={produto.id}
                                produto={produto}
                                onAddToCart={onAddToCart}
                            />
                        ))}
                    </div>

                    {/* Mensagem quando não há produtos */}
                    {produtosFiltrados.length === 0 && (
                        <div className="text-center py-16">
                            <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
                            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                                Nenhum produto encontrado
                            </h3>
                            <p className="text-gray-500">
                                Tente buscar com outros termos ou explore nossas categorias
                            </p>
                        </div>
                    )}
                </div>
            </section>
            
            {/* Componente de Debug */}
            <DebugSupabase />
        </div>
    );
};

export default Home;
