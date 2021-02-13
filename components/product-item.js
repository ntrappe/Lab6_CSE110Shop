// product-item.js

class ProductItem extends HTMLElement {
  // TODO
  constructor(products) {
    super();
    
    // create a shadow root
    const shadow = this.attachShadow({mode: 'open'});

    // entire product that has features of title, price, images, etc.
    const productItem = document.createElement('li');
    productItem.className = 'product';
    
    // cart that holds products and the number of them
    const cartCount = document.getElementById('cart-count');

    // product image
    let image = document.createElement('img');
    image.setAttribute('src', products.image);
    image.setAttribute('alt', products.title);
    image.setAttribute('width', 200);

    // product name
    let title = document.createElement('p');
    title.className = 'title';
    title.innerHTML = products.title;

    // product price
    let price = document.createElement('p');
    price.className = 'price';
    price.innerHTML = '$' + products.price;
   
    // button to add product to cart
    let button = document.createElement('button');
    button.innerHTML = 'Add to Cart';
    button.onclick = () => {
      alert('Added to Cart!');
    };

     /*
    shadow.innerHTML = `
      <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops" width=200>
      <p class="title">Fjallraven - Foldstack No. 1 Backpack, Fits 15 Laptops</p>
      <p class="price">$109.95</p>
      <button onclick="alert('Added to Cart!')">Add to Cart</button>
    `;*/

    shadow.innerHTML = `
      <style>
        /* Custom Element CSS starts here */
        .price {
          color: green;
          font-size: 1.8em;
          font-weight: bold;
          margin: 0;
        }
        
        .product {
          align-items: center;
          background-color: white;
          border-radius: 5px;
          display: grid;
          grid-template-areas: 
          'image'
          'title'
          'price'
          'add';
          grid-template-rows: 67% 11% 11% 11%;
          height: 450px;
          filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
          margin: 0 30px 30px 0;
          padding: 10px 20px;
          width: 200px;
        }
        
        .product > button {
          background-color: rgb(255, 208, 0);
          border: none;
          border-radius: 5px;
          color: black;
          justify-self: center;
          max-height: 35px;
          padding: 8px 20px;
          transition: 0.1s ease all;
        }
        
        .product > button:hover {
          background-color: rgb(255, 166, 0);
          cursor: pointer;
          transition: 0.1s ease all;
        }
        
        .product > img {
          align-self: center;
          justify-self: center;
          width: 100%;
        }
        
        .title {
          font-size: 1.1em;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .title:hover {
          font-size: 1.1em;
          margin: 0;
          white-space: wrap;
          overflow: auto;
          text-overflow: unset;
        }
        
        /* Custom Element CSS Ends Here */
      </style>
    `;

    // append components to shadow DOM
    shadow.appendChild(productItem);
    productItem.appendChild(image);
    productItem.appendChild(title);
    productItem.appendChild(price);
    productItem.appendChild(button);

  
  }
}

customElements.define('product-item', ProductItem);
