# Flor do Campo 🌼 - React Edition

> E-commerce moderno de produtos naturais e orgânicos desenvolvido em React + TypeScript

<img src="purple-divider.svg" width="100%" height="4" alt="Purple decorative divider with animation">

## Preview do Projeto

<p align="center">
  <img src="./src/assets/img/preview.png" alt="Preview da Página Inicial" width="800px">
</p>

<img src="purple-divider.svg" width="100%" height="4" alt="Purple decorative divider with animation">

## 👥 Participantes do Projeto

- Vinícius Ares Monteiro de Lima
- Maria Laura  
- Lucas Moura

<img src="purple-divider.svg" width="100%" height="4" alt="Purple decorative divider with animation">

## 🚀 Tecnologias Utilizadas

- **React 19**: Biblioteca JavaScript para interfaces de usuário
- **TypeScript**: Superset do JavaScript com tipagem estática
- **Vite**: Build tool e servidor de desenvolvimento ultrarrápido
- **TailwindCSS**: Framework CSS utilitário
- **React Router**: Roteamento para aplicações React
- **Context API**: Gerenciamento de estado global
- **Custom Hooks**: Lógica reutilizável do React
- **LocalStorage API**: Persistência de dados do carrinho
- **Font Awesome**: Biblioteca de ícones
- **Google Fonts**: Fontes personalizadas (Amatic SC e Libre Baskerville)

<img src="purple-divider.svg" width="100%" height="4" alt="Purple decorative divider with animation">

## 📦 Arquitetura e Estrutura

### Arquitetura do Projeto
O projeto segue uma arquitetura baseada em componentes React com separação clara de responsabilidades:

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Navbar.tsx      # Barra de navegação
│   ├── CartSidebar.tsx # Carrinho lateral
│   ├── ProductCard.tsx # Card de produto
│   ├── Catalog.tsx     # Catálogo de produtos
│   ├── HeroBanner.tsx  # Banner principal
│   └── Footer.tsx      # Rodapé
├── contexts/            # Contextos React (gerenciamento de estado)
│   └── CartContext.tsx # Contexto do carrinho
├── hooks/               # Custom hooks
│   └── useCart.ts      # Hook para lógica do carrinho
├── pages/               # Páginas principais
│   └── HomePage.tsx    # Página inicial
├── types/               # Definições TypeScript
│   └── index.ts        # Interfaces e tipos
├── utils/               # Funções utilitárias
│   └── helpers.ts      # Helpers de formatação
├── data/                # Dados estáticos
│   └── produtos.ts     # Base de dados de produtos
├── App.tsx             # Componente raiz
└── main.tsx            # Ponto de entrada da aplicação
```

### Padrões de Design Utilizados
- **Component Pattern**: Componentes modulares e reutilizáveis
- **Context Pattern**: Gerenciamento de estado global com Context API
- **Custom Hooks Pattern**: Lógica reutilizável extraída em hooks
- **Compound Components**: Componentes que trabalham juntos
- **Provider Pattern**: Fornecimento de dados através da árvore de componentes

<img src="purple-divider.svg" width="100%" height="4" alt="Purple decorative divider with animation">

## 🛠️ Como Funciona o Vite com React

O Vite é otimizado para desenvolvimento moderno com React:

1. **Hot Module Replacement (HMR)**: Atualizações instantâneas de componentes React
2. **TypeScript Support**: Suporte nativo ao TypeScript
3. **ES Modules**: Importação rápida de módulos
4. **Plugin System**: Extensibilidade através de plugins
5. **Build Otimizado**: Bundling otimizado para produção

Nossa configuração inclui:
- Plugin React oficial (`@vitejs/plugin-react`)
- TailwindCSS integrado via plugin
- TypeScript para tipagem estática
- Build otimizado com tree-shaking

<img src="purple-divider.svg" width="100%" height="4" alt="Purple decorative divider with animation">

## � Fluxo da Aplicação React

### Gerenciamento de Estado
- **CartContext**: Centraliza o estado do carrinho usando Context API
- **useCart Hook**: Encapsula toda a lógica do carrinho (adicionar, remover, atualizar)
- **LocalStorage**: Persistência automática do carrinho entre sessões

### Fluxo de Dados
1. **Produtos**: Carregados estaticamente de `data/produtos.ts`
2. **Carrinho**: Gerenciado pelo `CartContext` e persistido no `localStorage`
3. **UI**: Componentes React consomem dados via hooks e context
4. **Interações**: Eventos propagados através de callbacks e context

<img src="purple-divider.svg" width="100%" height="4" alt="Purple decorative divider with animation">

## 🧠 Funcionalidades Principais

### ✅ Implementadas
- **Catálogo Dinâmico**: Listagem e filtros por categoria
- **Busca em Tempo Real**: Busca instantânea por nome do produto
- **Carrinho Lateral**: Adicionar/remover/atualizar produtos
- **Persistência**: Carrinho mantido entre sessões
- **UI Responsiva**: Design adaptável para todos os dispositivos
- **Tipagem TypeScript**: Código type-safe e autocompletar
- **Performance**: Otimizações do React 19 e Vite

### 🚧 Em Desenvolvimento
- **Página de Produto**: Detalhes individuais de cada produto
- **Checkout**: Processo completo de finalização
- **Autenticação**: Sistema de login/registro
- **Roteamento**: Navegação entre páginas

<img src="purple-divider.svg" width="100%" height="4" alt="Purple decorative divider with animation">

## ⚠️ Melhorias Implementadas

✅ **Arquitetura Limpa**: Código organizado em módulos especializados  
✅ **Tipagem Forte**: TypeScript para maior segurança e produtividade  
✅ **Performance**: React 19 + Vite para velocidade máxima  
✅ **Manutenibilidade**: Componentes modulares e reutilizáveis  
✅ **Estado Global**: Context API para gerenciamento centralizado  
✅ **Persistência**: LocalStorage integrado via hooks  

<img src="purple-divider.svg" width="100%" height="4" alt="Purple decorative divider with animation">

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação e Execução

1. **Clone e instale dependências:**
   ```bash
   git clone <repository-url>
   cd FlorDoCampo
   npm install
   ```

2. **Desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse: http://localhost:5173

3. **Build para produção:**
   ```bash
   npm run build
   ```

4. **Preview da build:**
   ```bash
   npm run preview
   ```

5. **Verificação de tipos:**
   ```bash
   npm run lint
   ```

<img src="purple-divider.svg" width="100%" height="4" alt="Purple decorative divider with animation">

## 📋 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção  
- `npm run preview` - Preview da build
- `npm run lint` - Verificação TypeScript

<img src="purple-divider.svg" width="100%" height="4" alt="Purple decorative divider with animation">

<div align="center">
  <p>Desenvolvido com 💚 pelo grupo usando React + TypeScript</p>
  <p><strong>Versão 2.0</strong> - Agora com React!</p>
</div>
        carrinho: resolve(__dirname, 'CartPage/carrinho.html'),
        checkout: resolve(__dirname, 'CheckoutPage/checkout.html'),
        login: resolve(__dirname, 'LoginPage/login.html'),
        produto: resolve(__dirname, 'ProductPage/produto.html')
      }
    }
  }
})
```

