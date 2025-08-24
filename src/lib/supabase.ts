import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ajgnzwuabimfczdeonia.supabase.co'
const supabaseKey = 'sb_publishable_u-A3lUBeYEgmuYYwMEYvPQ_qDFgUCK8'

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

export interface Usuario {
  id: string
  email: string
  nome: string
  telefone?: string
  endereco?: string
  created_at: string
}

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