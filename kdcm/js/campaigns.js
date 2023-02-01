/** @format */

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

campaignContainer.addEventListener('mouseenter', () => {
  campaignContainer.style.cursor = 'grab';
});

campaignContainer.addEventListener('mouseup', () => {
  campaignContainer.style.cursor = 'grab';
  pressed = false;
});

campaignContainer.addEventListener('mousemove', (e) => {
  if (!pressed) return;
  e.preventDefault();

  x = e.offsetX;

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

// const cardWidth = innerSlider.firstElementChild.offsetWidth;
// const totalCards = innerSlider.childElementCount;
// const middleCardIndex = Math.floor(totalCards / 2);
// const leftOffset = middleCardIndex * cardWidth;
innerSlider.style.left = `-80vw`;
