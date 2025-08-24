-- ==================================================
-- BANCO DE DADOS COMPLETO - FLOR DO CAMPO E-COMMERCE
-- ==================================================

-- 1. TABELA DE CATEGORIAS
CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE,
  descricao TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. TABELA DE PRODUTOS
CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  preco DECIMAL(10,2) NOT NULL CHECK (preco >= 0),
  categoria_id INTEGER REFERENCES categorias(id),
  categoria VARCHAR(100) NOT NULL, -- Para compatibilidade
  descricao TEXT,
  imagem VARCHAR(500),
  disponivel BOOLEAN DEFAULT true,
  estoque INTEGER DEFAULT 0 CHECK (estoque >= 0),
  destaque BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. TABELA DE USUÁRIOS (perfis personalizados)
CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  nome VARCHAR(255) NOT NULL,
  telefone VARCHAR(20),
  endereco TEXT,
  data_nascimento DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. TABELA DE PEDIDOS
CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  usuario_id UUID NOT NULL REFERENCES usuarios(id),
  total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
  status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'confirmado', 'enviado', 'entregue', 'cancelado')),
  endereco_entrega TEXT NOT NULL,
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. TABELA DE ITENS DO PEDIDO
CREATE TABLE itens_pedido (
  id SERIAL PRIMARY KEY,
  pedido_id INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
  produto_id INTEGER NOT NULL REFERENCES produtos(id),
  quantidade INTEGER NOT NULL CHECK (quantidade > 0),
  preco_unitario DECIMAL(10,2) NOT NULL CHECK (preco_unitario >= 0),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 6. TABELA DE CARRINHO (opcional - para salvar carrinho de usuários logados)
CREATE TABLE carrinho (
  id SERIAL PRIMARY KEY,
  usuario_id UUID NOT NULL REFERENCES usuarios(id),
  produto_id INTEGER NOT NULL REFERENCES produtos(id),
  quantidade INTEGER NOT NULL CHECK (quantidade > 0),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(usuario_id, produto_id)
);

-- ==================================================
-- INSERIR DADOS INICIAIS
-- ==================================================

-- CATEGORIAS
INSERT INTO categorias (nome, descricao) VALUES
('Chás', 'Chás naturais e orgânicos para bem-estar'),
('Suplementos', 'Suplementos naturais e vitaminas'),
('Cosméticos', 'Produtos de beleza naturais'),
('Alimentos', 'Alimentos orgânicos e funcionais'),
('Óleos', 'Óleos essenciais e vegetais');

-- PRODUTOS (usando os dados do seu arquivo original)
INSERT INTO produtos (nome, preco, categoria, descricao, imagem, estoque, destaque) VALUES
-- Chás
('Chá Verde Premium', 89.90, 'Chás', 'Chá verde de alta qualidade, rico em antioxidantes e propriedades termogênicas. Ideal para quem busca bem-estar e energia natural.', '/assets/img/cha-verde.webp', 50, true),
('Chá de Camomila', 75.90, 'Chás', 'Chá calmante de camomila, perfeito para relaxamento e melhoria do sono. 100% natural e orgânico.', '/assets/img/cha-camomila.webp', 40, true),
('Chá de Hibisco', 67.90, 'Chás', 'Chá de hibisco com propriedades antioxidantes e diuréticas. Sabor refrescante e benefícios para a saúde.', '/assets/img/cha-hibisco.jpg', 35, false),
('Chá Preto Earl Grey', 82.90, 'Chás', 'Chá preto premium com aroma de bergamota. Tradição e qualidade em cada xícara.', '/assets/img/cha-preto.jpg', 30, false),
('Chá Misto de Frutas', 71.90, 'Chás', 'Deliciosa mistura de frutas desidratadas e ervas naturais. Sabor doce e refrescante.', '/assets/img/cha-misto-frutas.jpg', 25, false),

-- Suplementos  
('Colágeno Hidrolisado', 189.90, 'Suplementos', 'Colágeno hidrolisado de alta absorção para saúde da pele, cabelos e articulações.', '/assets/img/colageno-hidrolisado.jpeg', 20, true),
('Guaraná em Pó', 156.90, 'Suplementos', 'Guaraná em pó 100% natural, fonte de energia e vitalidade. Rico em cafeína natural.', '/assets/img/guarana-po.jpeg', 15, false),
('Whey Protein Vegano', 178.90, 'Suplementos', 'Proteína vegana de alta qualidade feita a partir de plantas. Ideal para atletas veganos.', '/assets/img/whey-protein-vegano.jpg', 18, true),
('Própolis Verde', 125.90, 'Suplementos', 'Própolis verde brasileiro de alta qualidade. Fortalece o sistema imunológico naturalmente.', '/assets/img/propolis.jpeg', 22, false),

-- Cosméticos
('Sabonete de Argila Verde', 45.90, 'Cosméticos', 'Sabonete natural de argila verde para limpeza profunda e purificação da pele.', '/assets/img/sabonete-argila.jpeg', 60, false),
('Hidratante Facial Natural', 89.90, 'Cosméticos', 'Hidratante facial com ingredientes naturais para todos os tipos de pele.', '/assets/img/hidratante-facial-natural.webp', 35, false),
('Máscara Facial de Argila', 67.90, 'Cosméticos', 'Máscara facial de argila para limpeza profunda e renovação da pele.', '/assets/img/mascara-facial-argila.webp', 40, false),
('Sabonete de Calêndula', 42.90, 'Cosméticos', 'Sabonete suave de calêndula, ideal para peles sensíveis e delicadas.', '/assets/img/sabonete-calendula.webp', 55, false),

-- Alimentos
('Mel Puro 250g', 78.90, 'Alimentos', 'Mel puro e natural, fonte de energia e propriedades medicinais. Direto do apiário.', '/assets/img/mel-puro.webp', 45, true),
('Granola Artesanal', 89.90, 'Alimentos', 'Granola artesanal com ingredientes selecionados. Rica em fibras e nutrientes.', '/assets/img/granola.jpeg', 30, false),

-- Óleos
('Óleo de Coco Extra Virgem', 128.90, 'Óleos', 'Óleo de coco extra virgem 100% natural, ideal para culinária e cuidados pessoais.', '/assets/img/oleo-coco-extravirgem.jpg', 25, false),
('Óleo Essencial de Eucalipto', 95.90, 'Óleos', 'Óleo essencial puro de eucalipto para aromaterapia e bem-estar respiratório.', '/assets/img/oleo-essencial-eucalipto.jpg', 20, false),
('Óleo Essencial Tea Tree', 108.90, 'Óleos', 'Óleo essencial de melaleuca com propriedades antissépticas e purificantes.', '/assets/img/oleo-essencial-tea-tree.jpg', 18, false);

-- ==================================================
-- CONFIGURAÇÕES DE SEGURANÇA (RLS - Row Level Security)
-- ==================================================

-- Habilitar RLS nas tabelas
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE itens_pedido ENABLE ROW LEVEL SECURITY;
ALTER TABLE carrinho ENABLE ROW LEVEL SECURITY;

-- Políticas para usuários (só podem ver/editar seus próprios dados)
CREATE POLICY "Usuários podem ver seus próprios dados" ON usuarios
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seus próprios dados" ON usuarios
  FOR UPDATE USING (auth.uid() = id);

-- Políticas para pedidos
CREATE POLICY "Usuários podem ver seus próprios pedidos" ON pedidos
  FOR SELECT USING (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem criar pedidos" ON pedidos
  FOR INSERT WITH CHECK (auth.uid() = usuario_id);

-- Políticas para itens do pedido
CREATE POLICY "Usuários podem ver itens de seus pedidos" ON itens_pedido
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM pedidos 
      WHERE pedidos.id = itens_pedido.pedido_id 
      AND pedidos.usuario_id = auth.uid()
    )
  );

