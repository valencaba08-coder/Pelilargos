document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Fade-in Animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // 2. Tab Filtering Logic for Gallery
    const tabBtns = document.querySelectorAll('.tab-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            
            const target = btn.getAttribute('data-target');
            
            galleryCards.forEach(card => {
                if (target === 'todas') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === target) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 3. Form Submission Simulation
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation simulation
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Enviando...';
            btn.disabled = true;
            
            setTimeout(() => {
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
                
                formStatus.style.display = 'block';
                formStatus.style.color = '#fff';
                formStatus.textContent = '¡Gracias! Nos pondremos en contacto contigo muy pronto.';
                
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }
});
