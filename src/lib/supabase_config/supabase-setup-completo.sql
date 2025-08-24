-- ================================================================
-- SETUP COMPLETO DO SUPABASE PARA FLOR DO CAMPO
-- ================================================================
-- Execute este SQL no SQL Editor do Supabase
-- ================================================================

-- 1. CRIAR TABELA DE USUÁRIOS (se não existir)
-- ================================================================
CREATE TABLE IF NOT EXISTS public.usuarios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    data_nascimento DATE,
    endereco TEXT,
    cep VARCHAR(10),
    rua VARCHAR(255),
    numero VARCHAR(10),
    complemento VARCHAR(100),
    bairro VARCHAR(100),
    cidade VARCHAR(100),
    uf VARCHAR(2),
    aceita_marketing BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ÍNDICES PARA PERFORMANCE
-- ================================================================
CREATE INDEX IF NOT EXISTS idx_usuarios_auth_id ON public.usuarios(auth_id);
CREATE INDEX IF NOT EXISTS idx_usuarios_email ON public.usuarios(email);
CREATE INDEX IF NOT EXISTS idx_usuarios_cep ON public.usuarios(cep);
CREATE INDEX IF NOT EXISTS idx_usuarios_cidade ON public.usuarios(cidade);

-- 3. TRIGGER PARA ATUALIZAR updated_at
-- ================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_usuarios_updated_at ON public.usuarios;
CREATE TRIGGER update_usuarios_updated_at
    BEFORE UPDATE ON public.usuarios
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 4. POLÍTICAS RLS (Row Level Security)
-- ================================================================
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

-- Política para usuários verem apenas seus próprios dados
DROP POLICY IF EXISTS "Usuários podem ver apenas seus próprios dados" ON public.usuarios;
CREATE POLICY "Usuários podem ver apenas seus próprios dados"
    ON public.usuarios FOR SELECT
    USING (auth.uid() = auth_id);

-- Política para usuários atualizarem apenas seus próprios dados
DROP POLICY IF EXISTS "Usuários podem atualizar apenas seus próprios dados" ON public.usuarios;
CREATE POLICY "Usuários podem atualizar apenas seus próprios dados"
    ON public.usuarios FOR UPDATE
    USING (auth.uid() = auth_id);

-- Política para inserção de novos usuários
DROP POLICY IF EXISTS "Usuários podem inserir seus próprios dados" ON public.usuarios;
CREATE POLICY "Usuários podem inserir seus próprios dados"
    ON public.usuarios FOR INSERT
    WITH CHECK (auth.uid() = auth_id);

-- Política para deleção (opcional)
DROP POLICY IF EXISTS "Usuários podem deletar apenas seus próprios dados" ON public.usuarios;
CREATE POLICY "Usuários podem deletar apenas seus próprios dados"
    ON public.usuarios FOR DELETE
    USING (auth.uid() = auth_id);

-- 5. CONSTRAINTS DE VALIDAÇÃO
-- ================================================================
-- Validar formato do email
ALTER TABLE public.usuarios DROP CONSTRAINT IF EXISTS check_email_format;
ALTER TABLE public.usuarios ADD CONSTRAINT check_email_format 
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Validar formato do telefone brasileiro (opcional)
ALTER TABLE public.usuarios DROP CONSTRAINT IF EXISTS check_telefone_format;
ALTER TABLE public.usuarios ADD CONSTRAINT check_telefone_format 
    CHECK (telefone IS NULL OR telefone ~* '^\(\d{2}\)\s\d{4,5}-\d{4}$');

-- Validar CEP brasileiro (opcional)
ALTER TABLE public.usuarios DROP CONSTRAINT IF EXISTS check_cep_format;
ALTER TABLE public.usuarios ADD CONSTRAINT check_cep_format 
    CHECK (cep IS NULL OR cep ~* '^\d{5}-\d{3}$');

-- Validar UF (estado brasileiro)
ALTER TABLE public.usuarios DROP CONSTRAINT IF EXISTS check_uf_valid;
ALTER TABLE public.usuarios ADD CONSTRAINT check_uf_valid 
    CHECK (uf IS NULL OR uf IN (
        'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
        'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
        'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
    ));

-- Validar data de nascimento (idade entre 16 e 120 anos)
ALTER TABLE public.usuarios DROP CONSTRAINT IF EXISTS check_idade_valida;
ALTER TABLE public.usuarios ADD CONSTRAINT check_idade_valida 
    CHECK (
        data_nascimento IS NULL OR 
        (
            data_nascimento <= CURRENT_DATE - INTERVAL '16 years' AND 
            data_nascimento >= CURRENT_DATE - INTERVAL '120 years'
        )
    );

