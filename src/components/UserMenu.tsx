import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'

const UserMenu: React.FC = () => {
  const { estaAutenticado, usuario, logout } = useAuth()
  const [menuAberto, setMenuAberto] = useState(false)

  const handleLogout = async () => {
    await logout()
    setMenuAberto(false)
  }

  if (!estaAutenticado) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          to="/login"
          className="text-gray-700 hover:text-green-600 font-medium"
        >
          Entrar
        </Link>
        <Link
          to="/cadastro"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          Cadastrar
        </Link>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setMenuAberto(!menuAberto)}
        className="flex items-center space-x-2 text-gray-700 hover:text-green-600 focus:outline-none"
      >
        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold">
          {usuario?.nome?.charAt(0).toUpperCase() || 'U'}
        </div>
        <span className="font-medium">
          {usuario?.nome?.split(' ')[0] || 'Usuário'}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${menuAberto ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {menuAberto && (
        <>
          {/* Overlay para fechar o menu */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setMenuAberto(false)}
          />
          
          {/* Menu dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{usuario?.nome}</p>
              <p className="text-sm text-gray-500">{usuario?.email}</p>
            </div>
            
            <Link
              to="/perfil"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setMenuAberto(false)}
            >
              📋 Meu Perfil
            </Link>
            
            <Link
              to="/pedidos"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setMenuAberto(false)}
            >
              📦 Meus Pedidos
            </Link>
            
            <Link
              to="/carrinho"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setMenuAberto(false)}
            >
              🛒 Carrinho
            </Link>
            
            <hr className="my-1" />
            
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              🚪 Sair
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default UserMenu
