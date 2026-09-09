import * as THREE from 'three';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';

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
}

// 4. creazione delle mesh
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
// 6. ANIMAZIONI
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