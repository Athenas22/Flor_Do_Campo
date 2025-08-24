-- ===================================================
-- SCRIPT COMPLETO PARA SISTEMA DE USUÁRIOS - FLOR DO CAMPO
-- Execute este script inteiro no Supabase SQL Editor
-- ===================================================

-- 1. ATUALIZAR TABELA USUARIOS COM NOVOS CAMPOS
-- ===================================================

-- Adicionar colunas novas (só adiciona se não existir)
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS data_nascimento DATE;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS cep VARCHAR(10);
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS rua VARCHAR(255);
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS numero VARCHAR(20);
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS complemento VARCHAR(100);
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS bairro VARCHAR(100);
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS cidade VARCHAR(100);
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS uf CHAR(2);
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS aceita_marketing BOOLEAN DEFAULT FALSE;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS ultimo_login TIMESTAMP;
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'ativo';

-- 2. CONSTRAINTS E VALIDAÇÕES
-- ===================================================

-- Constraint para status (só adiciona se não existir)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'usuarios_status_check') THEN
        ALTER TABLE usuarios ADD CONSTRAINT usuarios_status_check 
        CHECK (status IN ('ativo', 'inativo', 'suspenso'));
    END IF;
END $$;

-- Constraint para UF válido
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'usuarios_uf_check') THEN
        ALTER TABLE usuarios ADD CONSTRAINT usuarios_uf_check 
        CHECK (uf IS NULL OR uf IN (
            'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
            'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
            'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
        ));
    END IF;
END $$;

-- 3. ÍNDICES PARA PERFORMANCE
-- ===================================================

CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_status ON usuarios(status);
CREATE INDEX IF NOT EXISTS idx_usuarios_cidade_uf ON usuarios(cidade, uf);
CREATE INDEX IF NOT EXISTS idx_usuarios_created_at ON usuarios(created_at);
CREATE INDEX IF NOT EXISTS idx_usuarios_ultimo_login ON usuarios(ultimo_login);

-- 4. TRIGGERS PARA UPDATED_AT
-- ===================================================

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para usuarios
DROP TRIGGER IF EXISTS update_usuarios_updated_at ON usuarios;
CREATE TRIGGER update_usuarios_updated_at 
    BEFORE UPDATE ON usuarios 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- 5. FUNÇÃO PARA ATUALIZAR ÚLTIMO LOGIN
-- ===================================================

CREATE OR REPLACE FUNCTION update_ultimo_login(user_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE usuarios 
    SET ultimo_login = NOW() 
    WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. POLÍTICAS RLS (Row Level Security)
-- ===================================================

-- Habilitar RLS na tabela usuarios se não estiver
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- Política para usuários verem apenas seus próprios dados
DROP POLICY IF EXISTS "Usuários podem ver seus próprios dados" ON usuarios;
CREATE POLICY "Usuários podem ver seus próprios dados" ON usuarios
    FOR SELECT USING (auth.uid() = id);

-- Política para usuários atualizarem apenas seus próprios dados
DROP POLICY IF EXISTS "Usuários podem atualizar seus próprios dados" ON usuarios;
CREATE POLICY "Usuários podem atualizar seus próprios dados" ON usuarios
    FOR UPDATE USING (auth.uid() = id);

-- Política para inserção de novos usuários
DROP POLICY IF EXISTS "Permitir inserção de usuários" ON usuarios;
CREATE POLICY "Permitir inserção de usuários" ON usuarios
    FOR INSERT WITH CHECK (auth.uid() = id);

-- 7. VIEW PARA DADOS PÚBLICOS
-- ===================================================

CREATE OR REPLACE VIEW usuarios_publicos AS
SELECT 
    id,
    nome,
    cidade,
    uf,
    created_at,
    status
FROM usuarios 
WHERE status = 'ativo';

-- 8. COMENTÁRIOS NAS COLUNAS
-- ===================================================

COMMENT ON COLUMN usuarios.data_nascimento IS 'Data de nascimento do usuário';
COMMENT ON COLUMN usuarios.endereco IS 'Endereço completo formatado como string (backup)';
COMMENT ON COLUMN usuarios.cep IS 'CEP no formato 12345-678';
COMMENT ON COLUMN usuarios.rua IS 'Nome da rua/avenida';
COMMENT ON COLUMN usuarios.numero IS 'Número da residência';
COMMENT ON COLUMN usuarios.complemento IS 'Complemento do endereço (apartamento, sala, etc.)';
COMMENT ON COLUMN usuarios.bairro IS 'Nome do bairro';
COMMENT ON COLUMN usuarios.cidade IS 'Nome da cidade';
COMMENT ON COLUMN usuarios.uf IS 'Sigla do estado (UF) - 2 caracteres';
COMMENT ON COLUMN usuarios.aceita_marketing IS 'Se o usuário aceita receber emails de marketing';
COMMENT ON COLUMN usuarios.ultimo_login IS 'Timestamp do último login do usuário';
COMMENT ON COLUMN usuarios.status IS 'Status da conta: ativo, inativo ou suspenso';

-- 9. VERIFICAÇÃO FINAL
-- ===================================================

-- Mostrar estrutura da tabela atualizada
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'usuarios' 
ORDER BY ordinal_position;

-- Estatísticas
SELECT 
    'Tabela usuarios atualizada com sucesso!' as status,
    COUNT(*) as total_usuarios_existentes
FROM usuarios;

-- ===================================================
-- FIM DO SCRIPT
-- Execute este arquivo completo no Supabase SQL Editor
-- ===================================================
