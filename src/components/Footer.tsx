import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 text-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-white rounded-full"></div>
      </div>
      
      <div className="w-full px-6 lg:px-12 xl:px-16 py-20 relative z-10">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Coluna 1 - Logo e Descrição */}
            <div className="lg:col-span-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-8">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-700 text-2xl font-bold">🌿</span>
                </div>
                <h3 className="text-3xl font-bold">Flor do Campo</h3>
              </div>
              
              <p className="text-green-100 leading-relaxed mb-8 text-lg">
                Produtos naturais e orgânicos para seu bem-estar e qualidade de vida. Cuidando de você e do meio ambiente.
              </p>
              
              <div className="flex items-center justify-center lg:justify-start text-green-100 bg-green-700/30 rounded-lg px-4 py-2 inline-flex">
                <i className="fas fa-leaf mr-3 text-lg"></i>
                <span className="font-semibold">100% Natural</span>
              </div>
            </div>

            {/* Coluna 2 - Links Rápidos */}
            <div className="text-center lg:text-left">
              <h4 className="text-xl font-bold mb-8 text-green-100 border-b border-green-600 pb-3">Links Rápidos</h4>
              <ul className="space-y-8">
                <li>
                  <a href="#" className="text-green-200 hover:text-white transition-all duration-300 flex items-center justify-center lg:justify-start group text-lg">
                    <i className="fas fa-home mr-4 group-hover:text-yellow-300 text-lg"></i>
                    <span className="group-hover:translate-x-1 transition-transform">Início</span>
                  </a>
                </li>
                <li>
                  <a href="#catalogo" className="text-green-200 hover:text-white transition-all duration-300 flex items-center justify-center lg:justify-start group text-lg">
                    <i className="fas fa-store mr-4 group-hover:text-yellow-300 text-lg"></i>
                    <span className="group-hover:translate-x-1 transition-transform">Produtos</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-200 hover:text-white transition-all duration-300 flex items-center justify-center lg:justify-start group text-lg">
                    <i className="fas fa-info-circle mr-4 group-hover:text-yellow-300 text-lg"></i>
                    <span className="group-hover:translate-x-1 transition-transform">Sobre</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-200 hover:text-white transition-all duration-300 flex items-center justify-center lg:justify-start group text-lg">
                    <i className="fas fa-envelope mr-4 group-hover:text-yellow-300 text-lg"></i>
                    <span className="group-hover:translate-x-1 transition-transform">Contato</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Coluna 3 - Categorias */}
            <div className="text-center lg:text-left">
              <h4 className="text-xl font-bold mb-8 text-green-100 border-b border-green-600 pb-3">Categorias</h4>
              <ul className="space-y-8">
                <li>
                  <a href="#" className="text-green-200 hover:text-white transition-all duration-300 flex items-center justify-center lg:justify-start group text-lg">
                    <span className="mr-4 group-hover:scale-125 transition-transform text-2xl">🍃</span>
                    <span className="group-hover:translate-x-1 transition-transform">Chás</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-200 hover:text-white transition-all duration-300 flex items-center justify-center lg:justify-start group text-lg">
                    <span className="mr-4 group-hover:scale-125 transition-transform text-2xl">💄</span>
                    <span className="group-hover:translate-x-1 transition-transform">Cosméticos</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-200 hover:text-white transition-all duration-300 flex items-center justify-center lg:justify-start group text-lg">
                    <span className="mr-4 group-hover:scale-125 transition-transform text-2xl">🍯</span>
                    <span className="group-hover:translate-x-1 transition-transform">Alimentos</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-green-200 hover:text-white transition-all duration-300 flex items-center justify-center lg:justify-start group text-lg">
                    <span className="mr-4 group-hover:scale-125 transition-transform text-2xl">💊</span>
                    <span className="group-hover:translate-x-1 transition-transform">Suplementos</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Coluna 4 - Contato */}
            <div className="text-center lg:text-left">
              <h4 className="text-xl font-bold mb-8 text-green-100 border-b border-green-600 pb-3">Contato</h4>
              <div className="space-y-10">
                <div className="flex items-center justify-center lg:justify-start text-green-200">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <i className="fas fa-phone text-lg"></i>
                  </div>
                  <div>
                    <p className="text-sm text-green-300 mb-1">Telefone</p>
                    <p className="font-bold text-lg">(11) 99999-9999</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center lg:justify-start text-green-200">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <i className="fas fa-envelope text-lg"></i>
                  </div>
                  <div>
                    <p className="text-sm text-green-300 mb-1">Email</p>
                    <p className="font-bold text-lg break-all">contato@flordocampo.com</p>
                  </div>
                </div>
                
                <div className="pt-8">
                  <p className="text-green-100 mb-6 text-lg font-semibold">Siga-nos:</p>
                  <div className="flex justify-center lg:justify-start space-x-4">
                    <a href="#" className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-green-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
                      <i className="fab fa-facebook text-xl"></i>
                    </a>
                    <a href="#" className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-green-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
                      <i className="fab fa-instagram text-xl"></i>
                    </a>
                    <a href="#" className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-green-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
                      <i className="fab fa-whatsapp text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Copyright separada */}
      <div className="border-t border-green-600 bg-green-900/50 relative z-10">
        <div className="w-full px-6 lg:px-12 xl:px-16">
          <div className="max-w-[1600px] mx-auto py-10">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-8 text-sm text-green-200">
                <a href="#" className="hover:text-white transition-colors font-medium py-2 px-4 rounded-lg hover:bg-green-800/30">
                  Política de Privacidade
                </a>
                <a href="#" className="hover:text-white transition-colors font-medium py-2 px-4 rounded-lg hover:bg-green-800/30">
                  Termos de Uso
                </a>
                <a href="#" className="hover:text-white transition-colors font-medium py-2 px-4 rounded-lg hover:bg-green-800/30">
                  FAQ
                </a>
              </div>
              <p className="text-lg font-bold text-green-100 text-center">
                © 2025 Flor do Campo. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
