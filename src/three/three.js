import * as THREE from "three";

import { CSG } from 'three-csg-ts'; 
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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


        this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 1000);
        this.camera.position.set(0, 0, 5);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);


        const light = new THREE.AmbientLight("white", 2);
        this.scene.add(light);


        window.addEventListener("resize", () => this.handleResize());

        this.createDoor(); 
        this.animate();
    }

    createDoor() {
        const materialFrame = new THREE.MeshBasicMaterial({ color: "black" });
        const materialDoor = new THREE.MeshBasicMaterial({ color: "maroon" });
        const materialGlass = new THREE.MeshBasicMaterial({ color: "lightblue", transparent: true, opacity: 0.4 });

       
        const doorGeometry = new THREE.BoxGeometry(4.8, 4.8, 0.1);
        const door = new THREE.Mesh(doorGeometry, materialDoor);

        
        const glassGeometry = new THREE.BoxGeometry(1, 4, 0.1);
        const glass = new THREE.Mesh(glassGeometry, materialGlass);
        glass.position.x = -1;

        
        door.updateMatrixWorld(true);
        glass.updateMatrixWorld(true);

        
        let doorCSG = CSG.fromMesh(door);
        let glassCSG = CSG.fromMesh(glass);
        let cutDoor = CSG.toMesh(doorCSG.subtract(glassCSG), new THREE.Matrix4(), materialDoor);
        cutDoor.position.copy(door.position); 

        this.scene.add(cutDoor);

       
        const w = 0.1, h = 5;
        function createCube(width, height, position) {
            const geometry = new THREE.BoxGeometry(width, height, 0.1);
            const cube = new THREE.Mesh(geometry, materialFrame);
            cube.position.set(...position);
            cube.updateMatrixWorld(true);
            return cube;
        }

        const cube1 = createCube(w, h, [h / 2, 0, -w / 2]);
        const cube2 = createCube(w, h, [-h / 2, 0, w / 2]);
        const cube3 = createCube(h, w, [w / 2, h / 2, 0]);
        const cube4 = createCube(h, w, [w / 2, -h / 2, 0]);

       
        const cutBoxGeometry = new THREE.BoxGeometry(h * 1.5, w * 1.5, 0.1);
        const cutBox = new THREE.Mesh(cutBoxGeometry, materialFrame);
        cutBox.rotation.set(0, Math.PI / 4, 0);
        cutBox.updateMatrixWorld(true);

      
        const cube1CSG = CSG.fromMesh(cube1);
        const cube2CSG = CSG.fromMesh(cube2);
        const cutBoxCSG = CSG.fromMesh(cutBox);

        const finalCube1 = CSG.toMesh(cube1CSG.subtract(cutBoxCSG), new THREE.Matrix4(), materialFrame);
        const finalCube2 = CSG.toMesh(cube2CSG.subtract(cutBoxCSG), new THREE.Matrix4(), materialFrame);

        this.scene.add(finalCube1);
        this.scene.add(finalCube2);
        this.scene.add(cube3);
        this.scene.add(cube4);
    }


    wall(wallValues) {
console.log('wallValues',wallValues);

        this.wallWidth = wallValues?.width == null ? 5 : wallValues.width;
        this.wallHeight = wallValues?.height == null ? 5 : wallValues.height;

      if (this.currentWall) {
        this.scene.remove(this.currentWall);
        this.currentWall.geometry.dispose();
        this.currentWall.material.dispose();
    }

    const geometry = new THREE.BoxGeometry(this.wallWidth, this.wallHeight);
    const material = new THREE.MeshBasicMaterial({ color: "green" });
    const cube = new THREE.Mesh(geometry, material);
    this.scene.add(cube);

    this.currentWall = cube;
        // const geometry1 = new THREE.BoxGeometry(4,5);
        // const material1 = new THREE.MeshBasicMaterial({ color: "black" }); 
        // const cube1 = new THREE.Mesh(geometry1, material1);
        // this.scene.add(cube1);
        // const geometry2 = new THREE.BoxGeometry(3.8,4.8);
        // const material2 = new THREE.MeshBasicMaterial({ color: "#464D56" }); 
        // const cube2 = new THREE.Mesh(geometry2, material2);
        // this.scene.add(cube2);
        // const geometry3 = new THREE.BoxGeometry(1,4);
        // const material3 = new THREE.MeshBasicMaterial({ color: "blue" ,transparent:true,opacity:0.4}); 
        // const cube3 = new THREE.Mesh(geometry3, material3);
        // cube3.position.x=-1
        // this.scene.add(cube3);
    }
    
    

    handleResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

