document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuBtn.classList.toggle('active');
    });
  }

  // Scroll Reveal Animation
  function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add('active');
      }
    }
  }
  window.addEventListener('scroll', reveal);
  reveal(); // Trigger once on load

  // Number Counting Animation
  const counters = document.querySelectorAll('.stat-number[data-target]');
  let hasAnimated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      
      let count = 0;
      // Calculate speed based on target so they finish around the same time
      const increment = target / 50; 
      
      const updateCount = () => {
        count += increment;
        if (count < target) {
          counter.innerText = prefix + Math.ceil(count) + suffix;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = prefix + target + suffix;
        }
      };
      updateCount();
    });
  }

  // Check if stats section is in view to trigger counter
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    function checkStatsScroll() {
      if (hasAnimated) return;
      const windowHeight = window.innerHeight;
      const elementTop = statsSection.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        runCounters();
        hasAnimated = true;
        window.removeEventListener('scroll', checkStatsScroll);
      }
    }
    window.addEventListener('scroll', checkStatsScroll);
    checkStatsScroll(); // Trigger if already in view
  }

});
