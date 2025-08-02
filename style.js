
let allProducts = [];


fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(products => {
    allProducts = products;
    showProducts(allProducts);
  });

function showProducts(products) {
  const container = document.getElementById('products');
  container.innerHTML = ""; 

  products.forEach(product => {
    const card = document.createElement('div');
    card.style.backgroundColor = "white";
    card.style.margin = "10px";
    card.style.borderRadius = "10px";
    card.style.textAlign = "center";
    card.style.padding = "10px";
    card.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
    card.style.transition = "transform 0.2s, box-shadow 0.2s";

    card.innerHTML = `
      <img src="${product.image}" style="height:150px; object-fit:contain;">
      <h3 style="font-size:16px; margin:5px 0;">${product.title}</h3>
      <p style="color:green; font-weight:bold;">$${product.price}</p>
      <button style="font-size:14px; background:red; color:white; border:none; border-radius:5px; padding:5px 10px;">BUY NOW</button>
    `;

    container.appendChild(card);
  });
}

function handleFilterAndSort() {
  const searchText = document.querySelector('input[type="text"]').value.toLowerCase();
  const selectedCategory = document.getElementById('categoryDropdown').value;
  const sortOption = document.getElementById('sortDropdown').value;

  let filtered = allProducts.filter(item => {
    const matchesText = item.title.toLowerCase().includes(searchText);
    const matchesCategory = (selectedCategory === "all" || item.category === selectedCategory);
    return matchesText && matchesCategory;
  });

  
  if (sortOption === "az") {
    filtered.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
      if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
      return 0;
    });
  } else if (sortOption === "priceLowHigh") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighLow") {
    filtered.sort((a, b) => b.price - a.price);
  }

  showProducts(filtered);
}



async function fetchProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    allProducts = products;
    showProducts(allProducts);
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
}

fetchProducts();
