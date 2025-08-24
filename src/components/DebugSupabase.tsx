import { useEffect } from 'react'
import { testarConexao, buscarProdutos, contarProdutos } from '../lib/produtos-api'

// Componente para debug/teste
export const DebugSupabase = () => {
  
  useEffect(() => {
    const testarTudo = async () => {
      console.log('🔍 === TESTE SUPABASE ===')
      
      // Testar conexão
      const conexaoOk = await testarConexao()
      console.log('✅ Conexão:', conexaoOk ? 'OK' : 'ERRO')
      
      // Buscar produtos
      const produtos = await buscarProdutos()
      console.log('📦 Total de produtos:', produtos.length)
      console.log('📋 Produtos:', produtos)
      
      // Contar produtos
      const total = await contarProdutos()
      console.log('🔢 Contagem total:', total)
      
      // Mostrar primeiro produto
      if (produtos.length > 0) {
        console.log('🎯 Primeiro produto:', produtos[0])
      }
    }
    
    testarTudo()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-sm">
      <p>🔍 Debug: Veja o console (F12)</p>
    </div>
  )
}
