import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
    dataNascimento: '',
    endereco: {
      cep: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: ''
    },
    aceitaMarketing: false
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { cadastro, loading } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    
    if (name.startsWith('endereco.')) {
      const enderecoField = name.split('.')[1]
      setFormData({
        ...formData,
        endereco: {
          ...formData.endereco,
          [enderecoField]: value
        }
      })
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validações - Campos obrigatórios expandidos
    // Campos obrigatórios básicos
    if (!formData.nome || !formData.email || !formData.telefone || !formData.senha || !formData.confirmarSenha) {
      setError('Preencha todos os campos obrigatórios: Nome, Email, Telefone, Senha e Confirmar Senha')
      return
    }

    // Campos de endereço obrigatórios
    if (!formData.endereco.cep || !formData.endereco.rua || !formData.endereco.numero || 
        !formData.endereco.bairro || !formData.endereco.cidade || !formData.endereco.uf) {
      setError('Preencha todos os campos de endereço: CEP, Rua, Número, Bairro, Cidade e UF')
      return
    }

    if (!formData.email.includes('@')) {
      setError('Digite um email válido')
      return
    }

    if (formData.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres')
      return
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem')
      return
    }

    // Validar nome (apenas letras e espaços)
    const nomeRegex = /^[a-zA-ZÀ-ÿ\s]+$/
    if (!nomeRegex.test(formData.nome)) {
      setError('Nome deve conter apenas letras e espaços')
      return
    }

    // Validar telefone obrigatório (formato brasileiro)
    const telefoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/
    if (!telefoneRegex.test(formData.telefone)) {
      setError('Telefone deve estar no formato (11) 99999-9999')
      return
    }

    // Validar CEP obrigatório
    const cepRegex = /^\d{5}-\d{3}$/
    if (!cepRegex.test(formData.endereco.cep)) {
      setError('CEP deve estar no formato 12345-678')
      return
    }

    // Validar data de nascimento se preenchida
    if (formData.dataNascimento) {
      const hoje = new Date()
      const nascimento = new Date(formData.dataNascimento)
      const idade = hoje.getFullYear() - nascimento.getFullYear()
      
      if (idade < 16) {
        setError('Você deve ter pelo menos 16 anos para se cadastrar')
        return
      }
      
      if (idade > 120) {
        setError('Data de nascimento inválida')
        return
      }
    }

    try {
      const enderecoCompleto = formData.endereco.rua 
        ? `${formData.endereco.rua}, ${formData.endereco.numero}${formData.endereco.complemento ? ', ' + formData.endereco.complemento : ''}, ${formData.endereco.bairro}, ${formData.endereco.cidade}/${formData.endereco.uf}, CEP: ${formData.endereco.cep}`
        : null

      const dadosParaCadastro = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone || undefined,
        senha: formData.senha,
        dataNascimento: formData.dataNascimento || undefined,
        endereco: enderecoCompleto || undefined,
        // Campos estruturados
        cep: formData.endereco.cep || undefined,
        rua: formData.endereco.rua || undefined,
        numero: formData.endereco.numero || undefined,
        complemento: formData.endereco.complemento || undefined,
        bairro: formData.endereco.bairro || undefined,
        cidade: formData.endereco.cidade || undefined,
        uf: formData.endereco.uf || undefined,
        aceitaMarketing: formData.aceitaMarketing
      }

      const result = await cadastro(dadosParaCadastro)
      
      if (result.success) {
        setSuccess(result.message)
        setTimeout(() => {
          navigate('/')
        }, 2000)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('Erro interno do servidor')
    }
  }

  // Função para formatar telefone automaticamente
  const formatarTelefone = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, '')
    
    if (apenasNumeros.length <= 2) {
      return `(${apenasNumeros}`
    } else if (apenasNumeros.length <= 6) {
      return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2)}`
    } else if (apenasNumeros.length <= 10) {
      return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 6)}-${apenasNumeros.slice(6)}`
    } else {
      return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7, 11)}`
    }
  }

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarTelefone(e.target.value)
    setFormData({
      ...formData,
      telefone: valorFormatado
    })
  }

  // Função para formatar CEP automaticamente
  const formatarCEP = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, '')
    
    if (apenasNumeros.length <= 5) {
      return apenasNumeros
    } else {
      return `${apenasNumeros.slice(0, 5)}-${apenasNumeros.slice(5, 8)}`
    }
  }

  const handleCEPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorFormatado = formatarCEP(e.target.value)
    setFormData({
      ...formData,
      endereco: {
        ...formData.endereco,
        cep: valorFormatado
      }
    })
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Crie sua conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{' '}
            <Link 
              to="/login" 
              className="font-medium text-green-600 hover:text-green-500"
            >
              entre com sua conta existente
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-6">
              
              {/* Seção: Dados Pessoais */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  📋 Dados Pessoais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                      Nome completo *
                    </label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Seu nome completo"
                      value={formData.nome}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                      Telefone *
                    </label>
                    <input
                      id="telefone"
                      name="telefone"
                      type="tel"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="(11) 99999-9999"
                      value={formData.telefone}
                      onChange={handleTelefoneChange}
                      maxLength={15}
                    />
                  </div>

                  <div>
                    <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700">
                      Data de Nascimento
                    </label>
                    <input
                      id="dataNascimento"
                      name="dataNascimento"
                      type="date"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      value={formData.dataNascimento}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Seção: Endereço */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b border-gray-200 pb-2">
                  🏠 Endereço *
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="endereco.cep" className="block text-sm font-medium text-gray-700">
                      CEP *
                    </label>
                    <input
                      id="endereco.cep"
                      name="endereco.cep"
                      type="text"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="12345-678"
                      value={formData.endereco.cep}
                      onChange={handleCEPChange}
                      maxLength={9}
                    />
                  </div>

                  <div>
                    <label htmlFor="endereco.rua" className="block text-sm font-medium text-gray-700">
                      Rua/Avenida *
                    </label>
                    <input
                      id="endereco.rua"
                      name="endereco.rua"
                      type="text"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Rua das Flores"
                      value={formData.endereco.rua}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="endereco.numero" className="block text-sm font-medium text-gray-700">
                        Número *
                      </label>
                      <input
                        id="endereco.numero"
                        name="endereco.numero"
                        type="text"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="123"
                        value={formData.endereco.numero}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="endereco.complemento" className="block text-sm font-medium text-gray-700">
                        Complemento
                      </label>
                      <input
                        id="endereco.complemento"
                        name="endereco.complemento"
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="Apto 45"
                        value={formData.endereco.complemento}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="endereco.bairro" className="block text-sm font-medium text-gray-700">
                      Bairro *
                    </label>
                    <input
                      id="endereco.bairro"
                      name="endereco.bairro"
                      type="text"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="Centro"
                      value={formData.endereco.bairro}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label htmlFor="endereco.cidade" className="block text-sm font-medium text-gray-700">
                        Cidade *
                      </label>
                      <input
                        id="endereco.cidade"
                        name="endereco.cidade"
                        type="text"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        placeholder="São Paulo"
                        value={formData.endereco.cidade}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label htmlFor="endereco.uf" className="block text-sm font-medium text-gray-700">
                        UF *
                      </label>
                      <select
                        id="endereco.uf"
                        name="endereco.uf"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        value={formData.endereco.uf}
                        onChange={handleChange}
                      >
                        <option value="">UF</option>
                        <option value="AC">AC</option>
                        <option value="AL">AL</option>
                        <option value="AP">AP</option>
                        <option value="AM">AM</option>
                        <option value="BA">BA</option>
                        <option value="CE">CE</option>
                        <option value="DF">DF</option>
                        <option value="ES">ES</option>
                        <option value="GO">GO</option>
                        <option value="MA">MA</option>
                        <option value="MT">MT</option>
                        <option value="MS">MS</option>
                        <option value="MG">MG</option>
                        <option value="PA">PA</option>
                        <option value="PB">PB</option>
                        <option value="PR">PR</option>
                        <option value="PE">PE</option>
                        <option value="PI">PI</option>
                        <option value="RJ">RJ</option>
                        <option value="RN">RN</option>
                        <option value="RS">RS</option>
                        <option value="RO">RO</option>
                        <option value="RR">RR</option>
                        <option value="SC">SC</option>
                        <option value="SP">SP</option>
                        <option value="SE">SE</option>
                        <option value="TO">TO</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                  Senha *
                </label>
                <input
                  id="senha"
                  name="senha"
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Mínimo 6 caracteres"
                  value={formData.senha}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700">
                  Confirmar senha *
                </label>
                <input
                  id="confirmarSenha"
                  name="confirmarSenha"
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Digite a senha novamente"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                />
              </div>

              {/* Checkbox para marketing */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="aceitaMarketing"
                    name="aceitaMarketing"
                    type="checkbox"
                    className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                    checked={formData.aceitaMarketing}
                    onChange={handleChange}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="aceitaMarketing" className="text-gray-700">
                    📧 Quero receber ofertas e novidades por email
                  </label>
                  <p className="text-gray-500 text-xs">
                    Você pode cancelar a qualquer momento
                  </p>
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {success && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-3">
                <p className="text-sm text-green-600">{success}</p>
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Criando conta...' : 'Criar conta'}
              </button>
            </div>

            <p className="mt-4 text-xs text-gray-500 text-center">
              Ao criar uma conta, você concorda com nossos termos de uso e política de privacidade.
            </p>
          </div>
        </form>

        <div className="text-center">
          <Link 
            to="/" 
            className="text-sm text-green-600 hover:text-green-500"
          >
            ← Voltar para a loja
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cadastro