-- Políticas para carrinho
CREATE POLICY "Usuários podem gerenciar seu carrinho" ON carrinho
  FOR ALL USING (auth.uid() = usuario_id);

-- Produtos e categorias são públicos (qualquer um pode ler)
CREATE POLICY "Produtos são públicos" ON produtos FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Categorias são públicas" ON categorias FOR SELECT TO anon, authenticated USING (true);

-- ==================================================
-- TRIGGERS E FUNÇÕES
-- ==================================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger nas tabelas relevantes
CREATE TRIGGER set_timestamp_usuarios
  BEFORE UPDATE ON usuarios
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_pedidos
  BEFORE UPDATE ON pedidos
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_carrinho
  BEFORE UPDATE ON carrinho
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp();

-- ==================================================
-- VIEWS ÚTEIS
-- ==================================================

-- View para pedidos com detalhes
CREATE VIEW view_pedidos_detalhados AS
SELECT 
  p.id,
  p.usuario_id,
  u.nome as usuario_nome,
  u.email as usuario_email,
  p.total,
  p.status,
  p.endereco_entrega,
  p.created_at,
  COUNT(ip.id) as total_itens
FROM pedidos p
JOIN usuarios u ON p.usuario_id = u.id
LEFT JOIN itens_pedido ip ON p.id = ip.pedido_id
GROUP BY p.id, u.nome, u.email;

-- View para produtos com categoria
CREATE VIEW view_produtos_categoria AS
SELECT 
  p.id,
  p.nome,
  p.preco,
  p.categoria,
  c.descricao as categoria_descricao,
  p.descricao,
  p.imagem,
  p.disponivel,
  p.estoque,
  p.destaque,
  p.created_at
FROM produtos p
LEFT JOIN categorias c ON p.categoria = c.nome;

-- ==================================================
-- ÍNDICES PARA PERFORMANCE
-- ==================================================

CREATE INDEX idx_produtos_categoria ON produtos(categoria);
CREATE INDEX idx_produtos_destaque ON produtos(destaque);
CREATE INDEX idx_produtos_disponivel ON produtos(disponivel);
CREATE INDEX idx_pedidos_usuario ON pedidos(usuario_id);
CREATE INDEX idx_pedidos_status ON pedidos(status);
CREATE INDEX idx_itens_pedido_pedido ON itens_pedido(pedido_id);
CREATE INDEX idx_carrinho_usuario ON carrinho(usuario_id);
