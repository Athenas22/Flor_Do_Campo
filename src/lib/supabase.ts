import { createClient } from '@supabase/supabase-js'
import type { Usuario, CadastroData } from '../types'

const supabaseUrl = 'https://ajgnzwuabimfczdeonia.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZ256d3VhYmltZmN6ZGVvbmlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4NTgxMDgsImV4cCI6MjAyMzQzNDEwOH0.u-A3lUBeYEgmuYYwMEYvPQ_qDFgUCK8Z6ptcZF5JR4Q'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos TypeScript para o banco
export interface Produto {
  id: number
  nome: string
  preco: number
  categoria: string
  descricao: string
  imagem: string
  disponivel: boolean
  estoque: number
  destaque: boolean
  created_at: string
}

// Interface Usuario removida - agora é importada de '../types'

export interface Pedido {
  id: number
  usuario_id: string
  total: number
  status: 'pendente' | 'confirmado' | 'enviado' | 'entregue' | 'cancelado'
  endereco_entrega: string
  created_at: string
}

export interface ItemPedido {
  id: number
  pedido_id: number
  produto_id: number
  quantidade: number
  preco_unitario: number
}

// Adicionar interface para o Carrinho
export interface CarrinhoItem {
  produto_id: number
  quantidade: number
  usuario_id: string
}

// Funções de autenticação
export async function loginUsuario(dados: { email: string; senha: string }) {
  try {
    // 1. Fazer login na autenticação
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: dados.email,
      password: dados.senha,
    })

    if (authError) {
      throw {
        message: authError.message === 'Invalid login credentials'
          ? 'Email ou senha incorretos'
          : 'Erro ao fazer login'
      }
    }

    // 2. Buscar dados do usuário
    if (authData.user) {
      const { data: userData, error: userError } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (userError) throw userError

      return { data: { auth: authData, user: userData }, error: null }
    }

    throw new Error('Falha no login')
  } catch (error: any) {
    console.error('Erro no login:', error)
    return { 
      data: null, 
      error: {
        message: error.message || 'Erro interno no servidor'
      }
    }
  }
}

export async function logout() {
  return await supabase.auth.signOut()
}

export async function getCurrentUser() {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return { data: null, error: 'Não autenticado' }
    
    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', session.user.id)
      .single()
      
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// Função cadastrarUsuario corrigida
export async function cadastrarUsuario(dados: CadastroData) {
  try {
    // 1. Criar usuário na auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: dados.email,
      password: dados.senha,
      options: {
        data: {
          nome: dados.nome // Apenas o nome nos metadados
        }
      }
    })

    if (authError) throw authError

    // 2. Inserir na tabela usuarios com campos obrigatórios
    const { error: insertError } = await supabase
      .from('usuarios')
      .insert({
        id: authData.user?.id,     // ID gerado pelo auth
        email: dados.email,        // Email
        nome: dados.nome,          // Nome
        telefone: dados.telefone   // Telefone (opcional)
      })

    if (insertError) {
      console.error('Erro ao inserir usuário:', insertError)
      throw insertError
    }

    return { data: authData.user, error: null }

  } catch (error: any) {
    console.error('Erro no cadastro:', error.message)
    return { data: null, error: error.message }
  }
}

// Funções para manipular o carrinho
export async function adicionarAoCarrinho(item: CarrinhoItem) {
  try {
    // Verifica se o item já existe no carrinho
    const { data: existente } = await supabase
      .from('carrinho')
      .select()
      .match({ usuario_id: item.usuario_id, produto_id: item.produto_id })
      .single()

    if (existente) {
      // Atualiza quantidade se já existir
      const { data, error } = await supabase
        .from('carrinho')
        .update({ quantidade: existente.quantidade + item.quantidade })
        .match({ usuario_id: item.usuario_id, produto_id: item.produto_id })
        .select()
      
      if (error) throw error
      return { data, error: null }
    }

    // Insere novo item se não existir
    const { data, error } = await supabase
      .from('carrinho')
      .insert([item])
      .select()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export async function getCarrinho(usuario_id: string) {
  try {
    const { data, error } = await supabase
      .from('carrinho')
      .select(`
        quantidade,
        produtos (
          id,
          nome,
          preco,
          imagem,
          estoque
        )
      `)
      .eq('usuario_id', usuario_id)

    if (error) throw error
    
    // Formatar dados do carrinho
    const carrinhoFormatado = data.map(item => ({
      quantidade: item.quantidade,
      produto: item.produtos
    }))
    
    return { data: carrinhoFormatado, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export async function atualizarQuantidadeCarrinho(
  usuario_id: string, 
  produto_id: number, 
  quantidade: number
) {
  try {
    if (quantidade <= 0) {
      return await removerDoCarrinho(usuario_id, produto_id)
    }

    const { data, error } = await supabase
      .from('carrinho')
      .update({ quantidade })
      .match({ usuario_id, produto_id })
      .select()

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export async function removerDoCarrinho(usuario_id: string, produto_id: number) {
  return await supabase
    .from('carrinho')
    .delete()
    .match({ usuario_id, produto_id })
}