import { supabase } from './supabase'
import type { Usuario, CadastroData, LoginData, AuthResponse } from '../types'

/**
 * Cadastra um novo usuário no sistema
 */
export const cadastrarUsuario = async (dados: CadastroData): Promise<AuthResponse> => {
  try {
    // Validar dados obrigatórios
    if (!dados.email || !dados.senha || !dados.nome) {
      return {
        success: false,
        message: 'Email, senha e nome são obrigatórios'
      }
    }

    // Criar usuário no auth
    const { data, error } = await supabase.auth.signUp({
      email: dados.email,
      password: dados.senha
    })

    if (error) {
      return {
        success: false,
        message: error.message === 'User already registered'
          ? 'Este email já está cadastrado'
          : 'Erro ao criar conta'
      }
    }

    if (!data.user) {
      return {
        success: false,
        message: 'Erro ao criar usuário'
      }
    }

    // Inserir dados na tabela usuarios
    const { data: newUser, error: insertError } = await supabase
      .from('usuarios')
      .insert([{
        id: data.user.id,
        email: dados.email,
        nome: dados.nome,
        telefone: dados.telefone || null
      }])
      .select()
      .single()

    if (insertError) {
      return {
        success: false,
        message: 'Erro ao salvar dados do usuário'
      }
    }

    return {
      success: true,
      message: 'Usuário cadastrado com sucesso',
      user: newUser
    }

  } catch (error) {
    return {
      success: false, 
      message: 'Erro interno do servidor'
    }
  }
}

/**
 * Faz login do usuário no sistema
 */
export const loginUsuario = async (dados: LoginData): Promise<AuthResponse> => {
  try {
    // Validar dados obrigatórios
    if (!dados.email || !dados.senha) {
      return {
        success: false,
        message: 'Email e senha são obrigatórios'
      }
    }

    // Login no auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: dados.email,
      password: dados.senha
    })

    if (error) {
      return {
        success: false,
        message: error.message === 'Invalid login credentials'
          ? 'Email ou senha incorretos'
          : 'Erro ao fazer login'
      }
    }

    if (!data.user) {
      return {
        success: false,
        message: 'Erro ao fazer login'
      }
    }

    // Buscar dados do usuário
    const { data: user, error: userError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (userError) {
      return {
        success: false,
        message: 'Erro ao carregar dados do usuário'
      }
    }

    return {
      success: true,
      message: 'Login realizado com sucesso',
      user
    }

  } catch (error) {
    return {
      success: false,
      message: 'Erro interno do servidor'
    }
  }
}

/**
 * Faz logout do usuário no sistema
 */
export const logoutUsuario = async (): Promise<AuthResponse> => {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return {
        success: false,
        message: 'Erro ao fazer logout'
      }
    }

    return {
      success: true,
      message: 'Logout realizado com sucesso'
    }

  } catch (error) {
    return {
      success: false,
      message: 'Erro interno do servidor'
    }
  }
}

/**
 * Verifica se o usuário está logado
 */
export const verificarUsuarioLogado = async (): Promise<AuthResponse> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return {
        success: false,
        message: 'Usuário não está logado'
      }
    }

    // Buscar dados do usuário
    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', user.id)
      .single()

    if (userError) {
      return {
        success: false,
        message: 'Erro ao carregar dados do usuário'
      }
    }

    return {
      success: true,
      message: 'Usuário está logado',
      user: userData
    }

  } catch (error) {
    return {
      success: false,
      message: 'Erro interno do servidor'
    }
  }
}

/**
 * Atualiza os dados do usuário logado
 */
export const atualizarUsuario = async (dados: Partial<Usuario>): Promise<AuthResponse> => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return {
        success: false,
        message: 'Usuário não está logado'
      }
    }

    const { data: userData, error: updateError } = await supabase
      .from('usuarios')
      .update({
        nome: dados.nome,
        telefone: dados.telefone
      })
      .eq('id', user.id)
      .select()
      .single()

    if (updateError) {
      return {
        success: false,
        message: 'Erro ao atualizar dados'
      }
    }

    return {
      success: true,
      message: 'Dados atualizados com sucesso',
      user: userData
    }

  } catch (error) {
    return {
      success: false,
      message: 'Erro interno do servidor'
    }
  }
}
