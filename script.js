const products = [
  {
    name: 'Kablosuz Bluetooth Kulaklık',
    price: '₺1.299',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Akıllı Saat Pro X',
    price: '₺2.899',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Robot Süpürge 4000',
    price: '₺6.499',
    image:
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Oyuncu Mekanik Klavye',
    price: '₺1.749',
    image:
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80',
  },
];

const grid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');
let cart = 0;

grid.innerHTML = products
  .map(
    (product, index) => `
      <article class="card">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <div class="card-body">
          <h3>${product.name}</h3>
          <div class="price">${product.price}</div>
          <button class="add-btn" data-index="${index}">Sepete Ekle</button>
        </div>
      </article>
    `,
  )
  .join('');

document.querySelectorAll('.add-btn').forEach((button) => {
  button.addEventListener('click', () => {
    cart += 1;
    cartCount.textContent = cart;
    button.textContent = 'Eklendi ✓';
    setTimeout(() => {
      button.textContent = 'Sepete Ekle';
    }, 900);
  });
});
