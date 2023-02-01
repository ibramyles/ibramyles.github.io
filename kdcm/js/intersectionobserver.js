/** @format */

const allCards = document.querySelectorAll('.cards');
let headings = document.querySelectorAll('h2, h4');
let paragraphs = document.querySelectorAll('p');

// * observer for headings

let headingObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // Check if the element is intersecting
      if (entry.isIntersecting) {
        // Add the animation class to the heading
        entry.target.classList.add('animated');
      } else {
        entry.target.classList.remove('animated');
      }
    });
  },
  { rootMargin: '0px 0px 30px 0px' }
);

headings.forEach((heading) => {
  headingObserver.observe(heading);
});

// * observer for paragraphs

let paragraphsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      } else {
        entry.target.classList.remove('animate');
      }
    });
  },
  { rootMargin: '0px 0px 0px 0px' }
);

paragraphs.forEach((paragraph) => {
  paragraphsObserver.observe(paragraph);
});

// * cards observer

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show');
      }
    });
  },
  { rootMargin: '-30% 0px -30% 0px' }
);

allCards.forEach((el) => {
  return observer.observe(el);
});

allCards.forEach((card) => {
  card.addEventListener('mouseover', toggleDetails);
  card.addEventListener('mouseout', toggleDetails);
});

function toggleDetails(event) {
  const details = this.querySelector('.details');
  if (event.type === 'mouseover') {
    details.style.display = 'block';
  } else if (event.type === 'mouseout') {
    details.style.display = 'none';
  }
}
