document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".carousel-track");
    const cards = Array.from(track.querySelectorAll(".carousel-card"));
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");
    let currentIndex = 0;
    const autoRotateInterval = 5000; // 5 seconds
    let autoRotate;

    if (!cards.length) return; // safety check

    // Update card positions
    function updateCarousel() {
        cards.forEach((card, i) => {
            card.classList.remove("left", "center", "right");

            if (i === currentIndex) card.classList.add("center");
            else if (i === (currentIndex - 1 + cards.length) % cards.length) card.classList.add("left");
            else if (i === (currentIndex + 1) % cards.length) card.classList.add("right");
        });
    }

    // Go to previous card
    function goPrev() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
        resetAutoRotate();
    }

    // Go to next card
    function goNext() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
        resetAutoRotate();
    }

    // Auto-rotate carousel
    function startAutoRotate() {
        autoRotate = setInterval(goNext, autoRotateInterval);
    }

    function resetAutoRotate() {
        clearInterval(autoRotate);
        startAutoRotate();
    }

    // Event listeners for buttons
    if (prevBtn) prevBtn.addEventListener("click", goPrev);
    if (nextBtn) nextBtn.addEventListener("click", goNext);

    // Initialize carousel
    updateCarousel();
    startAutoRotate();
});




// === HERO VIDEO LOGIC ===
const video = document.getElementById('hero-video');
if (video) {
    video.addEventListener('loadeddata', () => {
            console.log('✅ Hero video loaded successfully!');
        });

        video.addEventListener('playing', () => {
            console.log('✅ Hero video playing - Should be visible behind header!');
        });

        video.addEventListener('error', (e) => {
            console.log('❌ Hero video error:', e);
        });
    }

    // === SCROLL ANIMATIONS ===
    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -80px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
            else entry.target.classList.remove('visible');
        });
    }, observerOptions);

    document.querySelectorAll('.fade-section').forEach(section => observer.observe(section));

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-header');
        if (window.scrollY > 100) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });

