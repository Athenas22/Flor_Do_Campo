import { supabase } from './supabase'
import type { Produto } from './supabase'

// ==============================
// FUNÇÕES PARA PRODUTOS
// ==============================

// Buscar todos os produtos
export const buscarProdutos = async (): Promise<Produto[]> => {
  try {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('disponivel', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar produtos:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Erro na requisição:', error)
    return []
  }
}

// Buscar produtos em destaque
export const buscarProdutosDestaque = async (): Promise<Produto[]> => {
  try {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('disponivel', true)
      .eq('destaque', true)
      .order('created_at', { ascending: false })
      .limit(4)

    if (error) {
      console.error('Erro ao buscar produtos em destaque:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Erro na requisição:', error)
    return []
  }
}

// Buscar produtos por categoria
export const buscarProdutosPorCategoria = async (categoria: string): Promise<Produto[]> => {
  try {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('disponivel', true)
      .eq('categoria', categoria)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar produtos por categoria:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Erro na requisição:', error)
    return []
  }
}

// Buscar produtos por texto (nome, descrição, categoria)
export const buscarProdutosPorTexto = async (texto: string): Promise<Produto[]> => {
  try {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('disponivel', true)
      .or(`nome.ilike.%${texto}%,descricao.ilike.%${texto}%,categoria.ilike.%${texto}%`)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar produtos por texto:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Erro na requisição:', error)
    return []
  }
}

// Buscar produto por ID
export const buscarProdutoPorId = async (id: number): Promise<Produto | null> => {
  try {
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Erro ao buscar produto por ID:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Erro na requisição:', error)
    return null
  }
}

// Buscar categorias disponíveis
export const buscarCategorias = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('produtos')
      .select('categoria')
      .eq('disponivel', true)

    if (error) {
      console.error('Erro ao buscar categorias:', error)
      return []
    }

    // Extrair categorias únicas
    const categorias = [...new Set(data?.map(item => item.categoria) || [])]
    return categorias
  } catch (error) {
    console.error('Erro na requisição:', error)
    return []
  }
}

// ==============================
// FUNÇÕES PARA ESTATÍSTICAS
// ==============================

// Contar total de produtos
export const contarProdutos = async (): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('produtos')
      .select('*', { count: 'exact', head: true })
      .eq('disponivel', true)

    if (error) {
      console.error('Erro ao contar produtos:', error)
      return 0
    }

    return count || 0
  } catch (error) {
    console.error('Erro na requisição:', error)
    return 0
  }
}

// ==============================
// FUNÇÕES DE TESTE
// ==============================

// Testar conexão com o banco
export const testarConexao = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('produtos')
      .select('id')
      .limit(1)

    if (error) {
      console.error('Erro na conexão:', error)
      return false
    }

    console.log('✅ Conexão com Supabase funcionando!')
    return true
  } catch (error) {
    console.error('❌ Erro na conexão:', error)
    return false
  }
}
