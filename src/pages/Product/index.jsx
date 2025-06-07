import { StyledProductPage } from './styles'

const ProductPage = () => {
  function incrementQty() {
    const qty = document.getElementById('qty')
    qty.value = parseInt(qty.value) + 1
  }

  function decrementQty() {
    const qty = document.getElementById('qty')
    if (parseInt(qty.value) > 1) {
      qty.value = parseInt(qty.value) - 1
    }
  }

  return (
    <StyledProductPage>
      <main class='produto-pagina'>
        <div class='produto-container'>
          <div class='produto-imagem'>
            <img
              src='https://via.placeholder.com/500'
              alt='Chá Verde Orgânico'
            />
            <button class='btn-favorito'>
              <i class='far fa-heart'></i>
            </button>
          </div>

          <div class='produto-info'>
            <h1>Chá Verde Orgânico</h1>
            <div class='produto-avaliacao'>
              <div class='estrelas'>
                <i class='fas fa-star'></i>
                <i class='fas fa-star'></i>
                <i class='fas fa-star'></i>
                <i class='fas fa-star'></i>
                <i class='far fa-star'></i>
              </div>
              <span>(42 avaliações)</span>
            </div>

            <div class='produto-preco'>
              <p class='preco-antigo'>R$ 29,90</p>
              <p class='preco-atual'>R$ 24,90</p>
              <span class='desconto'>-17%</span>
            </div>

            <div class='produto-quantidade'>
              <label>Quantidade:</label>
              <div class='quantidade-controle'>
                <button
                  class='btn-qty'
                  onclick={decrementQty}
                >
                  -
                </button>
                <input
                  type='number'
                  value='1'
                  min='1'
                  id='qty'
                />
                <button
                  class='btn-qty'
                  onclick={incrementQty}
                >
                  +
                </button>
              </div>
            </div>

            <div class='produto-acoes'>
              <button class='btn-comprar'>Comprar Agora</button>
              <button class='btn-carrinho'>Adicionar ao Carrinho</button>
            </div>

            <div class='produto-descricao'>
              <h2>Descrição</h2>
              <p>
                Chá verde orgânico de alta qualidade, cultivado sem pesticidas.
                Rico em antioxidantes e com propriedades termogênicas.
              </p>

              <div class='produto-detalhes'>
                <h3>Detalhes</h3>
                <ul>
                  <li>Peso: 100g</li>
                  <li>Origem: Cultivo Orgânico</li>
                  <li>Validade: 12 meses</li>
                  <li>Certificação: Orgânico</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </StyledProductPage>
  )
}

export default ProductPage
