import { StyledHomePage } from './styles'

const HomePage = () => {
  return (
    <StyledHomePage>
      {/* <!-- Banner de Boas-Vindas --> */}
      <section class='banner-boas-vindas'>
        <div class='banner-content'>
          <h1>Bem-vindo à Flor do Campo</h1>
          <p>Produtos naturais selecionados para seu bem-estar</p>
          <a
            href='#'
            class='btn-explorar'
          >
            Explorar Produtos
          </a>
        </div>
      </section>

      <section class='ofertas'>
        <h2>Ofertas Especiais</h2>
        <div class='produtos-grid'>
          <div class='produto-card'>
            <a
              href='produto.html'
              class='produto-link'
            >
              <img
                src='https://via.placeholder.com/200'
                alt='Chá Verde Orgânico'
              />
              <h3>Chá Verde Orgânico</h3>
              <p class='preco-antigo'>R$ 29,90</p>
              <p class='preco-atual'>R$ 24,90</p>
            </a>
            <div class='card-actions'>
              <button class='btn-carrinho'>Adicionar ao Carrinho</button>
              <a
                href='produto.html'
                class='btn-detalhes'
              >
                Ver Detalhes
              </a>
            </div>
          </div>
          <div class='produto-card'>
            <a
              href='produto.html'
              class='produto-link'
            >
              <img
                src='https://via.placeholder.com/200'
                alt='Óleo Essencial de Lavanda'
              />
              <h3>Óleo Essencial de Lavanda</h3>
              <p class='preco-antigo'>R$ 45,90</p>
              <p class='preco-atual'>R$ 39,90</p>
            </a>
            <div class='card-actions'>
              <button class='btn-carrinho'>Adicionar ao Carrinho</button>
              <a
                href='produto.html'
                class='btn-detalhes'
              >
                Ver Detalhes
              </a>
            </div>
          </div>
          <div class='produto-card'>
            <a
              href='produto.html'
              class='produto-link'
            >
              <img
                src='https://via.placeholder.com/200'
                alt='Guaraná em Pó'
              />
              <h3>Guaraná em Pó</h3>
              <p class='preco-antigo'>R$ 32,90</p>
              <p class='preco-atual'>R$ 27,90</p>
            </a>
            <div class='card-actions'>
              <button class='btn-carrinho'>Adicionar ao Carrinho</button>
              <a
                href='produto.html'
                class='btn-detalhes'
              >
                Ver Detalhes
              </a>
            </div>
          </div>
          <div class='produto-card'>
            <a
              href='produto.html'
              class='produto-link'
            >
              <img
                src='https://via.placeholder.com/200'
                alt='Sabonete de Argila'
              />
              <h3>Sabonete de Argila</h3>
              <p class='preco-antigo'>R$ 15,90</p>
              <p class='preco-atual'>R$ 12,90</p>
            </a>
            <div class='card-actions'>
              <button class='btn-carrinho'>Adicionar ao Carrinho</button>
              <a
                href='produto.html'
                class='btn-detalhes'
              >
                Ver Detalhes
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class='mais-vendidos'>
        <h2>Mais Vendidos</h2>
        <div class='produtos-grid'>
          <div class='produto-card'>
            <a
              href='produto.html'
              class='produto-link'
            >
              <img
                src='https://via.placeholder.com/200'
                alt='Mel Puro'
              />
              <h3>Mel Puro</h3>
              <p class='preco'>R$ 35,90</p>
            </a>
            <div class='card-actions'>
              <button class='btn-carrinho'>Adicionar ao Carrinho</button>
              <a
                href='produto.html'
                class='btn-detalhes'
              >
                Ver Detalhes
              </a>
            </div>
          </div>
          <div class='produto-card'>
            <a
              href='produto.html'
              class='produto-link'
            >
              <img
                src='https://via.placeholder.com/200'
                alt='Granola Artesanal'
              />
              <h3>Granola Artesanal</h3>
              <p class='preco'>R$ 28,90</p>
            </a>
            <div class='card-actions'>
              <button class='btn-carrinho'>Adicionar ao Carrinho</button>
              <a
                href='produto.html'
                class='btn-detalhes'
              >
                Ver Detalhes
              </a>
            </div>
          </div>
          <div class='produto-card'>
            <a
              href='produto.html'
              class='produto-link'
            >
              <img
                src='https://via.placeholder.com/200'
                alt='Própolis Verde'
              />
              <h3>Própolis Verde</h3>
              <p class='preco'>R$ 42,90</p>
            </a>
            <div class='card-actions'>
              <button class='btn-carrinho'>Adicionar ao Carrinho</button>
              <a
                href='produto.html'
                class='btn-detalhes'
              >
                Ver Detalhes
              </a>
            </div>
          </div>
          <div class='produto-card'>
            <a
              href='produto.html'
              class='produto-link'
            >
              <img
                src='https://via.placeholder.com/200'
                alt='Chá de Camomila'
              />
              <h3>Chá de Camomila</h3>
              <p class='preco'>R$ 18,90</p>
            </a>
            <div class='card-actions'>
              <button class='btn-carrinho'>Adicionar ao Carrinho</button>
              <a
                href='produto.html'
                class='btn-detalhes'
              >
                Ver Detalhes
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class='catalogo'>
        <h2>Nosso Catálogo</h2>
        <div class='categorias'>
          <button>Chás</button>
          <button>Cosméticos</button>
          <button>Alimentos</button>
          <button>Suplementos</button>
        </div>
        <div class='produtos-grid'>
          {/* <!-- Cards de produtos do catálogo --> */}
        </div>
      </section>
    </StyledHomePage>
  )
}

export default HomePage
