import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.6.4/dist/tween.esm.js'

export default class Configurator {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.angle = null;
        this.currentDoor = null; // Track the door in the scene
        this.init();
    }

    init() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color("#E5E4E2");

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            preserveDrawingBuffer: true,
        });
        this.renderer.physicallyCorrectLights = true;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        );
        this.container.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.5,
            1000
        );

        // Lighting
        this.directionalLight = new THREE.DirectionalLight("white", 3);
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.mapSize.width = 1024;
        this.directionalLight.shadow.mapSize.height = 1024;
        this.scene.add(this.directionalLight);

        this.angle = 0;

        const light = new THREE.AmbientLight("white", 2);
        this.scene.add(light);

        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.camera.position.set(0, 0, 5);

        window.addEventListener("resize", () => this.handleResize());
        
        this.door(); 
        this.animate();
    }

    door() {
        const geometry = new THREE.BoxGeometry(13,6);
        const material = new THREE.MeshBasicMaterial({ color: "#EEEEEE" }); 
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
        const geometry1 = new THREE.BoxGeometry(4,5);
        const material1 = new THREE.MeshBasicMaterial({ color: "black" }); 
        const cube1 = new THREE.Mesh(geometry1, material1);
        this.scene.add(cube1);
        const geometry2 = new THREE.BoxGeometry(3.8,4.8);
        const material2 = new THREE.MeshBasicMaterial({ color: "#464D56" }); 
        const cube2 = new THREE.Mesh(geometry2, material2);
        this.scene.add(cube2);
        const geometry3 = new THREE.BoxGeometry(1,4);
        const material3 = new THREE.MeshBasicMaterial({ color: "blue" ,transparent:true,opacity:0.4}); 
        const cube3 = new THREE.Mesh(geometry3, material3);
        cube3.position.x=-1
        this.scene.add(cube3);
    }
    
    

    handleResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        // this.controls.update();
        // TWEEN.update();

        this.angle += 0.01; // Speed of rotation
        const radius = 5; // Distance from center
        this.directionalLight.position.x = Math.cos(this.angle) * radius;
        this.directionalLight.position.z = Math.sin(this.angle) * radius;
        this.directionalLight.position.y = 2; // Keep height constant

        this.directionalLight.target.updateMatrixWorld(); // Update light direction

        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}