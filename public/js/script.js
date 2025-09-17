document.addEventListener('DOMContentLoaded', () => {
    // Inicialização da biblioteca AOS
    AOS.init({ duration: 1000, once: true });

    // Menu Hamburger
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Efeito de Scroll no Header
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Slideshow da Seção Hero
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = (i === index) ? '1' : '0';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    if (slides.length > 0) {
        showSlide(currentSlide);
        setInterval(nextSlide, 5000); // Troca a cada 5 segundos
    }

    // Animação dos Contadores
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = 200;

        function updateCounter() {
            const increment = target / speed;
            if (count < target) {
                count += increment;
                counter.innerText = Math.floor(count);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        }
        updateCounter();
    });
});