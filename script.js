// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Smooth Scrolling for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 60, // offset for header
        behavior: 'smooth'
      });
    }
    navLinks.classList.remove('show');
  });
});

/* 
  Infinite Horizontal Carousel with 10 items, 5 visible at once.
  - We'll clone items on both ends
  - On arrow click, shift by one card
  - If we move too far left or right, jump back
*/

// Elements
const carouselTrack = document.getElementById('carouselTrack');
const cards = Array.from(carouselTrack.children);
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let cardWidth = 0;
let currentPosition = 0;

// Clone items for infinite effect
function setupInfiniteCarousel() {
  // measure card width (including gap)
  cardWidth = cards[0].getBoundingClientRect().width + 16; // ~16px gap
  // clone all 10 items to the left and right
  for (let i = 0; i < 10; i++) {
    // clone from front
    const cloneFront = cards[i].cloneNode(true);
    carouselTrack.appendChild(cloneFront);
  }
  for (let i = cards.length - 1; i >= 0; i--) {
    // clone from back
    const cloneBack = cards[i].cloneNode(true);
    carouselTrack.insertBefore(cloneBack, carouselTrack.firstChild);
  }
}

// Position track so that the "original" first item is visible
function initializePosition() {
  // we placed 10 clones on the left
  currentPosition = - (10 * cardWidth);
  carouselTrack.style.transform = `translateX(${currentPosition}px)`;
}

// Move the track by one card
function moveCarousel(direction) {
  if (direction === 'next') {
    currentPosition -= cardWidth;
  } else {
    currentPosition += cardWidth;
  }
  carouselTrack.style.transform = `translateX(${currentPosition}px)`;

  // If we go too far left or right, wrap back
  const totalOriginal = 10; 
  const leftClones = 10; 
  const rightClones = 10; 
  const totalCards = leftClones + totalOriginal + rightClones; // 30

  // too far left (scrolling to the right side)
  if (currentPosition > - (leftClones * cardWidth)) {
    currentPosition = - ( (leftClones + totalOriginal) * cardWidth );
    carouselTrack.style.transform = `translateX(${currentPosition}px)`;
  }
  // too far right (scrolling to the left side)
  if (Math.abs(currentPosition) > (leftClones + totalOriginal) * cardWidth) {
    currentPosition = - (leftClones * cardWidth);
    carouselTrack.style.transform = `translateX(${currentPosition}px)`;
  }
}

// Initialize after DOM loaded
window.addEventListener('DOMContentLoaded', () => {
  setupInfiniteCarousel();
  initializePosition();
});

// Arrows
nextBtn.addEventListener('click', () => moveCarousel('next'));
prevBtn.addEventListener('click', () => moveCarousel('prev'));
