// 2. Setup Base
const container = document.getElementById('canvas-sec2');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 30;




//REGISTRA LA POSIZIONE DEL MOUSE

const mouse1 = new THREE.Vector2();
const targetMouse1 = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    // Converte la posizione del mouse in valori da -1 a +1
    mouse1.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse1.y = -(event.clientY / window.innerHeight) * 2 + 1;
});






const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Luce
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const pointLight = new THREE.PointLight(0xffffff, 1000, 1000); // Colore, intensità, distanza massima
pointLight.position.set(0, 0, 0);   
scene.add(pointLight);


//aggiunta forme
const geometria = new THREE.BoxGeometry( 10, 10, 10); 
const geometria2 = new THREE.BoxGeometry(2,2, 2);





// ==========================================STELLA===============================================================
// La stella con i bordi curvi (stile icona)
const geometriaStella = (() => {
    const forma = new THREE.Shape(); 
    // Parametri per personalizzare la stella
    const punta = 2;    // Lunghezza delle 4 punte
    const curva = 0.5;  // Quanto il lato "rientra" verso il centro (valori bassi = stella più snella)
    // Disegno vettoriale della stella
    forma.moveTo(0, punta); // Partiamo dalla punta in alto
    // Curviamo verso destra, poi in basso, poi a sinistra, poi torniamo in alto
    forma.quadraticCurveTo(curva, curva, punta, 0);   
    forma.quadraticCurveTo(curva, -curva, 0, -punta); 
    forma.quadraticCurveTo(-curva, -curva, -punta, 0); 
    forma.quadraticCurveTo(-curva, curva, 0, punta);   
    // Trasformiamo il disegno 2D in un oggetto 3D (estrusione)
    return new THREE.ExtrudeGeometry(forma, {
        depth: 0.1,             // Spessore 3D
        bevelEnabled: true,   // Bordo morbido per catturare meglio la luce
        bevelThickness: 0.1,
        bevelSize: 0.01,
        bevelSegments: 1
    });
})();

// ===========================================STELLA==============================================================









// Le facce trasparenti (vetro scuro)
const materialeFacce = new THREE.MeshStandardMaterial({ 
    color: 0x000000, 
    transparent: true, 
    opacity: 0, 
    depthWrite: false 
});


const materialestella = new THREE.MeshStandardMaterial({ 
    color: 0x99ffff, 
    transparent: true, 
    opacity: 0, 
    depthWrite: false,
    metalness: 1,
    roughness: 0.7
    
    
});






//posizioni
// ===============================================
const cuboSection2 = new THREE.Mesh(geometria, materialeFacce);
cuboSection2.position.x = 10; 
cuboSection2.position.y = 1;
scene.add(cuboSection2);

const cuboSection2_2 = new THREE.Mesh(geometria2, materialeFacce);
cuboSection2_2.position.x = 15;   
cuboSection2_2.position.y = -10;
scene.add(cuboSection2_2);  

const stellaSection2 = new THREE.Mesh(geometriaStella, materialestella);
stellaSection2.position.x = -3;
stellaSection2.position.y = 10;
scene.add(stellaSection2);








//=====================================================================


// I bordi spessi
// ========================================================================
const edges = new THREE.EdgesGeometry(geometria);
const bordiGeometriaAvanzata = new LineSegmentsGeometry().fromEdgesGeometry(edges);
const materialeBordi = new LineMaterial({ 
    color: 0xA1A1A1,
    opacity: 0.6,
    linewidth: 3, // SPESSORE LINEE
    resolution: new THREE.Vector2(container.clientWidth, container.clientHeight) 
});
const lineeBordi = new LineSegments2(bordiGeometriaAvanzata, materialeBordi);

//bordi spessi cubo piccolo
const edges1 = new THREE.EdgesGeometry(geometria2);
const bordiGeometriaAvanzata1 = new LineSegmentsGeometry().fromEdgesGeometry(edges1);
const materialeBordi1 = new LineMaterial({ 
    color: 0xA1A1A1,
    linewidth: 1, // SPESSORE LINEE
    resolution: new THREE.Vector2(container.clientWidth, container.clientHeight) 
});
const lineeBordi1 = new LineSegments2(bordiGeometriaAvanzata1, materialeBordi1);


//bordi spessi stella
const edges2 = new THREE.EdgesGeometry(geometriaStella);
const bordiGeometriaAvanzata2 = new LineSegmentsGeometry().fromEdgesGeometry(edges2);
const materialeBordi2 = new LineMaterial({ 
    color: 0xA1A1A1,
    linewidth: 1, // SPESSORE LINEE
    resolution: new THREE.Vector2(container.clientWidth, container.clientHeight) 
});
const lineeBordi2 = new LineSegments2(bordiGeometriaAvanzata2, materialeBordi2);




//=======================================================================================================



// UNISCE I BORDI AL CUBO
// =======================================
cuboSection2.add(lineeBordi); 
cuboSection2_2.add(lineeBordi1);
stellaSection2.add(lineeBordi2);
// ==========================================




// 4. ANIMAZIONE GSAP (Il cubo cade dall'alto)
gsap.from(cuboSection2.position, {
    y: 35,
    ease: "none",
    scrollTrigger: {
        trigger: "#section2",
        start: "top bottom", 
        end: "bottom center",
        scrub: true           
    }
});


gsap.from(cuboSection2_2.position, {
    y: 80,
    ease: "none",
    scrollTrigger: {
        trigger: "#section2",
        start: "top bottom", 
        end: "bottom center",
        scrub: true           
    }
});


gsap.from(stellaSection2.position, {
    y: 80,
    ease: "none",
    scrollTrigger: {
        trigger: "#section2",
        start: "top bottom", 
        end: "bottom center",
        scrub: true           
    }
});





// 5. ANIMAZIONE ROTAZIONE CONTINUA
function animateSec2() {
    requestAnimationFrame(animateSec2);
    cuboSection2.rotation.x -= 0.003;
    cuboSection2.rotation.y -= 0.006;
    
    cuboSection2_2.rotation.x += 0.01;  //animazione cubo piccolo
    cuboSection2_2.rotation.y += 0.02;  
    
    
    // stellaSection2.rotation.x += 0.02;  //animazione stella
    stellaSection2.rotation.y += 0.04;  
    
    renderer.render(scene, camera);
    
    
    
    // varia lo spessore delle linee   
    materialeBordi.linewidth = 5 + Math.sin(Date.now() * 0.002) * 2;
    materialeBordi1.linewidth = 2 + Math.sin(Date.now() * 0.004) * 1;
    
    // varia il colore delle linee in base alla rotazione
    //  const hue = (cuboSection2.rotation.y * 50) % 7200;
    //    const hue1 = (cuboSection2_2.rotation.y * 50) % 360; // varia il colore del secondo cubo 
    //   materialeBordi.color.setHSL(hue / 180, 1, 0.5); 
    //   materialeBordi1.color.setHSL(hue1 / 180, 1, 0.5); 
    
    
    
    
    
    // 1. Calcoliamo la posizione target (moltiplichiamo per 50 per coprire l'area visibile)
    const targetX = mouse1.x * 20;
    const targetY = mouse1.y * 10;
    
    // 2. Muoviamo il cubo verso il target con un po' di ritardo (0.05 è la morbidezza)
    stellaSection2.position.x += (targetX - stellaSection2.position.x) * 0.1;
    stellaSection2.position.y += (targetY - stellaSection2.position.y) * 0.1;
    
    
    
    
    
    
    
    
    
    
    
    
}
animateSec2();

// ==========================================
// 6. RESPONSIVE (Aggiorna anche le linee!)
// ==========================================
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    
    // Questa riga salva le linee quando stringi la finestra
    materialeBordi.resolution.set(container.clientWidth, container.clientHeight);
});










// 1. Setup Base
const container = document.getElementById('canvas-sec3');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// 2. Luci
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const pointLight = new THREE.PointLight(0xffffff, 1000, 1000); 
pointLight.position.set(0, 0, 0);   
scene.add(pointLight);

// ==========================================
// 3. CREAZIONE DELLE 9 SFERE IN CERCHIO
// ==========================================
const gruppoSfere = new THREE.Group();
scene.add(gruppoSfere);

gruppoSfere.position.y = 11; // Sposta il gruppo in alto

const geometriaSfera = new THREE.SphereGeometry(1.2, 32, 32);
const materialeSfera = new THREE.MeshStandardMaterial({ 
    color: 0xffffff, 
    metalness: 1, 
    roughness: 0.2 
});

const numeroSfere = 9;
const raggioCerchio = 6;

for (let i = 0; i < numeroSfere; i++) {
    const angolo = (i / numeroSfere) * Math.PI * 2;
    const sfera = new THREE.Mesh(geometriaSfera, materialeSfera);
    sfera.position.x = Math.cos(angolo) * raggioCerchio;
    sfera.position.y = Math.sin(angolo) * raggioCerchio;
    gruppoSfere.add(sfera);
} // <--- FINE DEL CICLO FOR. Tutto il resto deve stare DOPO questa parentesi!

// ==========================================
// 4. CREAZIONE CUBO
// ==========================================
const geometriaCubo = new THREE.BoxGeometry(3, 3, 3);
const geometriaCubo1 = new THREE.BoxGeometry(3, 3, 3);

const materialeCubo = new THREE.MeshStandardMaterial({ 
    color: 0xffffff,
    metalness: 0.8,
    roughness: 0.2
});







const cubosec3 = new THREE.Mesh(geometriaCubo, materialeCubo);
cubosec3.position.set(-45, -5, -20); 
scene.add(cubosec3);


const cubo1sec3 = new THREE.Mesh(geometriaCubo1, materialeCubo);
cubo1sec3.position.set(35, -4, 10); 
scene.add(cubo1sec3);






// ==========================================
// 5. GRIGLIA E NEBBIA
// ==========================================
const dimensioneGriglia = 100; 
const divisioni = 50;          
const griglia = new THREE.GridHelper(dimensioneGriglia, divisioni, 0xffffff, 0xffffff);
griglia.material.transparent = true;
griglia.material.opacity = 0.1; 
griglia.position.y = -6; 
scene.add(griglia);

scene.fog = new THREE.Fog('#1A1A1A', 20, 100);

// ==========================================
// 6. ANIMAZIONI GSAP E ROTAZIONE
// ==========================================
gsap.from(gruppoSfere.scale, {
    x: 0, y: 0, z: 0, 
    ease: "back.out(-0.5)", 
    scrollTrigger: {
        trigger: "#section3",
        start: "top center", 
        end: "center center",
        scrub: true           
    }
});





function animateSec3() {
    requestAnimationFrame(animateSec3);
    
    // Ruotano le sfere
    gruppoSfere.rotation.z -= 0.03; 
    gruppoSfere.rotation.x += 0.015;  
    
    
    cubosec3.position.x += 0.1;
    cubosec3.rotation.y += 0.001;
    
    cubo1sec3.position.x -=0.1;
    cubo1sec3.rotation.y -=0.01;
    
    
    if(cubosec3.position.x > 45) {
        cubosec3.position.x = -45;
    }
    
    if (cubo1sec3.position.x < -35) {
        cubo1sec3.position.x = 35; 
    }
    
    
    
    
    renderer.render(scene, camera);
}
animateSec3();

// ==========================================
// 7. RESPONSIVE
// ==========================================
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});


// Setup Base
const container = document.getElementById('canvas-sec5');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Luci
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const pointLight = new THREE.PointLight(0xffffff, 1000, 1000);
pointLight.position.set(0, 0, 0);   
scene.add(pointLight);

// Geometria Stella ====================================================================================
const geometriaStella = (() => {
    const forma = new THREE.Shape(); 
    const punta = 2;    
    const curva = 0.5;  
    forma.moveTo(0, punta); 
    forma.quadraticCurveTo(curva, curva, punta, 0);   
    forma.quadraticCurveTo(curva, -curva, 0, -punta); 
    forma.quadraticCurveTo(-curva, -curva, -punta, 0); 
    forma.quadraticCurveTo(-curva, curva, 0, punta);   
    return new THREE.ExtrudeGeometry(forma, {
        depth: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.01,
        bevelSegments: 1
    });
})();
//============================================================================================================


// Geometria Seconda Stella ====================================================================================
const geometriaStella1 = (() => {
    const forma = new THREE.Shape(); 
    const punta = 2;    
    const curva = 0.5;  
    forma.moveTo(0, punta); 
    forma.quadraticCurveTo(curva, curva, punta, 0);   
    forma.quadraticCurveTo(curva, -curva, 0, -punta); 
    forma.quadraticCurveTo(-curva, -curva, -punta, 0); 
    forma.quadraticCurveTo(-curva, curva, 0, punta);   
    return new THREE.ExtrudeGeometry(forma, {
        depth: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.01,
        bevelSegments: 1
    });
})();
//============================================================================================================





const materialestella = new THREE.MeshStandardMaterial({ 
    color: 0x99ffff, 
    transparent: true, 
    opacity: 0, 
    depthWrite: false,
    metalness: 1,
    roughness: 0.7
    
    
});


const stellaSection2 = new THREE.Mesh(geometriaStella, materialestella);
scene.add(stellaSection2);

const stellaSection2_2 = new THREE.Mesh(geometriaStella1, materialestella);
scene.add(stellaSection2_2);


// Bordi Stella
const edges2 = new THREE.EdgesGeometry(geometriaStella);
const bordiGeometriaAvanzata2 = new LineSegmentsGeometry().fromEdgesGeometry(edges2);
const materialeBordi2 = new LineMaterial({ 
    color: 0xA1A1A1,
    linewidth: 2,
    resolution: new THREE.Vector2(container.clientWidth, container.clientHeight) 
});


// Bordi Stella
const edges1 = new THREE.EdgesGeometry(geometriaStella1);
const bordiGeometriaAvanzata1 = new LineSegmentsGeometry().fromEdgesGeometry(edges2);
const materialeBordi1 = new LineMaterial({ 
    color: 0xA1A1A1,
    linewidth: 2,
    resolution: new THREE.Vector2(container.clientWidth, container.clientHeight) 
});



const lineeBordi2 = new LineSegments2(bordiGeometriaAvanzata2, materialeBordi2);
stellaSection2.add(lineeBordi2);

