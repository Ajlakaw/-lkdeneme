const products = [
  { id: 1, title: 'Kablosuz Kulaklık Pro', price: 1299, category: 'Elektronik', sponsored: true, image: 'https://images.unsplash.com/photo-1518441902117-f76c83e154d8?auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'Akıllı Saat S', price: 2199, category: 'Giyilebilir', sponsored: false, image: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Bluetooth Hoparlör', price: 899, category: 'Elektronik', sponsored: true, image: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: '4K Smart TV 55"', price: 9999, category: 'Ev', sponsored: false, image: 'https://images.unsplash.com/photo-1527603815348-41b7d19c99b0?auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Robot Süpürge X', price: 6499, category: 'Ev', sponsored: false, image: 'https://images.unsplash.com/photo-1581012771406-22b421e2b04e?auto=format&fit=crop&w=800&q=80' },
  { id: 6, title: 'Oyun Laptopu RTX', price: 28999, category: 'Bilgisayar', sponsored: true, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80' },
];

const grid = document.getElementById('productGrid');
const search = document.getElementById('search');
const onlySponsored = document.getElementById('onlySponsored');

function render(items) {
  grid.innerHTML = '';
  items.forEach((item, idx) => {
    const card = document.createElement('article');
    card.className = 'card';

    // inline sponsored badge every third item if sponsored
    if (item.sponsored) {
      const badge = document.createElement('div');
      badge.className = 'ad-badge';
      badge.textContent = 'Sponsorlu';
      badge.style.position = 'absolute';
      badge.style.top = '12px';
      badge.style.left = '12px';
      card.appendChild(badge);
    }

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title;
    img.loading = 'lazy';
    card.appendChild(img);

    const body = document.createElement('div');
    body.className = 'card-body';

    const title = document.createElement('h3');
    title.textContent = item.title;
    title.style.margin = '0';
    body.appendChild(title);

    const meta = document.createElement('p');
    meta.className = 'meta';
    meta.textContent = item.category;
    body.appendChild(meta);

    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(item.price);
    body.appendChild(price);

    if (idx % 3 === 2) {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = 'Sepette %5';
      body.appendChild(tag);
    }

    card.appendChild(body);
    grid.appendChild(card);
  });
}

function applyFilters() {
  const term = search.value.toLowerCase();
  const onlyAds = onlySponsored.checked;
  const next = products.filter((item) => {
    const matchesText = item.title.toLowerCase().includes(term) || item.category.toLowerCase().includes(term);
    const matchesSponsored = !onlyAds || item.sponsored;
    return matchesText && matchesSponsored;
  });
  render(next);
}

search.addEventListener('input', applyFilters);
onlySponsored.addEventListener('change', applyFilters);

render(products);
