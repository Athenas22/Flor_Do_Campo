import { obterCarrinho, salvarCarrinho } from './storage.js';

let currentStep = 1;
const orderData = { endereco: {}, pagamento: {}, carrinho: [] };

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  loadCartSummary();
  setupEventListeners();
  showStep(currentStep);
  updateStepIndicator();
  
  // Adicionar funções aos botões de navegação
  window.nextStep = nextStep;
  window.previousStep = previousStep;
  window.finalizarPedido = finalizarPedido;
});

// Carrega resumo do carrinho
function loadCartSummary() {
  const carrinho = obterCarrinho();
  const summaryContainer = document.getElementById('summaryItems');
  if (!summaryContainer) return;

  if (carrinho.length === 0) {
    summaryContainer.innerHTML = '<p class="text-center text-gray-500">Carrinho vazio</p>';
    window.location.href = 'index.html'; // Redireciona se o carrinho estiver vazio
  } else {
    let total = 0;
    summaryContainer.innerHTML = carrinho.map(item => {
      const itemTotal = item.preco * item.quantidade;
      total += itemTotal;
      return `
        <div class="cart-item flex items-center justify-between p-4 border-b border-gray-200">
          <div class="item-info flex-grow">
            <h4 class="font-semibold text-gray-800">${item.nome}</h4>
            <div class="flex justify-between items-center mt-1">
              <span class="text-sm text-gray-600">Quantidade: ${item.quantidade}</span>
              <span class="text-sm text-gray-600">R$ ${item.preco.toFixed(2)} / un.</span>
            </div>
          </div>
          <div class="item-total ml-4 font-bold text-gray-900">
            R$ ${itemTotal.toFixed(2)}
          </div>
        </div>
      `;
    }).join('');

    document.getElementById('subtotal').textContent = `R$ ${total.toFixed(2)}`;
    document.getElementById('totalFinal').textContent = `R$ ${total.toFixed(2)}`;
    orderData.carrinho = carrinho;
  }
}

// Registra todos os event listeners
function setupEventListeners() {
  // CEP auto-complete
  document.getElementById('cep')?.addEventListener('blur', buscarCEP);
  // Máscaras
  document.getElementById('telefone')?.addEventListener('input', formatarTelefone);
  document.getElementById('cep')?.addEventListener('input', formatarCEP);
  document.getElementById('numeroCartao')?.addEventListener('input', formatarCartao);
  document.getElementById('validadeCartao')?.addEventListener('input', formatarValidade);

  // Seleção de forma de pagamento
  document.querySelectorAll('.payment-option').forEach(opt => {
    opt.addEventListener('click', () => selectPaymentMethod(opt));
  });
  
  // Inputs de formulário - validação em tempo real
  document.querySelectorAll('input[required]').forEach(input => {
    input.addEventListener('blur', () => {
      validateField(input);
    });
  });
}

// Avança para próxima etapa
function nextStep() {
  if (!validateCurrentStep()) return;
  currentStep++;
  if (currentStep === 3) showConfirmation();
  showStep(currentStep);
  updateStepIndicator();
}

// Volta para etapa anterior
function previousStep() {
  if (currentStep > 1) {
    currentStep--;
    showStep(currentStep);
    updateStepIndicator();
  }
}