const lineeBordi1 = new LineSegments2(bordiGeometriaAvanzata1, materialeBordi1);
stellaSection2_2.add(lineeBordi1);




stellaSection2.position.x = -20;
stellaSection2.position.y = -18;

stellaSection2_2.position.x = 20;
stellaSection2_2.position.y = 18;



// Animazione GSAP (Caduta)
gsap.from(stellaSection2.position, {
    y: 80,
    ease: "none",
    scrollTrigger: {
        trigger: "#section2",
        start: "top bottom", 
        end: "bottom center",
        scrub: true           
    }
});

function animateSec5() {
    requestAnimationFrame(animateSec5);
    
    stellaSection2.rotation.y += 0.04;  
    stellaSection2.position.y += 0.50;  
    
    stellaSection2_2.rotation.y += 0.04;
    stellaSection2_2.position.y -= 0.50;   
    
    
    
    if(stellaSection2.position.y > 17) {
        stellaSection2.position.y = -17;
    }
    
    if(stellaSection2_2.position.y < -17) {
        stellaSection2_2.position.y = 17;
    }
    
    
    
    
    
    renderer.render(scene, camera);
}
animateSec5();

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
    materialeBordi2.resolution.set(container.clientWidth, container.clientHeight);
});



// =========================================================================================================
// GESTIONE MUSICA DI SOTTOFONDO E SECTION 7
// ========================================================================================================
const globalMusic = document.getElementById('globalMusic');
const musicToggle = document.getElementById('musicToggle');
const musicText = document.getElementById('musicText');
const musicIcon = document.getElementById('musicIcon');

let isMusicWanted = false; // Memoria: l'utente vuole la musica accesa?

// 1. Accendere/Spegnere la musica dal bottone
musicToggle.addEventListener('click', () => {
    if (globalMusic.paused) {
        globalMusic.play();
        isMusicWanted = true;
        musicText.innerText = "Music On";
        // Cambia icona in "Volume Acceso"
        musicIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />';
    } else {
        globalMusic.pause();
        isMusicWanted = false;
        musicText.innerText = "Music Off";
        // Cambia icona in "Volume Spento"
        musicIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path stroke-linecap="round" stroke-linejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />';
    }
});

// Funzione per gestire la musica in base alla posizione
function gestisciMusicaSection7() {
    ScrollTrigger.create({
        trigger: "#section7",
        // Usiamo 'top bottom' e 'bottom top' per essere sicuri di coprire l'intera area
        start: "top bottom", 
        end: "bottom top", 
        onEnter: () => globalMusic.pause(),
        onLeave: () => { if (isMusicWanted) globalMusic.play(); },
        onEnterBack: () => globalMusic.pause(),
        onLeaveBack: () => { if (isMusicWanted) globalMusic.play(); },
        // Rende il calcolo più preciso
        fastScrollEnd: true 
    });
}

// 2. IL TRUCCO RISOLUTIVO: Esegui dopo il caricamento di tutto (immagini, video, ecc.)
window.addEventListener('load', () => {
    // Aspetta un piccolo istante per sicurezza
    setTimeout(() => {
        ScrollTrigger.refresh();
        gestisciMusicaSection7();
    }, 500);
});


//=========================================================================================================================
//=========================================================================================================================




gsap.registerPlugin(ScrollTrigger, SplitText);

const split1 = new SplitText("#section1 h1", {type: "lines, words, chars, letters"});
const split2 = new SplitText("#section1 h2", {type: "lines, words, chars, letters"});
const split3 = new SplitText("#section2 h1", {type: "lines, words, chars, letters"});


gsap.from(split1.chars, {
    scrollTrigger : {       
        trigger: "#section1",
        markers: true,
        pin: true,
        scrub: true,
    }, 
    
    y: -400,
    opacity: 0,
    duration: 5,
    stagger : 0.1,
    ease: "back.out(1)",
    
});


gsap.from(split2.chars, {
    scrollTrigger : {
        trigger: "#section1",
        scrub: true,
    },
    
    y: -10000,
    opacity: 0,
    duration: 5,
    stagger : 0.007,
    ease: "back.out(0.1)",
    
    
});

//    gsap.from("#section2 h1", {
//        scrollTrigger : {
//        trigger: "#section2",
//        toggleActions: "play none none reset",
//       markers: true,
//        pin: true,
//        scrub: true,
//        },


//        y: 500,
//        opacity: 0.01,
//        duration: 5,

//    });


gsap.from(split3.lines, {
    scrollTrigger : {       
        trigger: "#section2",
        markers: true,
        pin: true,
        scrub: true,
    }, 
    
    y: -800,
    opacity: 0,
    duration: 10,
    stagger : 1.5,
    ease: "back.out(0.8)",
    
    
});