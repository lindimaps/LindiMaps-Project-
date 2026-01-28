// 1. Konfigurimi i Hartës (Leaflet)
var map = L.map('map', { 
    scrollWheelZoom: false 
}).setView([41.3275, 19.8187], 13);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.marker([41.3275, 19.8187])
    .addTo(map)
    .bindPopup('<b class="text-blue-600 uppercase">LindiMaps Studio</b>');

// 2. Animacioni i Satelitit rreth Hartës
const satellite = document.getElementById('satellite-scanner');
const mapEl = document.getElementById('map');
let angle = 0;

function animateSatellite() {
    if (!mapEl) return;
    const rect = mapEl.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radiusX = rect.width * 0.35;
    const radiusY = rect.height * 0.30;
    
    const x = centerX + radiusX * Math.cos(angle);
    const y = centerY + radiusY * Math.sin(angle);
    
    satellite.style.left = `${x}px`;
    satellite.style.top = `${y}px`;
    angle += 0.005;
    requestAnimationFrame(animateSatellite);
}

// 3. Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// 4. Scroll To Top Logic
const scrollTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    const scrollPosition = window.innerHeight + window.pageYOffset;
    const pageHeight = document.documentElement.scrollHeight;
    
    if (scrollPosition > pageHeight - 150) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Nis animacionin kur ngarkohet faqja
window.onload = animateSatellite;

// Menaxhimi i Kartave të Shërbimeve (për Touch & Click)
const cards = document.querySelectorAll('.service-card');

cards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = card.classList.contains('active');
        
        // Mbyll kartat e tjera
        cards.forEach(c => c.classList.remove('active'));
        
        // Hap këtë nëse nuk ishte aktive
        if (!isActive) {
            card.classList.add('active');
        }
    });
});

// Mbyll kartat nëse klikon jashtë tyre
document.addEventListener('click', () => {
    cards.forEach(c => c.classList.remove('active'));
});

// Logjika për zgjerimin e tekstit të projekteve
document.querySelectorAll('.details-toggle').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.project-card');
        const textElement = card.querySelector('.description-text');
        const overlay = card.querySelector('.image-overlay');
        
        textElement.classList.toggle('expanded-text');
        
        if (textElement.classList.contains('expanded-text')) {
            this.textContent = 'Mbyll';
            overlay.style.background = 'linear-gradient(to top, rgba(15, 23, 42, 0.98) 0%, rgba(15, 23, 42, 0.8) 70%, rgba(15, 23, 42, 0.4) 100%)';
        } else {
            this.textContent = 'Detaje';
            overlay.style.background = ''; 
        }
    });
});
