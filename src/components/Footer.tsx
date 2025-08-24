import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo e Descrição */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold mb-4">
                            <i className="fas fa-leaf mr-2 text-green-500"></i>
                            Flor do Campo
                        </h3>
                        <p className="text-gray-300 mb-4 max-w-md">
                            Produtos naturais e orgânicos selecionados especialmente para o seu bem-estar 
                            e qualidade de vida. Trabalhamos com os melhores fornecedores para garantir 
                            a pureza e qualidade de cada produto.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-green-500 transition-colors">
                                <i className="fab fa-facebook-f text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-green-500 transition-colors">
                                <i className="fab fa-instagram text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-green-500 transition-colors">
                                <i className="fab fa-whatsapp text-xl"></i>
                            </a>
                            <a href="#" className="text-gray-300 hover:text-green-500 transition-colors">
                                <i className="fab fa-twitter text-xl"></i>
                            </a>
                        </div>
                    </div>

                    {/* Links Rápidos */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-green-500">Links Rápidos</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="text-gray-300 hover:text-white transition-colors">
                                    <i className="fas fa-home mr-2"></i>
                                    Início
                                </a>
                            </li>
                            <li>
                                <a href="#produtos" className="text-gray-300 hover:text-white transition-colors">
                                    <i className="fas fa-leaf mr-2"></i>
                                    Produtos
                                </a>
                            </li>
                            <li>
                                <a href="/carrinho" className="text-gray-300 hover:text-white transition-colors">
                                    <i className="fas fa-shopping-cart mr-2"></i>
                                    Carrinho
                                </a>
                            </li>
                            <li>
                                <a href="/login" className="text-gray-300 hover:text-white transition-colors">
                                    <i className="fas fa-user mr-2"></i>
                                    Login
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contato */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-green-500">Contato</h4>
                        <div className="space-y-3">
                            <div className="flex items-center text-gray-300">
                                <i className="fas fa-map-marker-alt mr-3 text-green-500"></i>
                                <span>São Paulo, SP - Brasil</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                                <i className="fas fa-phone mr-3 text-green-500"></i>
                                <span>(11) 99999-9999</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                                <i className="fas fa-envelope mr-3 text-green-500"></i>
                                <span>contato@flordocampo.com</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                                <i className="fas fa-clock mr-3 text-green-500"></i>
                                <span>Seg - Sex: 9h às 18h</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Linha divisória */}
                <div className="border-t border-gray-700 mt-8 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-300 text-sm mb-4 md:mb-0">
                            © 2024 Flor do Campo. Todos os direitos reservados.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                                Política de Privacidade
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                                Termos de Uso
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                                FAQ
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
