import { useState, useEffect, useContext } from 'react'
import type { Usuario } from '../lib/supabase'
import { obterUsuarioAtual } from '../lib/auth-api'
import { AuthContext } from '../components/AuthProvider'

// ==============================
// HOOK PARA USAR AUTENTICAÇÃO
// ==============================

export const useAuth = () => {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  
  return context
}

// ==============================
// HOOK SIMPLES PARA DADOS DE USUÁRIO
// ==============================

export const useUsuario = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        setError(null)
        const usuarioAtual = await obterUsuarioAtual()
        setUsuario(usuarioAtual)
      } catch (err) {
        console.error('Erro ao carregar usuário:', err)
        setError('Erro ao carregar dados do usuário')
      } finally {
        setLoading(false)
      }
    }

    carregarUsuario()
  }, [])

  return { usuario, loading, error }
}
