document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Menu Hamburger
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // 2. Slideshow da Seção Hero com Diagnóstico
    const slides = document.querySelectorAll(".slide");
    if (slides.length > 0) {
        let currentSlide = 0;
        
        slides.forEach((slide, index) => {
            const imgSrc = slide.getAttribute('data-src');
            if (imgSrc) {
                // Aplica a imagem como background
                slide.style.backgroundImage = `url('${imgSrc}')`;
                console.log(`Slide ${index}: Carregando imagem -> ${imgSrc}`);
            } else {
                // AVISA NO CONSOLE SE NÃO ENCONTRAR O ATRIBUTO data-src
                console.error(`ERRO: Slide ${index} não possui o atributo 'data-src' com o caminho da imagem.`);
                slide.style.backgroundColor = 'var(--cinza-escuro)'; // Fundo de emergência
            }
        });

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === index);
            });
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        showSlide(currentSlide);
        setInterval(nextSlide, 7000); // Intervalo de 7s para efeito Ken Burns
    }

    // 3. Animação de Contagem de Estatísticas
    // (O código dos contadores e do AOS continua o mesmo, pode colar o anterior aqui)
    const counters = document.querySelectorAll(".counter");
    const statsSection = document.querySelector(".stats-section");

    const startCounter = (counter) => {
        const target = +counter.getAttribute("data-target");
        counter.innerText = '0'; // Começa do zero
        let count = 0;
        const duration = 2000;
        const increment = target / (duration / 16); // ~60fps

        const updateCount = () => {
            count += increment;
            if (count < target) {
                counter.innerText = Math.ceil(count);
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target;
            }
        };
        requestAnimationFrame(updateCount);
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(startCounter);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // 4. Inicialização do AOS
    AOS.init({
        duration: 1200,
        once: true,
        offset: 150,
        easing: 'ease-in-out',
    });
});