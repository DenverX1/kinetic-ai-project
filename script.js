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