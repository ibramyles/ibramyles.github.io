/** @format */

// connect btn
const connectBtn = document.querySelectorAll('.connect');

// function looping over all coonect btns

connectBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    console.log('hello its myles');
  });
});
