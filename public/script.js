const products = [
  {
    id: 1,
    name: 'Velocity Run',
    category: 'Running',
    filter: 'running',
    color: '#ff8a5b',
    price: 489.9,
    description: 'Leve, responsivo e pensado para quem valoriza performance e conforto.',
    tag: 'Mais Vendido',
  },
  {
    id: 2,
    name: 'City Step',
    category: 'Casual',
    filter: 'casual',
    color: '#d4a574',
    price: 349.9,
    description: 'Estilo urbano com amortecimento para o dia inteiro sem perder a leveza.',
    tag: 'Nova',
  },
  {
    id: 3,
    name: 'Street Flex',
    category: 'Street',
    filter: 'street',
    color: '#8b7a6c',
    price: 379.9,
    description: 'Conforto de alto desempenho com uma pegada moderna e versátil.',
    tag: 'Premium',
  },
  {
    id: 4,
    name: 'Night Luxe',
    category: 'Premium',
    filter: 'premium',
    color: '#c9897e',
    price: 429.9,
    description: 'Elegância intensa para sair à noite com presença e sofisticação.',
    tag: 'Luxo',
  },
  {
    id: 5,
    name: 'Executive Move',
    category: 'Executivo',
    filter: 'premium',
    color: '#8b6f47',
    price: 459.9,
    description: 'Detalhes refinados e acabamento premium para o profissional moderno.',
    tag: 'Premium+',
  },
  {
    id: 6,
    name: 'Apex Court',
    category: 'Esportivo',
    filter: 'esportivo',
    color: '#4a3a2e',
    price: 549.9,
    description: 'Silhueta esportiva com estrutura firme, conforto respirável e visual impactante.',
    tag: 'Edição Limitada',
  },
  {
    id: 7,
    name: 'Bloom Walk',
    category: 'Casual',
    filter: 'casual',
    color: '#c4a47d',
    price: 419.9,
    description: 'Design clean e confortável para transformar qualquer passeio em estilo.',
    tag: 'Popular',
  },
  {
    id: 8,
    name: 'Elite Pulse',
    category: 'Esportivo',
    filter: 'esportivo',
    color: '#d9b77f',
    price: 499.9,
    description: 'Impacto visual e tecnologia de conforto para treinos e rotina ativa.',
    tag: 'Gala',
  },
  {
    id: 9,
    name: 'Daily Motion',
    category: 'Casual',
    filter: 'casual',
    color: '#a0826d',
    price: 359.9,
    description: 'A escolha certeira para o dia a dia com leveza, estilo e sustentação.',
    tag: 'Bestseller',
  },
];

const cart = [];
let currentFilter = 'todas';

const refs = {
  productGrid: document.getElementById('productGrid'),
  cartButton: document.getElementById('cartButton'),
  cartDrawer: document.getElementById('cartDrawer'),
  closeCart: document.getElementById('closeCart'),
  cartItems: document.getElementById('cartItems'),
  subtotalValue: document.getElementById('subtotalValue'),
  cartCount: document.getElementById('cartCount'),
  goToCheckout: document.getElementById('goToCheckout'),
  checkoutSummary: document.getElementById('checkoutSummary'),
  checkoutTotal: document.getElementById('checkoutTotal'),
  paymentOptions: document.getElementById('paymentOptions'),
  paymentDetail: document.getElementById('paymentDetail'),
  finalizePayment: document.getElementById('finalizePayment'),
  cardFields: document.getElementById('cardFields'),
  toast: document.getElementById('toast'),
};

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function renderProducts() {
  const filtered = currentFilter === 'todas' 
    ? products 
    : products.filter(p => p.filter === currentFilter);
  
  refs.productGrid.innerHTML = filtered
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-image">
            <div class="product-shoe" style="--product-color:${product.color};"></div>
          </div>
          <div class="product-body">
            <div class="product-meta">
              <span class="product-tag">${product.tag}</span>
              <span class="price">${formatCurrency(product.price)}</span>
            </div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-footer">
              <span>${product.category}</span>
              <button class="add-btn" data-product-id="${product.id}">Adicionar</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');

  refs.productGrid.querySelectorAll('.add-btn').forEach((button) => {
    button.addEventListener('click', () => {
      addToCart(Number(button.dataset.productId));
    });
  });
}

function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderProducts();
    });
  });
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const item = cart.find((entry) => entry.id === productId);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
  showToast(`${product.name} adicionado ao carrinho`);
}

function updateQuantity(productId, change) {
  const item = cart.find((entry) => entry.id === productId);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    const index = cart.findIndex((entry) => entry.id === productId);
    cart.splice(index, 1);
  }

  renderCart();
}

