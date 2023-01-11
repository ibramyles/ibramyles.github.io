/** @format */

let shop = document.querySelector('#shop');
let cart = JSON.parse(localStorage.getItem('data')) || [];

const renderShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((item) => {
      let { id, name, price, desc, img } = item;

      let search = cart.find((x) => x.id === id) || [];

      return ` 
        <div id=product-id-${id} class="product-card rounded-md">
        <div class = "width-auto height-auto m-2 rounded-md">
          <img src= ${img} class="product-card-img" data-product-id=${id} alt="" />
          <div class="flex flex-col p-3 gap-3">
            <h3 class="font-medium">${name}</h3>
            
            <div class="cart-actions flex items-center justify-between">
              <h2 class="font-medium">$ ${price}</h2>
                  <div class="btns hidden gap-2">
                <i onclick = "decrement(${id})" class="bi bi-dash-lg text-red-900"></i>
                <div id=${id} class="quantity">${
        search.qty === undefined ? 0 : search.qty
      }</div>
                <i onclick = "increment(${id})" class="bi bi-plus-lg text-green-900"></i>
                </div>
                <img src="./Assets/cart-add-regular-24.png" class = "add-to-cart" alt="add to cart" />
            </div>
          </div>
          </div>
        </div>
        
    `;
    })
    .join(''));
};

renderShop();

let increment = (id) => {
  let selectedItem = id;

  let search = cart.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    cart.push({
      id: selectedItem.id,
      qty: 1,
    });
  } else {
    search.qty += 1;
  }
  //  storing item to localstorage
  localStorage.setItem('data', JSON.stringify(cart));
  // console.log(cart);
  update(selectedItem.id);
};

let decrement = (id) => {
  let selectedItem = id;

  let search = cart.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.qty === 0) return;
  else {
    search.qty -= 1;
  }
  update(selectedItem.id);

  cart = cart.filter((x) => x.qty !== 0);

  // console.log(cart);
  localStorage.setItem('data', JSON.stringify(cart));
};

const update = (id) => {
  let search = cart.find((x) => x.id === id);
  // console.log(search.qty);
  document.getElementById(id).innerHTML = search.qty;

  totalQty();
};

let totalQty = () => {
  let cartIcon = document.getElementById('cartAmount');

  cartIcon.innerHTML = cart.map((x) => x.qty).reduce((x, y) => x + y, 0);
};

totalQty();

// getting each product image
const products = document.querySelectorAll('.product-card-img');

// looping over all product images to
for (let i = 0; i < products.length; i++) {
  products[i].addEventListener('click', function (event) {
    // Get the details of the product
    const productId = this.dataset.productId;
    // Construct the URL of the product detail page
    const url = `sproduct.html?id=${productId}`;
    // Navigate to the product detail page
    window.location.assign(url);
    // console.log('new location generated');
  });
  products[i].addEventListener('mousemove', () => {
    products[i].style.cursor = 'pointer';
  });
}

let addToCart = document.querySelectorAll('.add-to-cart');

for (let i = 0; i < addToCart.length; i++) {
  addToCart[i].addEventListener('click', (event) => {
    let productSelected = event.target.closest('.cart-actions');
    let quantityBtns = productSelected.querySelector('.btns');
    quantityBtns.style.display = 'flex';
    event.target.hidden = true;
  });
}
