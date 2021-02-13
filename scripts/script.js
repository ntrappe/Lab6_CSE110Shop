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

// local storage
locStor = window.localStorage;

window.addEventListener('DOMContentLoaded', () => {
  // already things in storage
  if (localStorage.getItem('products')) {
    createProductItems();
    alert(locStor.length + ' things in storage already');
  // haven't fetched items from website so do that
  } else {
    alert("let's fetch");
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        // data is a set of Objects and local storage can only take in strings so convert to string
        locStor.setItem('products', JSON.stringify(data));
        
        // populate local arrays
        for (var i in data) {
          let product = new Object();
          product.title = data[i].title;
          product.price = data[i].price;
          product.description = data[i].description;
          product.category = data[i].category;
          product.image = data[i].image;
          arrProductDatas.push(product);
          //alert("did I just add " + data[i].title + " ?= " + (arrProductDatas[i]).title);
        }
      })
    createProductItems();
  }
});

function createProductItems() {
  const products = JSON.parse(localStorage.getItem('products'));
  const productList = document.getElementById('product-list');

  //productList.appendChild(new ProductItem(products[0]));

  for (var i in products) {
    productList.appendChild(new ProductItem(products[i]));
  }
}

