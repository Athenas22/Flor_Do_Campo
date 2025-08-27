import { supabase } from './supabase'
import type { Usuario, CadastroData, LoginData, AuthResponse } from '../types'

// ==============================
// FUNÇÕES DE AUTENTICAÇÃO
// ==============================

/**
 * Cadastra um novo usuário no sistema
 * @param dados Dados do usuário para cadastro
 */
export const cadastrarUsuario = async (dados: CadastroData): Promise<AuthResponse> => {
  try {
    // 1. Validar dados
    if (!dados.email || !dados.senha || !dados.nome) {
      return {
        success: false,
        message: 'Email, senha e nome são obrigatórios'
      }
    }

    // 2. Criar conta no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: dados.email,
      password: dados.senha
    })

    if (authError) {
      console.error('Erro na autenticação:', authError)
      return {
        success: false,
        message: authError.message === 'User already registered'
          ? 'Este email já está cadastrado'
          : 'Erro ao criar conta'
      }
    }

    if (!authData.user) {
      return {
        success: false,
        message: 'Erro ao criar usuário'
      }
    }

    // 3. Inserir dados na tabela usuarios
    const { data: userData, error: insertError } = await supabase
      .from('usuarios')
      .insert([{
        id: authData.user.id,
        email: dados.email,
        nome: dados.nome,
        telefone: dados.telefone || null
      }])
      .select()
      .single()

    if (insertError) {
      console.error('Erro ao salvar usuário:', insertError)
      return {
        success: false,
        message: 'Erro ao salvar dados do usuário'
      }
    }

    return {
      success: true,
      message: 'Usuário cadastrado com sucesso',
      user: userData
    }

  } catch (error: any) {
    console.error('Erro no cadastro:', error)
    return {
      success: false,
      message: 'Erro interno no servidor'
    }
  }
}

/**
 * Faz login do usuário no sistema
 * @param dados Dados de login (email e senha)
 */
export const loginUsuario = async (dados: LoginData): Promise<AuthResponse> => {
  try {
    // 1. Validar dados
    if (!dados.email || !dados.senha) {
      return {
        success: false,
        message: 'Email e senha são obrigatórios'
      }
    }

    // 2. Fazer login no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: dados.email,
      password: dados.senha
    })

    if (authError) {
      console.error('Erro no login:', authError)
      return {
        success: false,
        message: authError.message === 'Invalid login credentials'
          ? 'Email ou senha incorretos'
          : 'Erro ao fazer login'
      }
    }

    if (!authData.user) {
      return {
        success: false,
        message: 'Usuário não encontrado'
      }
    }

    // 3. Buscar dados completos do usuário
    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (userError) {
      console.error('Erro ao buscar dados do usuário:', userError)
      return {
        success: false,
        message: 'Erro ao carregar dados do usuário'
      }
    }

    return {
      success: true,
      message: 'Login realizado com sucesso',
      user: userData
    }

  } catch (error: any) {
    console.error('Erro no login:', error)
    return {
      success: false,
      message: 'Erro interno no servidor'
    }
  }
}

/**
 * Faz logout do usuário
 */
export const fazerLogout = async (): Promise<AuthResponse> => {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      throw error
    }

    return {
      success: true,
      message: 'Logout realizado com sucesso'
    }

  } catch (error: any) {
    console.error('Erro no logout:', error)
    return {
      success: false,
      message: 'Erro ao fazer logout'
    }
  }
}

/**
 * Verifica se há um usuário logado e retorna seus dados
 */
export const verificarUsuarioLogado = async (): Promise<AuthResponse> => {
  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) throw sessionError

    if (!session?.user) {
      return {
        success: false,
        message: 'Usuário não está logado'
      }
    }

    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', session.user.id)
      .single()

    if (userError) throw userError

    return {
      success: true,
      message: 'Usuário está logado',
      user: userData
    }

  } catch (error: any) {
    console.error('Erro ao verificar usuário:', error)
    return {
      success: false,
      message: 'Erro ao verificar usuário'
    }
  }
}
