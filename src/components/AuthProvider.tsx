import React from 'react'
import { useState, useEffect, createContext, ReactNode } from 'react'
import type { Usuario } from '../lib/supabase'
import { 
  cadastrarUsuario, 
  fazerLogin, 
  fazerLogout, 
  obterUsuarioAtual,
  atualizarPerfil,
  type CadastroData,
  type LoginData 
} from '../lib/auth-api'
import { supabase } from '../lib/supabase'

// ==============================
// CONTEXTO DE AUTENTICAÇÃO
// ==============================

interface AuthContextType {
  usuario: Usuario | null
  loading: boolean
  estaAutenticado: boolean
  login: (dados: LoginData) => Promise<{ success: boolean; message: string }>
  cadastro: (dados: CadastroData) => Promise<{ success: boolean; message: string }>
  logout: () => Promise<void>
  atualizarUsuario: (dados: Partial<Usuario>) => Promise<{ success: boolean; message: string }>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ==============================
// PROVIDER DE AUTENTICAÇÃO
// ==============================

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)

  // Verificar autenticação inicial
  useEffect(() => {
    const verificarAuth = async () => {
      try {
        const usuarioAtual = await obterUsuarioAtual()
        setUsuario(usuarioAtual)
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
      } finally {
        setLoading(false)
      }
    }

    verificarAuth()

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id)
        
        if (event === 'SIGNED_IN' && session?.user) {
          const usuarioAtual = await obterUsuarioAtual()
          setUsuario(usuarioAtual)
        } else if (event === 'SIGNED_OUT') {
          setUsuario(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Função de login
  const login = async (dados: LoginData) => {
    setLoading(true)
    try {
      const response = await fazerLogin(dados)
      
      if (response.success && response.user) {
        setUsuario(response.user)
      }
      
      return {
        success: response.success,
        message: response.message
      }
    } catch (error) {
      console.error('Erro no login:', error)
      return {
        success: false,
        message: 'Erro interno do servidor'
      }
    } finally {
      setLoading(false)
    }
  }

  // Função de cadastro
  const cadastro = async (dados: CadastroData) => {
    setLoading(true)
    try {
      const response = await cadastrarUsuario(dados)
      
      if (response.success && response.user) {
        setUsuario(response.user)
      }
      
      return {
        success: response.success,
        message: response.message
      }
    } catch (error) {
      console.error('Erro no cadastro:', error)
      return {
        success: false,
        message: 'Erro interno do servidor'
      }
    } finally {
      setLoading(false)
    }
  }

  // Função de logout
  const logout = async () => {
    setLoading(true)
    try {
      await fazerLogout()
      setUsuario(null)
    } catch (error) {
      console.error('Erro no logout:', error)
    } finally {
      setLoading(false)
    }
  }

  // Função de atualização do usuário
  const atualizarUsuario = async (dados: Partial<Usuario>) => {
    try {
      const response = await atualizarPerfil(dados)
      
      if (response.success && response.user) {
        setUsuario(response.user)
      }
      
      return {
        success: response.success,
        message: response.message
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
      return {
        success: false,
        message: 'Erro interno do servidor'
      }
    }
  }

  const value = {
    usuario,
    loading,
    estaAutenticado: !!usuario,
    login,
    cadastro,
    logout,
    atualizarUsuario
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
