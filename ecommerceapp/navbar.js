/** @format */

const navbar = document.querySelector('.nav-content');
const nav = document.getElementById('nav');
const searchBox = document.getElementById('search-bar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('shrink');
    nav.classList.add('nav-shrink');
    searchBox.classList.add('search-bar-change');
  } else {
    navbar.classList.remove('shrink');
    nav.classList.remove('nav-shrink');
    searchBox.classList.remove('search-bar-change');
  }
});
