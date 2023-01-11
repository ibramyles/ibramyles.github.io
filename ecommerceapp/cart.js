/** @format */
const label = document.getElementById('label');
const shoppingCart = document.getElementById('shopping-cart');

let cart = JSON.parse(localStorage.getItem('data')) || [];

let totalQty = () => {
  let cartIcon = document.getElementById('cartAmount');

  cartIcon.innerHTML = cart.map((x) => x.qty).reduce((x, y) => x + y, 0);
};

totalQty();

const renderCartItems = () => {
  if (cart.length !== 0) {
    return (shoppingCart.innerHTML = cart
      .map((x) => {
        let { id, qty } = x;
        let search = shopItemsData.find((x) => x.id === id) || [];
        // destructuring
        let { img, name, price } = search;
        return `
        <div class="cart-item flex rounded-md h-[180px] w-[400px]">
            <img src=${img} alt="" />

            <div class="details flex flex-col justify-between py-4"> 
            <div class="title-price-x flex justify-between w-[240px]">
                <h4 class="flex ">
                    <p>${name}</p>
                    <p class='bg-green-400 p-1 rounded-md font-bold'>$${price}</p>
                </h4>
                <i onclick = 'removeItem(${id})' class="bi bi-x-lg font-bold text-red-900"></i>
            </div>

            <div class="btns flex gap-2">
                <i onclick = "decrement(${id})" class="bi bi-dash-lg text-red-900"></i>
                <div id=${id} class="quantity">${qty}</div>
                <i onclick = "increment(${id})" class="bi bi-plus-lg text-green-900"></i>
              </div>
            <h3>$ ${qty * search.price}</h3>
            </div>
        </div>

        `;
      })
      .join(''));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `<h2 class="font-bold text-2xl mt-10"> Cart is Empty </h2>
    <a href='index.html'>
      <button class = "border-solid mt-2 bg-blue-400 py-1 px-2 rounded-md">Start shopping</button>
    </a>`;
  }
};

renderCartItems();

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
  renderCartItems();
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
  renderCartItems();
  localStorage.setItem('data', JSON.stringify(cart));
};

const update = (id) => {
  let search = cart.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.qty;

  totalQty();
  totalAmount();
};

const removeItem = (id) => {
  let selectedItem = id;

  cart = cart.filter((x) => x.id !== selectedItem.id);
  renderCartItems();
  totalAmount();
  totalQty();
  localStorage.setItem('data', JSON.stringify(cart));
};

const totalAmount = () => {
  if (cart.length !== 0) {
    let amount = cart
      .map((x) => {
        let { qty, id } = x;
        let search = shopItemsData.find((x) => x.id === id) || [];
        return qty * search.price;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    label.innerHTML = `
    <h2 class = "font-bold text-2xl">Total Bill : $ ${amount}</h2>
    <button class ='bg-green-500 rounded-md text-white px-3 mx-2 py-1 my-3'>Checkout</button>
    <button onclick ='clearCart()' class ='text-white bg-red-500 rounded-md px-3 py-1 mx-2 my-3'>Clear cart</button>
    `;
  } else {
    return;
  }
};

totalAmount();

const clearCart = () => {
  cart = [];
  renderCartItems();
  totalQty();
  localStorage.setItem('data', JSON.stringify(cart));
};
