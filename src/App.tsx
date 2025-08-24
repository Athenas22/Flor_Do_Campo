import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import { useCarrinho } from './hooks/useCarrinho';

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const { carrinho, adicionarAoCarrinho, atualizarQuantidade, removerDoCarrinho, limparCarrinho, totalItens } = useCarrinho();

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleAddToCart = (id: number) => {
        adicionarAoCarrinho(id);
    };

    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-gray-50">
                    <Navbar 
                        cartItemsCount={totalItens}
                        onSearch={handleSearch}
                    />
                    
                    <main>
                        <Routes>
                            <Route 
                                path="/" 
                                element={
                                    <Home 
                                        onAddToCart={handleAddToCart}
                                        searchQuery={searchQuery}
                                    />
                                } 
                            />
                            <Route 
                                path="/carrinho" 
                                element={
                                    <CartPage 
                                        cartItems={carrinho}
                                        onUpdateQuantity={atualizarQuantidade}
                                        onRemoveFromCart={removerDoCarrinho}
                                        onClearCart={limparCarrinho}
                                    />
                                } 
                            />
                            <Route 
                                path="/login" 
                                element={<Login />} 
                            />
                            <Route 
                                path="/cadastro" 
                                element={<Cadastro />} 
                            />
                        </Routes>
                    </main>
                    
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