<img src="purple-divider.svg" width="100%" height="6">

## 🔄 Fluxo de Navegação

O site implementa um fluxo de navegação intuitivo:

1. **Página Inicial**: Mostra produtos em destaque e catálogo completo
2. **Página de Produto**: Detalhes, preço e opções para adicionar ao carrinho
3. **Carrinho**: Visualização de produtos selecionados com opção de alterar quantidade
4. **Checkout**: Processo de finalização da compra em múltiplas etapas
   - Etapa 1: Informações de entrega
   - Etapa 2: Forma de pagamento
   - Etapa 3: Confirmação
   - Etapa 4: Pedido finalizado

<img src="purple-divider.svg" width="100%" height="6">

## 🧠 Funcionalidades Principais

- **Catálogo de Produtos**: Listagem dinâmica com categorias
- **Detalhes do Produto**: Página detalhada para cada item
- **Carrinho Lateral**: Adicionar/remover produtos sem sair da página atual
- **Gestão de Quantidade**: Aumentar/diminuir quantidade no carrinho
- **Checkout Multi-etapa**: Processo estruturado de finalização
- **LocalStorage**: Persistência do carrinho entre sessões
- **Design Responsivo**: Layout adaptável para diferentes dispositivos

<img src="purple-divider.svg" width="100%" height="6">

## ⚠️ Problemas Conhecidos

1. **Redirecionamento após compra**: Após finalizar uma compra, o usuário precisa voltar manualmente pelo navegador para visualizar a página de confirmação do pedido.

2. **Itens dinâmicos no carrinho**: Ao adicionar itens da lista dinâmica ao carrinho, ocorre redirecionamento para uma página diferente.

<img src="purple-divider.svg" width="100%" height="6">

## 🚀 Como Executar o Projeto

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Execute o servidor de desenvolvimento:
   ```
   npm run dev
   ```
4. Para gerar a versão de produção:
   ```
   npm run build
   ```
5. Para visualizar a versão de produção:
   ```
   npm run preview
   ```
<img src="purple-divider.svg" width="100%" height="6">

<div align="center">
  <p>Desenvolvido com 💜 pelo grupo</p>
</div>
