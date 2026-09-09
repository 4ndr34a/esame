import * as THREE from 'three';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';

// 2. Setup Base
const container = document.getElementById('canvas-sec2');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 30;

//registra posizione mouse
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

//aggiungo le mesh
const CUBO_GRANDE = new THREE.BoxGeometry( 10, 10, 10); 
const CUBO_PICCOLO = new THREE.BoxGeometry(2,2, 2);

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

// Le facce trasparenti
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
const cuboSection2 = new THREE.Mesh(CUBO_GRANDE, materialeFacce);
cuboSection2.position.x = 10; 
cuboSection2.position.y = 1;
scene.add(cuboSection2);

const cuboSection2_2 = new THREE.Mesh(CUBO_PICCOLO, materialeFacce);
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
const edges = new THREE.EdgesGeometry(CUBO_GRANDE);
const bordiGeometriaAvanzata = new LineSegmentsGeometry().fromEdgesGeometry(edges);
const materialeBordi = new LineMaterial({ 
    color: 0xA1A1A1,
    opacity: 0.6,
    linewidth: 3, // SPESSORE LINEE
    resolution: new THREE.Vector2(container.clientWidth, container.clientHeight) 
});
const lineeBordi = new LineSegments2(bordiGeometriaAvanzata, materialeBordi);

//bordi spessi cubo piccolo
const edges1 = new THREE.EdgesGeometry(CUBO_PICCOLO);
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