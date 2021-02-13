// Script.js

// local Object to store
let productData = {
  title: 'no title',
  price: 0,
  description: 'no description',
  category: 'no category',
  image: 'no image source'
};

let arrProductDatas = [];

window.addEventListener('DOMContentLoaded', () => {
  // already things in storage
  if (localStorage.getItem('products')) {
    createProductItems();
    updateCart();

  // haven't fetched items from website so do that
  } else {
    alert("let's fetch");
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        // data is a set of Objects and local storage can only take in strings so convert to string
        localStorage.setItem('products', JSON.stringify(data));
        
        /*
        // populate local arrays 
        for (var i in data) {
          createLocProduct(i);
        }*/
      })
    createProductItems();
    updateCart();
  }
});


function createProductItems() {
  let products = JSON.parse(localStorage.getItem('products'));
  let productList = document.getElementById('product-list');

  for (var i in products) {
    productList.appendChild(new ProductItem(products[i]));
  }
}

function updateCart() {
  let cartCount = document.getElementById('cart-count');
  if (localStorage.cart > 0) {
    alert('had things in cart');
    cartCount.innerHTML = localStorage.cart;
  }
}

function createLocProduct(data) {
  let product = new Object();
  product.title = data.title;
  product.price = data.price;
  product.description = data.description;
  product.category = data.category;
  product.image = data.image;
  arrProductDatas.push(product);
}