function renderCart() {
  refs.cartItems.innerHTML = '';

  if (!cart.length) {
    refs.cartItems.innerHTML = '<p style="color:#6f6c68; margin:0;">Seu carrinho está vazio.</p>';
  } else {
    refs.cartItems.innerHTML = cart
      .map(
        (item) => `
          <div class="cart-item">
            <div class="cart-thumb" style="--item-color:${item.color};"><div class="mini-shoe"></div></div>
            <div>
              <h4>${item.name}</h4>
              <p>${item.category}</p>
              <div class="item-actions">
                <button class="qty-btn" data-action="minus" data-id="${item.id}">−</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" data-action="plus" data-id="${item.id}">+</button>
                <button class="remove-btn" data-id="${item.id}">Remover</button>
              </div>
            </div>
            <div class="cart-price">${formatCurrency(item.price * item.quantity)}</div>
          </div>
        `
      )
      .join('');

    refs.cartItems.querySelectorAll('.qty-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const id = Number(button.dataset.id);
        const action = button.dataset.action;
        updateQuantity(id, action === 'plus' ? 1 : -1);
      });
    });

    refs.cartItems.querySelectorAll('.remove-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const id = Number(button.dataset.id);
        const index = cart.findIndex((entry) => entry.id === id);
        if (index >= 0) cart.splice(index, 1);
        renderCart();
      });
    });
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  refs.subtotalValue.textContent = formatCurrency(subtotal);
  refs.checkoutTotal.textContent = formatCurrency(subtotal);
  refs.cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  renderCheckoutSummary();
}

function renderCheckoutSummary() {
  if (!cart.length) {
    refs.checkoutSummary.innerHTML = '<p style="color:#6f6c68; margin:0;">Seu carrinho está vazio.</p>';
    return;
  }

  refs.checkoutSummary.innerHTML = cart
    .map(
      (item) => `
        <div class="summary-line">
          <span>${item.name} x${item.quantity}</span>
          <strong>${formatCurrency(item.price * item.quantity)}</strong>
        </div>
      `
    )
    .join('');
}

function updatePaymentMethod(method) {
  refs.paymentOptions.querySelectorAll('.payment-option').forEach((option) => {
    const isSelected = option.querySelector('input').value === method;
    option.classList.toggle('selected', isSelected);
    option.querySelector('input').checked = isSelected;
  });

  if (method === 'pix') {
    refs.paymentDetail.innerHTML = `
      <div class="pix-box">
        <p>Chave Pix: <strong>vanta@conta.com.br</strong></p>
        <small>Escaneie ou copie a chave para concluir o pagamento.</small>
      </div>
    `;
    refs.cardFields.hidden = true;
  }

  if (method === 'credit' || method === 'debit') {
    refs.paymentDetail.innerHTML = `
      <div class="pix-box">
        <p>${method === 'credit' ? 'Pagamento com cartão de crédito' : 'Pagamento com cartão de débito'}</p>
        <small>Preencha os dados do cartão para continuar.</small>
      </div>
    `;
    refs.cardFields.hidden = false;
  }
}

function showToast(message) {
  refs.toast.textContent = message;
  refs.toast.classList.add('show');
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => refs.toast.classList.remove('show'), 1800);
}

refs.cartButton.addEventListener('click', () => {
  refs.cartDrawer.classList.add('open');
});

refs.closeCart.addEventListener('click', () => {
  refs.cartDrawer.classList.remove('open');
});

refs.goToCheckout.addEventListener('click', () => {
  if (!cart.length) {
    showToast('Adicione pelo menos um item ao carrinho');
    return;
  }

  refs.cartDrawer.classList.remove('open');
  document.getElementById('checkout').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

refs.paymentOptions.addEventListener('change', (event) => {
  if (event.target.matches('input[name="paymentMethod"]')) {
    updatePaymentMethod(event.target.value);
  }
});

refs.finalizePayment.addEventListener('click', () => {
  if (!cart.length) {
    showToast('Carrinho vazio. Escolha um produto antes de pagar.');
    return;
  }

  const method = document.querySelector('input[name="paymentMethod"]:checked').value;
  const amount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const paymentLabel = {
    pix: 'Pix',
    credit: 'Cartão de crédito',
    debit: 'Cartão de débito',
  }[method];

  showToast(`${paymentLabel} selecionado — total ${formatCurrency(amount)}`);
  refs.checkoutSummary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

renderProducts();
renderCart();
updatePaymentMethod('pix');
setupFilters();
