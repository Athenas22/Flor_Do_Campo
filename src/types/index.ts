// Tipos do sistema
// ==============================

// Tipo base de usuário (tabela usuarios)
export interface Usuario {
    id: string           // uuid - chave primária
    email: string        // varchar - email do usuário
    nome: string         // varchar - nome do usuário
    telefone?: string    // varchar - telefone (opcional)
}

// Tipos para autenticação
// ==============================

// Dados para cadastro de novo usuário
export interface CadastroData {
    email: string        // Email do usuário
    senha: string        // Senha (usada apenas no cadastro)
    nome: string         // Nome do usuário
    telefone?: string    // Telefone (opcional)
}

// Dados para login
export interface LoginData {
    email: string        // Email do usuário
    senha: string        // Senha do usuário
}

// Resposta das operações de autenticação
export interface AuthResponse {
    success: boolean     // Se a operação foi bem sucedida
    message: string      // Mensagem descritiva do resultado
    user?: Usuario | null // Dados do usuário (se houver)
}
