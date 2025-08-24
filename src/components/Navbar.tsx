import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';

interface NavbarProps {
    cartItemsCount: number;
    onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemsCount, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href="/" className="text-2xl font-bold text-green-600">
                            <i className="fas fa-leaf mr-2"></i>
                            Flor do Campo
                        </a>
                    </div>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-8">
                        <form onSubmit={handleSearch} className="w-full">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar produtos..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-green-600"
                                >
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        <a href="/" className="text-gray-700 hover:text-green-600 transition-colors">
                            <i className="fas fa-home mr-1"></i>
                            Início
                        </a>
                        <a href="#produtos" className="text-gray-700 hover:text-green-600 transition-colors">
                            <i className="fas fa-leaf mr-1"></i>
                            Produtos
                        </a>
                        <Link to="/carrinho" className="relative text-gray-700 hover:text-green-600 transition-colors">
                            <i className="fas fa-shopping-cart mr-1"></i>
                            Carrinho
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                                </span>
                            )}
                        </Link>
                        
                        {/* User Menu */}
                        <UserMenu />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-700 hover:text-green-600"
                        >
                            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="md:hidden pb-4">
                    <form onSubmit={handleSearch}>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar produtos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-green-600"
                            >
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4">
                        <div className="flex flex-col space-y-4">
                            <a href="/" className="text-gray-700 hover:text-green-600 transition-colors">
                                <i className="fas fa-home mr-2"></i>
                                Início
                            </a>
                            <a href="#produtos" className="text-gray-700 hover:text-green-600 transition-colors">
                                <i className="fas fa-leaf mr-2"></i>
                                Produtos
                            </a>
                            <a href="/carrinho" className="flex items-center text-gray-700 hover:text-green-600 transition-colors">
                                <i className="fas fa-shopping-cart mr-2"></i>
                                Carrinho
                                {cartItemsCount > 0 && (
                                    <span className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {cartItemsCount > 99 ? '99+' : cartItemsCount}
                                    </span>
                                )}
                            </a>
                            <a href="/login" className="text-gray-700 hover:text-green-600 transition-colors">
                                <i className="fas fa-user mr-2"></i>
                                Login
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
