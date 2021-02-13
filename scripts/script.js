// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // already things in storage
  if (localStorage.getItem('products')) {
    createProductItems();
    updateCart();

  // haven't fetched items from website so do that
  } else {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        // Note: data is a set of Objects but localStorage can only take 
        // in strings so convert to string via JSON
        localStorage.setItem('products', JSON.stringify(data));
      })
    createProductItems();
    updateCart();
  }
});

// Creates a new product for each product data that was fetched
function createProductItems() {
  let products = JSON.parse(localStorage.getItem('products'));
  let productList = document.getElementById('product-list');

  for (var i in products) {
    productList.appendChild(new ProductItem(products[i]));
  }
}

// If local storage already has things in cart, update page to match
function updateCart() {
  let cartCount = document.getElementById('cart-count');

  if (localStorage.cart > 0) {
    cartCount.innerHTML = localStorage.cart;
  } else {
    cartCount.innerHTML = '0';
  }
}

