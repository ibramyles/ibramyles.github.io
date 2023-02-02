/** @format */

// /** @format */

// let campaignContainer = document.querySelector('.campaigns-slide-container');
// let innerSlider = document.querySelector('.inner-slider');

// let pressed = false;
// let startX;
// let x;

// campaignContainer.addEventListener('mousedown', (e) => {
//   pressed = true;
//   startX = e.offsetX - innerSlider.offsetLeft;
//   campaignContainer.style.cursor = 'grabbing';
// });

// campaignContainer.addEventListener('mouseenter', () => {
//   campaignContainer.style.cursor = 'grab';
// });

// campaignContainer.addEventListener('mouseup', () => {
//   campaignContainer.style.cursor = 'grab';
//   pressed = false;
// });

// campaignContainer.addEventListener('mousemove', (e) => {
//   if (!pressed) return;
//   e.preventDefault();

//   x = e.offsetX;

//   innerSlider.style.left = `${x - startX}px`;
//   checkBoundary();
// });

// const checkBoundary = () => {
//   let outer = campaignContainer.getBoundingClientRect();
//   let inner = innerSlider.getBoundingClientRect();

//   if (parseInt(innerSlider.style.left) > 0) {
//     innerSlider.style.left = '0px';
//   }

//   if (inner.right < outer.right) {
//     innerSlider.style.left = `-${inner.width - outer.width}px`;
//   }
// };

// innerSlider.style.left = `-80vw`;

// ! code 2

let campaignContainer = document.querySelector('.campaigns-slide-container');
let innerSlider = document.querySelector('.inner-slider');

let pressed = false;
let startX;
let x;

campaignContainer.addEventListener('mousedown', (e) => {
  pressed = true;
  startX = e.offsetX - innerSlider.offsetLeft;
  campaignContainer.style.cursor = 'grabbing';
});

campaignContainer.addEventListener('touchstart', (e) => {
  pressed = true;
  startX = e.touches[0].pageX - innerSlider.offsetLeft;
});

campaignContainer.addEventListener('mouseenter', () => {
  campaignContainer.style.cursor = 'grab';
});

campaignContainer.addEventListener('mouseup', () => {
  campaignContainer.style.cursor = 'grab';
  pressed = false;
});

campaignContainer.addEventListener('touchend', () => {
  pressed = false;
});

campaignContainer.addEventListener('mousemove', (e) => {
  if (!pressed) return;
  e.preventDefault();

  x = e.offsetX;

  innerSlider.style.left = `${x - startX}px`;
  checkBoundary();
});

campaignContainer.addEventListener('touchmove', (e) => {
  if (!pressed) return;
  e.preventDefault();

  x = e.touches[0].pageX;

  innerSlider.style.left = `${x - startX}px`;
  checkBoundary();
});

const checkBoundary = () => {
  let outer = campaignContainer.getBoundingClientRect();
  let inner = innerSlider.getBoundingClientRect();

  if (parseInt(innerSlider.style.left) > 0) {
    innerSlider.style.left = '0px';
  }

  if (inner.right < outer.right) {
    innerSlider.style.left = `-${inner.width - outer.width}px`;
  }
};

innerSlider.style.left = `-80vw`;
