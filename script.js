document.addEventListener("DOMContentLoaded", function() {

    // --- CONFIGURAÇÃO DO WHATSAPP ---
    const WHATSAPP_NUMBER = "5511999999999"; 

    // --- CRONÔMETRO REGRESSIVO (COUNTDOWN) ---
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

    // --- ANIMAÇÃO DA BARRA DE PROGRESSO DE VAGAS ---
    function animateProgressBar() {
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            setTimeout(() => {
                progressFill.style.transition = 'width 3s ease-in-out';
                progressFill.style.width = '70%';
            }, 100);
        }
    }

    animateProgressBar();

    // --- ATUALIZA VAGAS DISPONÍVEIS ---
    function updateAvailableSlots() {
        const availableSlots = document.getElementById('available-slots');
        if (availableSlots) {
            availableSlots.textContent = '3';
        }
    }

    updateAvailableSlots();

    // --- ROLAGEM SUAVE ---
    const scrollBtn = document.querySelector('.cta-scroll');
    const pricingSection = document.getElementById('pricing');

    if (scrollBtn && pricingSection) {
        scrollBtn.addEventListener('click', function() {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- AGENT DE DISPARO WHATSAPP COM COCOPY DE CONVERSÃO ---
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');

    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planName = this.getAttribute('data-plan');
            let message = "";

            if (planName === "Express") {
                message = "Olá! Acessei a sua página de vendas e quero garantir minha vaga na Imersão Intensiva de Pronúncia através do Plano Express por R$ 49,90. Como fazemos com o agendamento?";
            } else if (planName === "Premium") {
                message = "Olá! Acessei a sua página de vendas e quero garantir minha vaga na Imersão Intensiva de Pronúncia através do Plano Premium por R$ 97,00. Como podemos alinhar os horários?";
            } else if (planName === "Urgency") {
                message = "Olá! Vi sua página com as vagas limitadas e não quero perder essa oportunidade da Imersão Intensiva de Pronúncia! Qual o próximo passo para garantir minha vaga?";
            } else {
                message = "Olá! Quero preencher uma das 10 vagas disponíveis desta semana para a Imersão Intensiva de Pronúncia em Inglês. Qual o próximo passo?";
            }

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');
        });
    });

    // --- EFEITO ACORDION DO FAQ ---
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