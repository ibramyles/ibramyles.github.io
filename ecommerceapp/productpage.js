/** @format */
let productDetailsSection = document.querySelector('#productDetails');

let cart = JSON.parse(localStorage.getItem('data')) || [];

let relatedProductsSection = document.querySelector('.related-products');

let renderNoRelatedProduct = document.querySelector('.no-related-product');
// Product detail page

// Get the query string from the URL
const queryString = location.search;

// Create a new URLSearchParams object from the query string
const searchParams = new URLSearchParams(queryString);

// Get the product id and name from the query string
const productId = searchParams.get('id');

// console.log(productId);

const product = shopItemsData.find((item) => {
  return item.id === productId;
});

// console.log(product);

// destructuring the product object
const { id, name, price, desc, img } = product;

const renderProductDetails = () => {
  let search = cart.find((x) => x.id === id) || [];

  return (productDetailsSection.innerHTML = `
<div class="product flex border-2 justify-between rounded-md h-[75vh] w-[85vw] mx-auto">
        <div class = "border-2 w-6/12">
            <div class = "main-img h-[55vh] flex">
              <img src= ${img} alt="productimg" />
            </div>
            <div class = "small-img border-2 mt-6"></div>
        </div>
          <div class="flex flex-col border-2 w-6/12 py-10 px-16 gap-8">
            <h3 class="text-5xl">${name.toUpperCase()}</h3>
            <p>${desc}</p>
            <div class="flex flex-col">
              <h2 class="font-bold text-4xl">$${price}</h2>
              <div class="btns border-2 w-[100px] justify-center mt-6 flex gap-2">
                <i onclick = "decrement(${id})" class="bi bi-dash-lg text-red-900"></i>
                <div id=${id} class="quantity">${
    search.qty === undefined ? 0 : search.qty
  }</div>
                <i onclick = "increment(${id})" class="bi bi-plus-lg text-green-900"></i>
              </div>
            </div>
          </div>
        </div>
`);
};

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

renderProductDetails();

// logic to render related products

const renderRelatedProducts = () => {
  let relatedProducts = [];

  // Find related products
  relatedProducts = shopItemsData.filter((otherProduct) => {
    if (otherProduct.id !== product.id) {
      return product.tag.some((tag) => otherProduct.tag.includes(tag));
    }
  });

  console.log(relatedProducts);

  if (relatedProducts.length !== 0) {
    console.log('The related products array is not empty.');
    return (relatedProductsSection.innerHTML = relatedProducts
      .map((item) => {
        return `
          <div class ="w-[200px] bg-veryLightBlue h-[270px] border-2 rounded-md cursor-pointer hover:scale-[1.02] hover:shadow-2xl">
            <div class = "flex flex-col m-2 w-[180px] h-[250px] border-2 rounded-md">
              <img class = "rounded-t-md " src=${item.img} alt=${item.name} />
              <h3 class = "px-2">${item.name}</h3>
              <h3 class = "px-2">$ ${item.price}</h3>
            </div>
          </div>
      `;
      })
      .join(''));
  } else {
    renderNoRelatedProduct.textContent = `
    Currently no related products available in the store!
    `;
    console.log('The related products array is empty.');
  }
};

renderRelatedProducts();
