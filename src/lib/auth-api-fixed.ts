import { supabase } from './supabase'
import type { Usuario } from './supabase'

// ==============================
// TIPOS PARA AUTENTICAÇÃO
// ==============================

export interface CadastroData {
  email: string
  senha: string
  nome: string
  telefone?: string
  dataNascimento?: string
  endereco?: string
  // Campos estruturados de endereço
  cep?: string
  rua?: string
  numero?: string
  complemento?: string
  bairro?: string
  cidade?: string
  uf?: string
  aceitaMarketing?: boolean
}

export interface LoginData {
  email: string
  senha: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: Usuario | null
}

// ==============================
// FUNÇÕES DE AUTENTICAÇÃO
// ==============================

// Cadastrar novo usuário
export const cadastrarUsuario = async (dados: CadastroData): Promise<AuthResponse> => {
  try {
    console.log('🔄 Iniciando cadastro...', { email: dados.email, nome: dados.nome })
    
    // 1. Criar conta no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: dados.email,
      password: dados.senha,
      options: {
        data: {
          nome: dados.nome,
          telefone: dados.telefone || '',
          data_nascimento: dados.dataNascimento || '',
          endereco: dados.endereco || ''
        }
      }
    })

    if (authError) {
      console.error('❌ Erro no Supabase Auth:', authError)
      return {
        success: false,
        message: authError.message === 'User already registered' 
          ? 'Este email já está cadastrado' 
          : 'Erro ao criar conta'
      }
    }

    console.log('✅ Usuário criado no Auth:', authData.user?.email)

    if (!authData.user) {
      console.error('❌ Nenhum usuário retornado do Auth')
      return {
        success: false,
        message: 'Erro ao criar usuário'
      }
    }

    // 2. Inserir dados na tabela usuarios
    console.log('📝 Inserindo dados na tabela usuarios...')
    const dadosUsuario = {
      auth_id: authData.user.id,
      email: dados.email,
      nome: dados.nome,
      telefone: dados.telefone || null,
      data_nascimento: dados.dataNascimento || null,
      endereco: dados.endereco ? `${dados.rua}, ${dados.numero}${dados.complemento ? ', ' + dados.complemento : ''}, ${dados.bairro}, ${dados.cidade}/${dados.uf}, CEP: ${dados.cep}` : null,
      // Campos estruturados
      cep: dados.cep || null,
      rua: dados.rua || null,
      numero: dados.numero || null,
      complemento: dados.complemento || null,
      bairro: dados.bairro || null,
      cidade: dados.cidade || null,
      uf: dados.uf || null,
      aceita_marketing: dados.aceitaMarketing || false
    }

    console.log('📊 Dados a serem inseridos:', dadosUsuario)

    const { data: userData, error: dbError } = await supabase
      .from('usuarios')
      .insert([dadosUsuario])
      .select()
      .single()

    if (dbError) {
      console.error('❌ Erro ao salvar no banco:', dbError)
      return {
        success: false,
        message: `Erro ao salvar dados: ${dbError.message}`
      }
    }

    console.log('✅ Usuário salvo no banco com sucesso:', userData)

    return {
      success: true,
      message: 'Conta criada com sucesso!',
      user: userData
    }

  } catch (error) {
    console.error('❌ Erro geral no cadastro:', error)
    return {
      success: false,
      message: 'Erro interno do servidor'
    }
  }
}

// Fazer login
export const loginUsuario = async (dados: LoginData): Promise<AuthResponse> => {
  try {
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

    // Buscar dados completos do usuário
    const { data: usuario, error: userError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('auth_id', data.user.id)
      .single()

    if (userError) {
      console.error('Erro ao buscar dados do usuário:', userError)
    }

    return {
      success: true,
      message: 'Login realizado com sucesso!',
      user: usuario
    }

  } catch (error) {
    console.error('Erro no login:', error)
    return {
      success: false,
      message: 'Erro interno do servidor'
    }
  }
}

// Fazer logout
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
      message: 'Logout realizado com sucesso!'
    }

  } catch (error) {
    console.error('Erro no logout:', error)
    return {
      success: false,
      message: 'Erro interno do servidor'
    }
  }
}

// Verificar se usuário está logado
export const verificarUsuarioLogado = async (): Promise<AuthResponse> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return {
        success: false,
        message: 'Usuário não está logado'
      }
    }

    // Buscar dados completos do usuário
    const { data: usuario, error: userError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('auth_id', user.id)
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
      message: 'Usuário está logado',
      user: usuario
    }

  } catch (error) {
    console.error('Erro ao verificar usuário logado:', error)
    return {
      success: false,
      message: 'Erro interno do servidor'
    }
  }
}

// Atualizar dados do usuário
export const atualizarUsuario = async (dados: Partial<CadastroData>): Promise<AuthResponse> => {
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
        telefone: dados.telefone,
        data_nascimento: dados.dataNascimento,
        endereco: dados.endereco,
        cep: dados.cep,
        rua: dados.rua,
        numero: dados.numero,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.cidade,
        uf: dados.uf,
        aceita_marketing: dados.aceitaMarketing
      })
      .eq('auth_id', user.id)
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
      message: 'Dados atualizados com sucesso!',
      user: userData
    }

  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    return {
      success: false,
      message: 'Erro interno do servidor'
    }
  }
}
