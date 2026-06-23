document.addEventListener("DOMContentLoaded", function() {

    // --- CRONÔMETRO REGRESSIVO ---
    function startCountdown() {
        const countdownDuration = 48 * 60 * 60 * 1000;
        const endTime = localStorage.getItem('countdownEnd') ?
            parseInt(localStorage.getItem('countdownEnd')) :
            Date.now() + countdownDuration;

        localStorage.setItem('countdownEnd', endTime);

        function updateCountdown() {
            const now = Date.now();
            const timeLeft = Math.max(0, endTime - now);

            const totalHours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(totalHours).padStart(2, '0');
            document.getElementById('hours').textContent = String(minutes).padStart(2, '0');
            document.getElementById('minutes').textContent = String(seconds).padStart(2, '0');

            if (timeLeft === 0) {
                localStorage.removeItem('countdownEnd');
                startCountdown();
            }
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    startCountdown();

    // --- ROLAGEM SUAVE AO CLICAR NO CTA DO HERO ---
    const scrollBtn = document.querySelector('.cta-scroll');
    const pricingSection = document.getElementById('pricing');

    if (scrollBtn && pricingSection) {
        scrollBtn.addEventListener('click', function() {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- LIGHTBOX DAS IMAGENS ---
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    const lightboxImg = document.createElement('img');
    overlay.appendChild(lightboxImg);
    document.body.appendChild(overlay);

    document.querySelectorAll('.preview-card img').forEach(img => {
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            overlay.classList.add('active');
        });
    });

    overlay.addEventListener('click', function() {
        overlay.classList.remove('active');
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') overlay.classList.remove('active');
    });

    // --- EVENTO DE COMPRA META PIXEL ---
    document.querySelectorAll('.btn-purchase-striking').forEach(btn => {
        btn.addEventListener('click', function() {
            fbq('track', 'InitiateCheckout', {
                value: 29.90,
                currency: 'BRL',
                content_name: 'Método Notion + Mentoria de Inglês'
            });
        });
    });

    // --- ACORDEÃO DO FAQ ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const content = item.querySelector('.accordion-content');
            const isOpen = item.classList.contains('active');

            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-content').style.maxHeight = null;
                i.querySelector('.accordion-content').style.paddingBottom = "0px";
                i.querySelector('.accordion-content').style.paddingTop = "0px";
            });

            if (!isOpen) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 48 + "px";
                content.style.paddingTop = "16px";
                content.style.paddingBottom = "24px";
            }
        });
    });

});
