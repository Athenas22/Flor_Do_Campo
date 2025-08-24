import { useState, useEffect } from 'react'
import { buscarProdutos, buscarProdutosDestaque, buscarProdutosPorCategoria, buscarProdutosPorTexto } from '../lib/produtos-api'
import type { Produto } from '../lib/supabase'

// Hook para gerenciar produtos
export const useProdutos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [produtosDestaque, setProdutosDestaque] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Carregar todos os produtos
  const carregarProdutos = async () => {
    try {
      setLoading(true)
      setError(null)
      const dados = await buscarProdutos()
      setProdutos(dados)
    } catch (err) {
      setError('Erro ao carregar produtos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Carregar produtos em destaque
  const carregarProdutosDestaque = async () => {
    try {
      const dados = await buscarProdutosDestaque()
      setProdutosDestaque(dados)
    } catch (err) {
      console.error('Erro ao carregar produtos em destaque:', err)
    }
  }

  // Filtrar por categoria
  const filtrarPorCategoria = async (categoria: string) => {
    try {
      setLoading(true)
      setError(null)
      
      let dados: Produto[]
      if (categoria === 'todos') {
        dados = await buscarProdutos()
      } else {
        dados = await buscarProdutosPorCategoria(categoria)
      }
      
      setProdutos(dados)
    } catch (err) {
      setError('Erro ao filtrar produtos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Buscar por texto
  const buscarPorTexto = async (texto: string) => {
    try {
      setLoading(true)
      setError(null)
      
      let dados: Produto[]
      if (texto.trim() === '') {
        dados = await buscarProdutos()
      } else {
        dados = await buscarProdutosPorTexto(texto)
      }
      
      setProdutos(dados)
    } catch (err) {
      setError('Erro ao buscar produtos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Carregar dados iniciais
  useEffect(() => {
    carregarProdutos()
    carregarProdutosDestaque()
  }, [])

  return {
    produtos,
    produtosDestaque,
    loading,
    error,
    carregarProdutos,
    filtrarPorCategoria,
    buscarPorTexto
  }
}

// Hook simplificado para busca
export const useBuscaProdutos = (textoInicial = '') => {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const buscar = async (texto: string) => {
    try {
      setLoading(true)
      setError(null)
      
      let dados: Produto[]
      if (texto.trim() === '') {
        dados = await buscarProdutos()
      } else {
        dados = await buscarProdutosPorTexto(texto)
      }
      
      setProdutos(dados)
    } catch (err) {
      setError('Erro ao buscar produtos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Buscar inicialmente se houver texto
  useEffect(() => {
    if (textoInicial) {
      buscar(textoInicial)
    }
  }, [textoInicial])

  return {
    produtos,
    loading,
    error,
    buscar
  }
}
