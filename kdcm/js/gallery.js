/** @format */
let fullImgBox = document.getElementById('fullImgBox');
let fullImg = document.getElementById('fullImg');
let Img = document.getElementsByClassName('gallery-img');

function closeFullImg() {
  fullImgBox.style.display = 'none';
}

for (let i = 0; i < Img.length; i++) {
  Img[i].addEventListener('click', () => {
    fullImgBox.style.display = 'flex';
    fullImg.src = Img[i].src;
  });
}
