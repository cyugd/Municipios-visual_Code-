document.addEventListener('DOMContentLoaded', function() {
    // --- Datos de los 43 municipios de Tamaulipas ---
    const municipios = [
        "Abasolo", "Aldama", "Altamira", "Antiguo Morelos", "Burgos", "Bustamante", "Camargo", "Casas", "Ciudad Madero", "Cruillas",
        "Gómez Farías", "González", "Güémez", "Guerrero", "Gustavo Díaz Ordaz", "Hidalgo", "Jaumave", "Jiménez", "Llera", "Mainero",
        "El Mante", "Matamoros", "Méndez", "Mier", "Miguel Alemán", "Miquihuana", "Nuevo Laredo", "Nuevo Morelos", "Ocampo", "Padilla",
        "Palmillas", "Reynosa", "Río Bravo", "San Carlos", "San Fernando", "San Nicolás", "Soto la Marina", "Tampico", "Tula", "Valle Hermoso",
        "Victoria", "Villagrán", "Xicoténcatl"
    ];
    
    // Coordenadas aproximadas (lat, lon) de cada municipio (centros reales aproximados)
    const coordenadas = {
        "Abasolo": [23.9325, -98.4286], "Aldama": [23.9478, -98.4102], "Altamira": [22.2728, -97.8350], "Antiguo Morelos": [22.5500, -99.0667],
        "Burgos": [24.9333, -98.8000], "Bustamante": [23.4333, -99.7500], "Camargo": [26.1833, -98.8333], "Casas": [23.7000, -98.7333],
        "Ciudad Madero": [22.2500, -97.8333], "Cruillas": [24.6833, -98.5167], "Gómez Farías": [23.0500, -99.1500], "González": [22.8333, -98.4333],
        "Güémez": [23.9167, -99.0000], "Guerrero": [26.5500, -99.0333], "Gustavo Díaz Ordaz": [26.2333, -98.6000], "Hidalgo": [24.2500, -99.4333],
        "Jaumave": [23.4000, -99.3833], "Jiménez": [24.2167, -98.5000], "Llera": [23.3167, -98.9833], "Mainero": [24.5500, -99.6167],
        "El Mante": [22.7500, -98.9667], "Matamoros": [25.8800, -97.5000], "Méndez": [25.1167, -98.5667], "Mier": [26.4333, -99.1500],
        "Miguel Alemán": [26.4000, -99.0333], "Miquihuana": [23.5667, -99.7500], "Nuevo Laredo": [27.4864, -99.5167], "Nuevo Morelos": [22.5333, -99.2000],
        "Ocampo": [22.8500, -99.3333], "Padilla": [24.0333, -98.9167], "Palmillas": [23.3000, -99.5667], "Reynosa": [26.0833, -98.2833],
        "Río Bravo": [25.9833, -98.0833], "San Carlos": [24.5833, -98.9667], "San Fernando": [24.8500, -98.1500], "San Nicolás": [24.6000, -98.7500],
        "Soto la Marina": [23.7667, -98.2167], "Tampico": [22.2553, -97.8686], "Tula": [22.9833, -99.7167], "Valle Hermoso": [25.6833, -97.8167],
        "Victoria": [23.7366, -99.1413], "Villagrán": [24.5333, -99.4833], "Xicoténcatl": [22.9833, -98.9500]
    };
    
    // Categorías y ratings aleatorios para variedad
    const categorias = ["Turístico", "Histórico", "Cultural", "Natural", "Industrial", "Fronterizo", "Minero", "Costa", "Capital", "Rural"];
    function randomRating() {
        const stars = Math.floor(Math.random() * 5) + 1;
        let html = '';
        for(let i=0; i<stars; i++) html += '<i class="fas fa-star"></i>';
        if (stars < 5) html += '<i class="far fa-star"></i>';
        return html;
    }
    
    // --- 1. Generar tarjetas del carrusel (todos los municipios) ---
    const swiperWrapper = document.getElementById('swiper-wrapper');
    if (swiperWrapper) {
        municipios.forEach(mun => {
            const categoria = categorias[Math.floor(Math.random() * categorias.length)];
            const ratingHtml = randomRating();
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <div class="card">
                    <div class="card-img">
                        <img src="https://via.placeholder.com/400x300?text=${encodeURIComponent(mun)}" alt="${mun}">
                        <div class="card-category">${categoria}</div>
                    </div>
                    <div class="card-info">
                        <h3>${mun}</h3>
                        <p>Municipio con gran riqueza cultural y natural.</p>
                        <div class="rating">${ratingHtml}</div>
                    </div>
                </div>
            `;
            swiperWrapper.appendChild(slide);
        });
    }
    
    // Inicializar Swiper después de agregar slides
    const swiper = new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
        autoplay: { delay: 4000, disableOnInteraction: false }
    });
    
    // --- 2. Mapa con todos los 43 municipios ---
    const map = L.map('map').setView([24.0, -98.5], 6.8); // Vista para cubrir todo Tamaulipas
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> & CartoDB'
    }).addTo(map);
    
    // Agregar marcador para cada municipio con coordenadas
    municipios.forEach(mun => {
        const coords = coordenadas[mun];
        if (coords) {
            L.marker(coords).addTo(map).bindPopup(`
                <b>${mun}</b><br>
                <img src="https://via.placeholder.com/100x60?text=${encodeURIComponent(mun)}" style="width:100px; border-radius:8px; margin-top:5px;"><br>
                <a href="#municipios" style="color:#008080;">Ver más</a>
            `);
        } else {
            console.warn(`Coordenadas no encontradas para ${mun}`);
        }
    });
    
    // Ajustar zoom para que se vean todos los marcadores (bounding box aproximado)
    const bounds = [
        [22.0, -100.0],  // suroeste
        [27.6, -97.0]    // noreste
    ];
    map.fitBounds(bounds);
    
    // --- 3. Galería mejorada con imágenes temáticas ---
    const galleryGrid = document.getElementById('gallery-grid');
    const imagenesGalería = [
        "https://images.pexels.com/photos/258117/pexels-photo-258117.jpeg", // naturaleza
        "https://images.pexels.com/photos/161816/beach-caribbean-sea-ocean-161816.jpeg", // playa
        "https://images.pexels.com/photos/2372720/pexels-photo-2372720.jpeg", // montaña
        "https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg", // ciudad
        "https://images.pexels.com/photos/552785/pexels-photo-552785.jpeg", // desierto
        "https://images.pexels.com/photos/1260323/pexels-photo-1260323.jpeg", // cascada
        "https://images.pexels.com/photos/257636/pexels-photo-257636.jpeg", // puerto
        "https://images.pexels.com/photos/2280569/pexels-photo-2280569.jpeg"  // cultura
    ];
    // Duplicar para tener 8 imágenes representativas
    for(let i=0; i<imagenesGalería.length; i++) {
        const imgDiv = document.createElement('div');
        imgDiv.className = 'gallery-item';
        imgDiv.innerHTML = `<img src="${imagenesGalería[i]}" alt="Galería Tamaulipas"><div class="gallery-overlay"><i class="fas fa-search-plus"></i></div>`;
        galleryGrid.appendChild(imgDiv);
    }
    
    // Lightbox para galería
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            const lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0,0,0,0.92)';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.zIndex = '2000';
            lightbox.innerHTML = `<img src="${imgSrc}" style="max-width:90%; max-height:90%; border-radius:16px;"><button style="position:absolute; top:20px; right:30px; background:none; border:none; color:white; font-size:2.2rem; cursor:pointer;">&times;</button>`;
            document.body.appendChild(lightbox);
            lightbox.querySelector('button').addEventListener('click', () => lightbox.remove());
        });
    });
    
    // --- 4. Animación de ondas líquidas en el hero (canvas) ---
    const canvas = document.getElementById('waveCanvas');
    if (canvas) {
        let ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = 120;
        let time = 0;
        
        function drawWaves() {
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            // Primera onda
            ctx.moveTo(0, height);
            for (let x = 0; x <= width; x += 20) {
                let y = Math.sin(x * 0.008 + time) * 15 + Math.sin(x * 0.02 + time * 1.5) * 8;
                ctx.lineTo(x, height - 30 - y);
            }
            ctx.lineTo(width, height);
            ctx.fillStyle = 'rgba(0, 128, 128, 0.5)';
            ctx.fill();
            
            // Segunda onda (más atrás)
            ctx.beginPath();
            ctx.moveTo(0, height);
            for (let x = 0; x <= width; x += 20) {
                let y = Math.sin(x * 0.012 + time * 1.2) * 12 + Math.cos(x * 0.025 + time) * 6;
                ctx.lineTo(x, height - 50 - y);
            }
            ctx.lineTo(width, height);
            ctx.fillStyle = 'rgba(255, 107, 53, 0.4)';
            ctx.fill();
            
            time += 0.03;
            requestAnimationFrame(drawWaves);
        }
        
        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = 120;
        }
        window.addEventListener('resize', resizeCanvas);
        drawWaves();
    }
    
    // --- Preloader, header scroll, menú hamburguesa, etc. ---
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if(preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 500);
        }
    });
    
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }
    
    AOS.init({ duration: 800, once: true, offset: 100 });
    
    // Botones de descarga
    const downloadApk = document.getElementById('downloadApkBtn');
    const downloadIos = document.getElementById('downloadIosBtn');
    if (downloadApk) downloadApk.addEventListener('click', (e) => { e.preventDefault(); alert('Enlace de descarga próximo.'); });
    if (downloadIos) downloadIos.addEventListener('click', (e) => { e.preventDefault(); alert('Versión iOS en desarrollo.'); });
    
    // Chatbot (igual que antes)
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendChat');
    const openChatBtn = document.getElementById('openChat');
    const closeChatBtn = document.getElementById('close-chat');
    const chatbotDiv = document.getElementById('chatbot');
    
    const responses = {
        "hola": "¡Hola! ¿En qué puedo ayudarte con los municipios de Tamaulipas?",
        "municipios": "Tenemos 43 municipios. Los más destacados son: Abasolo, Aldama, Altamira, Ciudad Victoria, Tampico, Reynosa, Matamoros, Nuevo Laredo, entre otros.",
        "turismo": "Puedes visitar la Reserva El Cielo, Playa Miramar, Cañón del Novillo, Cascada de Micos, Grutas de Bustamante, y el Pueblo Mágico de Mier.",
        "historia": "Tamaulipas tiene una rica historia colonial, con fundaciones de José de Escandón en el siglo XVIII.",
        "gastronomía": "Prueba el cabrito al pastor, zacahuil, enchiladas huastecas, camarones y dulces de leche.",
        "cultura": "El huapango, la música norteña y las danzas de matlachines son parte de la cultura tamaulipeca.",
        "gracias": "¡De nada! Disfruta de Tamaulipas.",
        "default": "Lo siento, no entendí tu pregunta. Pregúntame sobre municipios, turismo, historia o gastronomía."
    };
    
    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender);
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function getBotResponse(userText) {
        const lowerText = userText.toLowerCase();
        for (let key in responses) {
            if (lowerText.includes(key)) return responses[key];
        }
        return responses["default"];
    }
    
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const userText = chatInput.value.trim();
            if (!userText) return;
            addMessage(userText, 'user');
            chatInput.value = '';
            setTimeout(() => addMessage(getBotResponse(userText), 'bot'), 500);
        });
        chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendBtn.click(); });
    }
    
    if (openChatBtn && closeChatBtn && chatbotDiv) {
        openChatBtn.addEventListener('click', () => { chatbotDiv.classList.add('active'); openChatBtn.style.display = 'none'; });
        closeChatBtn.addEventListener('click', () => { chatbotDiv.classList.remove('active'); openChatBtn.style.display = 'flex'; });
    }
});