/** @format */

const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('nav-scrolled');
  } else {
    nav.classList.remove('nav-scrolled');
  }
});

const btn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
  btn.classList.toggle('open');
  if (mobileMenu.style.display === 'block') {
    mobileMenu.style.display = 'none';
  } else {
    mobileMenu.style.display = 'block';
  }
});
