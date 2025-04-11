const form = document.getElementById('product-form');
const nameInput = document.getElementById('product-name');
const qtyInput = document.getElementById('product-qty');
const listDiv = document.getElementById('product-list');

let products = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const qty = parseInt(qtyInput.value);

  if (!name || isNaN(qty)) return;

  const existing = products.find(p => p.name.toLowerCase() === name.toLowerCase());

  if (existing) {
    existing.qty += qty;
  } else {
    products.push({ name, qty });
  }

  nameInput.value = '';
  qtyInput.value = '';
  renderProducts();
});

function renderProducts() {
  listDiv.innerHTML = '';
  products.forEach(prod => {
    const div = document.createElement('div');
    div.className = 'product';
    
    if (prod.qty === 0) div.classList.add('out-of-stock');
    else if (prod.qty <= 5) div.classList.add('low-stock');

    div.innerHTML = `
      <strong>${prod.name}</strong> — ${prod.qty} unidades
      <button onclick="venderProduto('${prod.name}')">Vender 1</button>
    `;
    listDiv.appendChild(div);
  });
}

function venderProduto(nome) {
  const produto = products.find(p => p.name === nome);
  if (produto && produto.qty > 0) {
    produto.qty -= 1;
    renderProducts();
  }
}