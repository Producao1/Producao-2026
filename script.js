const products = [
  {
    id: 1,
    name: 'Vanta Velocity Pro',
    category: 'Performance',
    color: '#1f1f1f',
    price: 429.9,
    description: 'Cushion responsivo para corrida e uso diário.',
    tag: 'Mais vendido',
  },
  {
    id: 2,
    name: 'Urban Blaze',
    category: 'Casual',
    color: '#ff6b2c',
    price: 389.9,
    description: 'Visual esportivo e conforto para andar com atitude.',
    tag: 'Novo',
  },
  {
    id: 3,
    name: 'Apex Sprint',
    category: 'Street',
    color: '#d9d9d9',
    price: 459.9,
    description: 'Estabilidade premium com visual dinâmico.',
    tag: 'Premium',
  },
  {
    id: 4,
    name: 'Grind Max',
    category: 'Training',
    color: '#d94d3a',
    price: 349.9,
    description: 'Ideal para treinos intensos e rotina ativa.',
    tag: 'Popular',
  },
  {
    id: 5,
    name: 'Metro Flow',
    category: 'Minimal',
    color: '#35536b',
    price: 399.9,
    description: 'Leve, elegante e pronto para todos os momentos.',
    tag: 'Elite',
  },
  {
    id: 6,
    name: 'Drift Edge',
    category: 'Explorer',
    color: '#20242d',
    price: 469.9,
    description: 'Design esportivo com acabamento premium.',
    tag: 'Limitado',
  },
];

const cart = [];

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
  refs.productGrid.innerHTML = products
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
