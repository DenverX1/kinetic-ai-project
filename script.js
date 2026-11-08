/* =========================================================
   1. INTERACCIÓN DEL DIAGRAMA TÉCNICO
   ========================================================= */
// Seleccionamos todas las cajas del diagrama y el texto inferior
const diagramSteps = document.querySelectorAll('.diagram-step');
const diagramCaption = document.getElementById('diagram-caption');

// Recorremos cada caja para escuchar cuándo el usuario hace clic
diagramSteps.forEach(step => {
    step.addEventListener('click', () => {
        // 1. Quitamos el brillo (.active) de todas las cajas
        diagramSteps.forEach(item => item.classList.remove('active'));

        // 2. Le ponemos el brillo (.active) solo a la caja que recibió el clic
        step.classList.add('active');

        // 3. Leemos el texto guardado en 'data-detail' del HTML y lo mostramos abajo
        const technicalDetail = step.getAttribute('data-detail');
        diagramCaption.textContent = technicalDetail;
    });
});

/* =========================================================
   2. INTERACCIÓN DEL BOTÓN DE PUBLICIDAD (TECH ADS)
   ========================================================= */
const btnDemo = document.getElementById('btn-demo');
const adStatus = document.getElementById('ad-status');

btnDemo.addEventListener('click', () => {
    // Cambiamos el texto y estilo del botón al hacer clic
    btnDemo.textContent = 'Telemetry Active ✓';
    btnDemo.style.backgroundColor = '#06B6D4'; // Cambia de naranja a cian

    // Mostramos un mensaje técnico debajo del botón
    adStatus.textContent = '📡 Connected to SkyGrid UAV Sandbox (Latency: 4ms)';
});

/* =========================================================
   3. ILUMINACIÓN AUTOMÁTICA EN LA NAVBAR (SCROLLSPY AJUSTADO)
   ========================================================= */
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('#news, #opinion, #ads, #trivia, #podcast, #references');

window.addEventListener('scroll', () => {
    let currentSection = '';
    // Detecta la sección a mitad de pantalla para que Podcast se active a tiempo
    const scrollPosition = window.scrollY + (window.innerHeight * 0.45);

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    // Solo pasa a References al tocar exactamente el borde final de la página
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5) {
        currentSection = 'references';
    }

    navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active-link');
        }
    });
});

/* =========================================================
   4. CONTADORES ANIMADOS EN TECH TRIVIA
   ========================================================= */
const triviaSection = document.getElementById('trivia');
let countersStarted = false;

function animateTriviaCounters() {
    // Busca los títulos o cifras destacadas dentro de Tech Trivia
    const numberElements = triviaSection.querySelectorAll('h3, h4, strong, span:not(.tag)');

    numberElements.forEach(el => {
        const originalText = el.textContent;
        const match = originalText.match(/(\d+)/); // Detecta si contiene un número

        if (match && el.children.length === 0) {
            const targetNumber = parseInt(match[0], 10);
            const duration = 1400; // Duración de la animación (1.4 segundos)
            const steps = 40;
            const increment = targetNumber / steps;
            let current = 0;
            let stepCount = 0;

            const timer = setInterval(() => {
                stepCount++;
                current += increment;

                if (stepCount >= steps) {
                    el.textContent = originalText; // Restaura el número exacto al terminar
                    clearInterval(timer);
                } else {
                    el.textContent = originalText.replace(match[0], Math.floor(current));
                }
            }, duration / steps);
        }
    });
}

// Observador que dispara el conteo solo cuando el usuario baja hasta Tech Trivia
if (triviaSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                animateTriviaCounters();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(triviaSection);
}

/* =========================================================
   5. MODO TELEMETRÍA EN LA BARRA SUPERIOR
   ========================================================= */
const navStatus = document.querySelector('.nav-status');

if (navStatus) {
    const telemetryModes = [
        '<span class="status-dot"></span> 2026 Edition',
        '<span class="status-dot"></span> SAT-LINK: 99.8% OK',
        '<span class="status-dot"></span> UAV FLEET: 12 ACTIVE',
        '<span class="status-dot"></span> EDGE PING: 3.4 ms'
    ];
    let currentMode = 0;

    navStatus.title = "Click to cycle live telemetry data";

    navStatus.addEventListener('click', () => {
        currentMode = (currentMode + 1) % telemetryModes.length;
        navStatus.innerHTML = telemetryModes[currentMode];
    });
}

/* =========================================================
   6. FICHAS TÉCNICAS DESPLEGABLES EN FEATURED NEWS
   ========================================================= */
const newsCards = document.querySelectorAll('#news .card');

const specsData = [
    [
        "<strong>Sensors:</strong> 3D LiDAR + Stereo Depth Cameras",
        "<strong>Latency:</strong> On-board NPU (4.2 ms response)",
        "<strong>Autonomy:</strong> 18 hrs continuous warehouse shift"
    ],
    [
        "<strong>Payload:</strong> Radiometric FLIR Thermal Sensor",
        "<strong>Range:</strong> 15 km BVLOS encrypted telemetry",
        "<strong>Protection:</strong> IP54 EMI-shielded carbon frame"
    ],
    [
        "<strong>Architecture:</strong> Distributed Swarm Mesh v2.4",
        "<strong>Compute:</strong> 275 TOPS Edge AI processor",
        "<strong>Safety:</strong> Dual-redundant obstacle avoidance"
    ]
];

newsCards.forEach((card, index) => {
    const cardSpecs = specsData[index] || specsData[0];

    // Crea el botón desplegable
    const btn = document.createElement('button');
    btn.className = 'btn-specs';
    btn.innerHTML = '<span>⚙️ View Technical Specs</span> <span>▾</span>';

    // Crea la lista oculta con las especificaciones
    const list = document.createElement('ul');
    list.className = 'specs-panel';
    list.innerHTML = cardSpecs.map(item => `<li>${item}</li>`).join('');

    // Alterna entre mostrar y ocultar al hacer clic
    btn.addEventListener('click', () => {
        const isOpen = list.classList.toggle('open');
        btn.innerHTML = isOpen 
            ? '<span>✕ Hide Technical Specs</span> <span>▴</span>' 
            : '<span>⚙️ View Technical Specs</span> <span>▾</span>';
    });

    card.appendChild(btn);
    card.appendChild(list);
});
