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
    const ADD = 'Add to Cart';
    const ADD_ALERT = 'Added to Cart!';
    const REMOVE = 'Remove from Cart';
    const REMOVE_ALERT = 'Removed from Cart!';

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
    button.innerHTML = ADD;

    button.onclick = () => {
      let numItems = parseInt(cartCount.innerHTML);

      // option 1: click 'Add to Cart' ==> +1 num items in cart and change to Remove from Cart
      if (button.innerHTML === ADD) {
        alert(ADD_ALERT);
        button.innerHTML = REMOVE;
        numItems = numItems + 1;
        localStorage.setItem('cart', String(numItems));   // update local storage
        localStorage.setItem(products.id, 'in cart');
        cartCount.innerHTML = String(numItems);           // update cart

      // option 2: click 'Remove from Cart' ==> -1 num items in cart and change to Add to Cart
      } else {
        alert(REMOVE_ALERT);
        button.innerHTML = ADD;
        numItems = numItems - 1;
        localStorage.setItem('cart', String(numItems));   // update local storage
        localStorage.removeItem(products.id);
        cartCount.innerHTML = String(numItems);           // update cart
      }
    };

    // in case of refresh or no button click, use local storage to check
    // if product being added is already in cart (via its id) and adjust button
    if (localStorage.getItem(products.id)) {
      button.innerHTML = REMOVE;      // already in cart
    } else {
      button.innerHTML = ADD;         // not in cart
    }

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
          max-height: 50%;
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
