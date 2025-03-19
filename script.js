// ========== script.js ==========

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
        top: targetElement.offsetTop - 60,
        behavior: 'smooth'
      });
    }
    navLinks.classList.remove('show');
  });
});

// Count-Up Animation for Stats (on DOM load)
window.addEventListener('DOMContentLoaded', () => {
  const statItems = document.querySelectorAll('.stat-item');
  statItems.forEach(item => {
    const finalValue = parseInt(item.getAttribute('data-value'), 10);
    const numberEl = item.querySelector('h4');
    let startValue = 0;
    let duration = 2000; // 2 seconds
    let startTime = null;
    function animate(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      const rate = Math.min(progress / duration, 1);
      const currentValue = Math.floor(startValue + (finalValue - startValue) * rate);
      // if item has data-plus, prepend '+'
      if (item.hasAttribute('data-plus')) {
        numberEl.textContent = `+${currentValue}`;
      } else {
        numberEl.textContent = currentValue;
      }
      if (rate < 1) {
        requestAnimationFrame(animate);
      }
    }
    requestAnimationFrame(animate);
  });
});