// Exibe só a seção ativa
function showStep(step) {
  const sections = document.querySelectorAll('.form-section');
  sections.forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });
  
  const currentSection = document.getElementById(`step${step}`);
  if (currentSection) {
    currentSection.classList.add('active');
    currentSection.style.display = 'block';
    
    // Scroll suave para o topo da seção
    currentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Atualiza indicador de progresso
function updateStepIndicator() {
  const steps = Array.from(document.querySelectorAll('.step'));
  const progressLine = document.getElementById('progressLine');
  
  steps.forEach((el, i) => {
    el.classList.remove('active', 'completed');
    if (i + 1 < currentStep) {
      el.classList.add('completed');
    }
    if (i + 1 === currentStep) {
      el.classList.add('active');
    }
  });

  // Atualiza a linha de progresso
  if (progressLine) {
    const progress = ((currentStep - 1) / (steps.length - 1)) * 100;
    progressLine.style.width = `${progress}%`;
  }

  // Verifica se deve mostrar o botão voltar
  const backButton = document.querySelector('.btn-secondary');
  if (backButton) {
    backButton.style.display = currentStep === 1 ? 'none' : 'block';
  }
}

// Valida a etapa atual
function validateCurrentStep() {
  if (currentStep === 1) return validateAddressForm();
  if (currentStep === 2) return validatePaymentForm();
  return true;
}

// Validação de um campo individual
function validateField(input) {
  const id = input.id;
  const errorElement = document.getElementById(id + 'Error');
  if (!errorElement) return true;
  
  let isValid = true;
  const value = input.value.trim();
  
  // Validações básicas
  if (input.hasAttribute('required') && !value) {
    errorElement.textContent = 'Este campo é obrigatório';
    isValid = false;
  } else if (id === 'email' && value && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errorElement.textContent = 'E-mail inválido';
    isValid = false;
  } else if (id === 'telefone' && value && !value.match(/^\(\d{2}\) \d{5}-\d{4}$/)) {
    errorElement.textContent = 'Telefone inválido';
    isValid = false;
  } else if (id === 'cep' && value && !value.match(/^\d{5}-\d{3}$/)) {
    errorElement.textContent = 'CEP inválido';
    isValid = false;
  } else {
    errorElement.textContent = '';
  }
  
  // Aplica classes visuais
  if (isValid) {
    input.classList.remove('error');
  } else {
    input.classList.add('error');
  }
  
  return isValid;
}

// Validação do formulário de endereço
function validateAddressForm() {
  const campos = ['nome','telefone','email','cep','numero','endereco','bairro','cidade','estado'];
  let valido = true;
  campos.forEach(id => {
    const inp = document.getElementById(id);
    const err = document.getElementById(id + 'Error');
    if (!inp.value.trim()) {
      inp.classList.add('error');
      err.textContent = 'Este campo é obrigatório';
      valido = false;
    } else {
      inp.classList.remove('error');
      err.textContent = '';
      orderData.endereco[id] = inp.value.trim();
    }
  });
  return valido;
}

// Validação do formulário de pagamento
function validatePaymentForm() {
  const metodo = orderData.pagamento.metodo;
  if (!metodo) {
    alert('Selecione uma forma de pagamento');
    return false;
  }
  if (metodo === 'cartao') {
    const num  = document.getElementById('numeroCartao');
    const val  = document.getElementById('validadeCartao');
    const cvv  = document.getElementById('cvvCartao');
    const nome = document.getElementById('nomeCartao');
    if (!num.value.replace(/\s/g,'').match(/^\d{16}$/) ||
        !val.value.match(/^\d{2}\/\d{2}$/) ||
        !cvv.value.match(/^\d{3,4}$/) ||
        !nome.value.trim()) {
      alert('Preencha corretamente os dados do cartão');
      return false;
    }
    orderData.pagamento.detalhes = {
      numero: num.value,
      validade: val.value,
      cvv: cvv.value,
      nome: nome.value.trim(),
      parcelas: document.getElementById('parcelasCartao').value
    };
  }
  return true;
}

// Marca a opção de pagamento selecionada
function selectPaymentMethod(opt) {
  document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
  opt.classList.add('selected');
  orderData.pagamento.metodo = opt.dataset.payment;
}

// Monta tela de confirmação
function showConfirmation() {
  const container = document.getElementById('confirmationDetails');
  if (!container) return;

  const { endereco, pagamento, carrinho } = orderData;
  let html = `<h3>Endereço de Entrega</h3>
    <p>${endereco.nome}, ${endereco.endereco}, ${endereco.numero}  
    ${endereco.bairro} – ${endereco.cidade}/${endereco.estado}</p>
    <p>Telefone: ${endereco.telefone} • E-mail: ${endereco.email}</p>
    <h3>Itens</h3><ul>`;
  carrinho.forEach(i => {
    html += `<li>${i.nome} x${i.quantidade} — R$ ${(i.preco*i.quantidade).toFixed(2)}</li>`;
  });
  html += `</ul><h3>Pagamento</h3><p>${pagamento.metodo.toUpperCase()}</p>`;
  container.innerHTML = html;
}

// Finaliza pedido e exibe sucesso
function finalizarPedido() {
  const orderNum = 'FD' + Date.now();
  document.getElementById('orderNumber').textContent = orderNum;
  salvarCarrinho([]);
  loadCartSummary();
  nextStep(); // vai para step4
  
  // Corrigir link para voltar para a home page
  const homeLink = document.querySelector('.return-home');
  if (homeLink) {
    // Verifica a URL atual para determinar o caminho correto
    const path = window.location.pathname;
    
    // Se estiver no modo preview (dist), ajusta o caminho
    if (path.includes('/dist/')) {
      homeLink.href = '../index.html';
    } else {
      // Mesmo comportamento para desenvolvimento
      homeLink.href = '../index.html';
    }
    
    // Adiciona event listener para garantir redirecionamento correto
    homeLink.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = this.getAttribute('href');
    });
  }
}

// Busca dados do CEP via ViaCEP
function buscarCEP() {
  const cep = document.getElementById('cep').value.replace(/\D/g,'');
  if (cep.length !== 8) return;
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(r => r.json())
    .then(data => {
      if (!data.erro) {
        document.getElementById('endereco').value = data.logradouro || '';
        document.getElementById('bairro').value  = data.bairro   || '';
        document.getElementById('cidade').value  = data.localidade || '';
        document.getElementById('estado').value  = data.uf        || '';
        orderData.endereco.cep = cep;
      }
    });
}

// Máscara de telefone: (XX) XXXXX-XXXX
function formatarTelefone(e) {
  let v = e.target.value.replace(/\D/g,'');
  const ddd = v.slice(0,2);
  let num = v.slice(2);
  if (num.length > 5) {
    num = num.slice(0,5) + '-' + num.slice(5,9);
  } else if (num.length > 1) {
    num = num;
  }
  e.target.value = ddd ? `(${ddd}) ${num}` : num;
}

// Máscara de CEP: 00000-000
function formatarCEP(e) {
  let v = e.target.value.replace(/\D/g,'').slice(0,8);
  if (v.length > 5) v = v.slice(0,5) + '-' + v.slice(5);
  e.target.value = v;
}

// Máscara de cartão: 0000 0000 0000 0000
function formatarCartao(e) {
  const v = e.target.value.replace(/\D/g,'').match(/.{1,4}/g);
  e.target.value = v ? v.join(' ') : '';
}

// Máscara validade: MM/AA
function formatarValidade(e) {
  let v = e.target.value.replace(/\D/g,'').slice(0,4);
  if (v.length > 2) v = v.slice(0,2) + '/' + v.slice(2);
  e.target.value = v;
}
