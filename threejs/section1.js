import * as THREE from 'three';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';





// Setup Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.4, 1000);
camera.position.z = 90;



//registra posizione mouse
const mouse = new THREE.Vector2();
const targetMouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// creazione mesh
const geometry = new THREE.TorusKnotGeometry( 10, 2, 100, 10 );
const geometry1 = new THREE.SphereGeometry(5, 100, 100);
const geometry2 = new THREE.BoxGeometry( 30, 10, 3);
const geometry3 = new THREE.ConeGeometry( 5, 20, 32 );
const geometry4 = new THREE.BoxGeometry( 7, 7, 7);
const geometry5= new THREE.BoxGeometry( 5,5,5);

// ==========================================STELLA===============================================================
// La stella con i bordi curvi
const stella = (() => {
    const forma = new THREE.Shape(); 
    // misure stella
    const punta = 5;    
    const curva = 1.5; 
    // Disegno vettoriale della stella
    forma.moveTo(0, punta); // Partiamo dalla punta in alto
    // Curviamo verso destra, poi in basso, poi a sinistra, poi torniamo in alto
    forma.quadraticCurveTo(curva, curva, punta, 0);   
    forma.quadraticCurveTo(curva, -curva, 0, -punta); 
    forma.quadraticCurveTo(-curva, -curva, -punta, 0); 
    forma.quadraticCurveTo(-curva, curva, 0, punta);   
    // Trasformiamo il disegno 2D in un oggetto 3D (estrusione)
    return new THREE.ExtrudeGeometry(forma, {
        depth: 1,             // Spessore 3D
        bevelEnabled: true,   // Bordo morbido per catturare meglio la luce
        bevelThickness: 0.1,
        bevelSize: 0.01,
        bevelSegments: 1
    });
})();
// ===========================================STELLA==============================================================

const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 1,
    roughness: 0.3 ,
    transparent: true,
    opacity: 1
    
});       

const material2 = new THREE.MeshStandardMaterial({
    color: 0x111111,      // Fucsia puro e vibrante
    metalness: 1,         // Metallo totale (100%)
    roughness: 0.2,       // Superficie quasi a specchio (molto lucida)
    
    // Parametri opzionali per un effetto "Cromo" avanzato (se hai luci nella scena)
    envMapIntensity: 1.5, // Aumenta l'intensità delle riflessioni ambientali
});


//CONFERMA AGGIUNTA DI OGGETTI 3D ALLA SCENA
const nodo = new THREE.Mesh(geometry, material);
scene.add(nodo);

const sfera = new THREE.Mesh(geometry1, material2);
scene.add(sfera);

const rettangolo = new THREE.Mesh(geometry2, material);
scene.add(rettangolo);

const cono      = new THREE.Mesh(geometry3, material);
scene.add(cono);                 

const cubo      = new THREE.Mesh(geometry4, material);
scene.add(cubo);    

const cubo1    = new THREE.Mesh(geometry5, material);
scene.add(cubo1)

const star =new THREE.Mesh(stella, material)
scene.add(star)


// Luci

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(50, 100, 0);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xff0000, 100, 100); // Colore, intensità, distanza massima
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const pointlight2 = new THREE.PointLight(0xff0000, 100, 100);
pointlight2.position.set(0, -100, 0);      
scene.add(pointlight2);

// Posizioni iniziali degli oggetti

cubo.position.x = -60;
cubo.position.y = 20;

nodo.position.x = 0;
nodo.position.y = 0;

sfera.position.x = -60;
sfera.position.y = 30;  

rettangolo.position.x = 35;
rettangolo.position.y = -20;
rettangolo.position.z = 20;

cono.position.x = 60;
cono.position.y = 25;

cubo1.position.x= -60
cubo1.position.y= 20

star.position.x= -60
star.position.y= -20

//ANIMAZIONI


//==========================CUBO SEGUE IL MOUSE====================================================================================

function animate() {
    requestAnimationFrame(animate);
    
    // 1. Calcoliamo la posizione target (moltiplichiamo per 50 per coprire l'area visibile)
    const targetX = mouse.x * 60;
    const targetY = mouse.y * 35;
    
    // 2. Muoviamo il cubo verso il target con un po' di ritardo (0.05 è la morbidezza)
    cubo.position.x += (targetX - cubo.position.x) * 0.1;
    cubo.position.y += (targetY - cubo.position.y) * 0.1;
    
    
    // 3. Facciamolo anche ruotare un po' mentre si muove
    cubo.rotation.x += 0.01;
    cubo.rotation.y += 0.01;
    
    // ALTRE ANIMAZIONI
    nodo.rotation.x += 0.01;
    nodo.rotation.x += 0.01;
    nodo.rotation.y += 0.01;
    
    rettangolo.rotation.y += 0.01;
    rettangolo.rotation.x += 0.04;
    
    sfera.position.x += 0.3; 
    sfera.position.y = Math.sin(Date.now() * 0.0015) * 20;
    sfera.position.x -= 0.55;    
    sfera.position.z += 0.2
    sfera.position.x += 0.55
    if (sfera.position.z > 70) {
        sfera.position.z = -10; 
        sfera.position.x = -95;
    }
    
    cono.rotation.x += 0.01;
    cono.rotation.y += 0.01;
    cono.position.z -= 0.12;
    
    
    cubo.rotation.x += 0.01;
    cubo.rotation.y += 0.01;
    
    cubo1.rotation.z +=0.015;
    cubo1.rotation.y +=0.02;
    
    star.rotation.x +=0.05;
    star.rotation.y +=0.05;
    
    renderer.render(scene, camera);
}
animate();