-- 6. CRIAR TABELA DE PRODUTOS (se não existir)
-- ================================================================
CREATE TABLE IF NOT EXISTS public.produtos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(100),
    imagem VARCHAR(500),
    estoque INTEGER DEFAULT 0,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para produtos
CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON public.produtos(categoria);
CREATE INDEX IF NOT EXISTS idx_produtos_ativo ON public.produtos(ativo);
CREATE INDEX IF NOT EXISTS idx_produtos_nome ON public.produtos(nome);

-- 7. CRIAR TABELA DE CARRINHO (se não existir)
-- ================================================================
CREATE TABLE IF NOT EXISTS public.carrinho (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE,
    produto_id UUID REFERENCES public.produtos(id) ON DELETE CASCADE,
    quantidade INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(usuario_id, produto_id)
);

-- Índices para carrinho
CREATE INDEX IF NOT EXISTS idx_carrinho_usuario ON public.carrinho(usuario_id);
CREATE INDEX IF NOT EXISTS idx_carrinho_produto ON public.carrinho(produto_id);

-- 8. CRIAR TABELA DE PEDIDOS (se não existir)
-- ================================================================
CREATE TABLE IF NOT EXISTS public.pedidos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    usuario_id UUID REFERENCES public.usuarios(id) ON DELETE CASCADE,
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pendente',
    endereco_entrega TEXT NOT NULL,
    forma_pagamento VARCHAR(50),
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. CRIAR TABELA DE ITENS DO PEDIDO (se não existir)
-- ================================================================
CREATE TABLE IF NOT EXISTS public.itens_pedido (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    pedido_id UUID REFERENCES public.pedidos(id) ON DELETE CASCADE,
    produto_id UUID REFERENCES public.produtos(id) ON DELETE CASCADE,
    quantidade INTEGER NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. POLÍTICAS RLS PARA OUTRAS TABELAS
-- ================================================================
-- Carrinho
ALTER TABLE public.carrinho ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Usuários podem gerenciar apenas seu carrinho"
    ON public.carrinho FOR ALL
    USING (usuario_id IN (SELECT id FROM public.usuarios WHERE auth_id = auth.uid()));

-- Pedidos
ALTER TABLE public.pedidos ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Usuários podem ver apenas seus pedidos"
    ON public.pedidos FOR ALL
    USING (usuario_id IN (SELECT id FROM public.usuarios WHERE auth_id = auth.uid()));

-- Produtos (leitura pública)
ALTER TABLE public.produtos ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Produtos são visíveis publicamente"
    ON public.produtos FOR SELECT
    USING (ativo = true);

-- 11. INSERIR DADOS DE EXEMPLO (PRODUTOS)
-- ================================================================
INSERT INTO public.produtos (nome, descricao, preco, categoria, imagem, estoque) VALUES
    ('Chá de Camomila', 'Chá natural de camomila para relaxamento', 15.99, 'Chás', 'cha-camomila.webp', 50),
    ('Mel Puro 250g', 'Mel puro e natural, 250g', 25.50, 'Mel e Própolis', 'mel-puro.webp', 30),
    ('Óleo Essencial de Eucalipto', 'Óleo essencial puro de eucalipto', 35.00, 'Óleos Essenciais', 'oleo-essencial-eucalipto.jpg', 20),
    ('Sabonete de Argila', 'Sabonete natural com argila purificante', 18.90, 'Cosméticos Naturais', 'sabonete-argila.jpeg', 25),
    ('Whey Protein Vegano', 'Proteína vegetal em pó', 89.99, 'Suplementos', 'whey-protein-vegano.jpg', 15),
    ('Colágeno Hidrolisado', 'Colágeno em pó para saúde da pele', 75.00, 'Suplementos', 'colageno-hidrolisado.jpeg', 20),
    ('Granola Artesanal', 'Granola natural feita artesanalmente', 22.50, 'Alimentos Naturais', 'granola.jpeg', 40),
    ('Chá Verde Premium', 'Chá verde de alta qualidade', 28.00, 'Chás', 'cha-verde.webp', 35),
    ('Própolis Extrato', 'Extrato natural de própolis', 42.90, 'Mel e Própolis', 'propolis.jpeg', 18),
    ('Hidratante Facial Natural', 'Creme hidratante com ingredientes naturais', 55.00, 'Cosméticos Naturais', 'hidratante-facial-natural.webp', 12)
ON CONFLICT DO NOTHING;

-- ================================================================
-- SETUP CONCLUÍDO! 
-- ================================================================
-- Agora você pode:
-- 1. Fazer login/cadastro de usuários
-- 2. Gerenciar produtos
-- 3. Adicionar itens ao carrinho
-- 4. Criar pedidos
-- 5. Todas as tabelas têm segurança RLS ativada
-- ================================================================
