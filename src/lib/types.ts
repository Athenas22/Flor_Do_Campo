export interface Usuario {
  id: string
  auth_id?: string
  nome: string
  email: string
  telefone?: string | null
  data_nascimento?: string | null
  endereco?: string | null
  cep?: string | null
  rua?: string | null
  numero?: string | null
  complemento?: string | null
  bairro?: string | null
  cidade?: string | null
  uf?: string | null
  aceita_marketing?: boolean
  created_at?: string
  updated_at?: string
}

export interface AuthError {
  message: string
  status?: number
}

export interface AuthResult<T> {
  data: T | null
  error: AuthError | null
}
