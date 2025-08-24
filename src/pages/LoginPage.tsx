import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica de autenticação
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center py-16 px-6 sm:px-8 lg:px-10">
      {/* Padrão de fundo decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-lg space-y-12">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-3 text-4xl font-bold text-green-700 hover:text-green-600 transition-colors">
            <i className="fas fa-leaf text-3xl"></i>
            Flor do Campo
          </Link>
          <h2 className="mt-8 text-4xl font-bold text-gray-900">
            {isLogin ? 'Entre na sua conta' : 'Crie sua conta'}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {isLogin ? 'Bem-vindo de volta!' : 'Junte-se à nossa comunidade natural'}
          </p>
        </div>

        {/* Card do formulário */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-10">
          {/* Botões de alternância */}
          <div className="flex bg-gray-100 rounded-2xl p-1.5 mb-10">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 px-6 rounded-xl text-base font-semibold transition-all duration-300 ${
                isLogin
                  ? 'bg-white text-green-700 shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 px-6 rounded-xl text-base font-semibold transition-all duration-300 ${
                !isLogin
                  ? 'bg-white text-green-700 shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Cadastrar
            </button>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-base font-semibold text-gray-700 mb-3">
                  Nome completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-user text-gray-400 text-lg"></i>
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-base"
                    placeholder="Seu nome completo"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-base font-semibold text-gray-700 mb-3">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400 text-lg"></i>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-base"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-base font-semibold text-gray-700 mb-3">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400 text-lg"></i>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-12 pr-14 py-4 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-base"
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-lg`}></i>
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-base font-semibold text-gray-700 mb-3">
                  Confirmar senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <i className="fas fa-lock text-gray-400 text-lg"></i>
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required={!isLogin}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="block w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-base"
                    placeholder="Confirme sua senha"
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Lembrar de mim
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-green-600 hover:text-green-500 transition-colors">
                    Esqueceu a senha?
                  </a>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                  <i className={`fas ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'} text-green-300 group-hover:text-green-200 text-lg`}></i>
                </span>
                {isLogin ? 'Entrar' : 'Criar conta'}
              </button>
            </div>
          </form>

          {/* Divisor */}
          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-base">
                <span className="px-4 bg-white text-gray-500">Ou continue com</span>
              </div>
            </div>

            {/* Login social */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <button
                type="button"
                className="w-full inline-flex justify-center py-4 px-6 border border-gray-300 rounded-xl shadow-sm bg-white text-base font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <i className="fab fa-google text-red-500 text-lg"></i>
                <span className="ml-3">Google</span>
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-4 px-6 border border-gray-300 rounded-xl shadow-sm bg-white text-base font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <i className="fab fa-facebook-f text-blue-600 text-lg"></i>
                <span className="ml-3">Facebook</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-base text-gray-600 leading-relaxed">
            Ao {isLogin ? 'entrar' : 'criar uma conta'}, você concorda com nossos{' '}
            <a href="#" className="font-medium text-green-600 hover:text-green-500">
              Termos de Uso
            </a>{' '}
            e{' '}
            <a href="#" className="font-medium text-green-600 hover:text-green-500">
              Política de Privacidade
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
