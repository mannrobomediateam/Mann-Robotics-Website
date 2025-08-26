document.addEventListener("DOMContentLoaded", () => {
  // --- CAROUSEL ---
  const track = document.querySelector(".carousel-track");
  if(track){
    const cards = Array.from(track.querySelectorAll(".carousel-card"));
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");
    let currentIndex = 0;
    const autoRotateInterval = 5000;
    let autoRotate;

    const updateCarousel = () => {
      cards.forEach((card, i) => {
        card.classList.remove("left", "center", "right");
        if (i === currentIndex) card.classList.add("center");
        else if (i === (currentIndex - 1 + cards.length) % cards.length) card.classList.add("left");
        else if (i === (currentIndex + 1) % cards.length) card.classList.add("right");
      });
    };

    const goPrev = () => { currentIndex = (currentIndex - 1 + cards.length) % cards.length; updateCarousel(); resetAutoRotate(); };
    const goNext = () => { currentIndex = (currentIndex + 1) % cards.length; updateCarousel(); resetAutoRotate(); };
    const startAutoRotate = () => { autoRotate = setInterval(goNext, autoRotateInterval); };
    const resetAutoRotate = () => { clearInterval(autoRotate); startAutoRotate(); };

    prevBtn?.addEventListener("click", goPrev);
    nextBtn?.addEventListener("click", goNext);

    updateCarousel();
    startAutoRotate();
  }

  // --- HERO VIDEO ---
  const video = document.getElementById('hero-video');
  if(video){
    video.addEventListener('loadeddata', () => console.log('✅ Hero video loaded!'));
    video.addEventListener('playing', () => console.log('✅ Hero video playing!'));
    video.addEventListener('error', e => console.log('❌ Hero video error:', e));
  }

  // --- FADE-IN SECTIONS ---
  const sections = document.querySelectorAll('.fade-section');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add('visible');
      else entry.target.classList.remove('visible');
    });
  }, {threshold: 0.15, rootMargin: '0px 0px -80px 0px'});
  sections.forEach(section => sectionObserver.observe(section));

  // --- SMOOTH SCROLL ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // --- HEADER SCROLL ---
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 100) header?.classList.add('scrolled');
    else header?.classList.remove('scrolled');
  });

  // --- STAT COUNTERS ---
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      let count = +counter.innerText;
      const increment = Math.ceil(target / speed);
      if(count < target){
        counter.innerText = count + increment;
        setTimeout(updateCount, 20);
      } else counter.innerText = target;
    };

    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          updateCount();
          counterObserver.unobserve(counter);
        }
      });
    }, {threshold: 0.5});

    counterObserver.observe(counter);
  });

});

