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
        this.currentWall = null;
        this.currentDoor = null;
        this.currentFrame = null;
        this.currentGlass = null;
        this.w = 0.1, this.h = 6;


        this.currentDoor = null;
        this.raycaster = new THREE.Raycaster(); // Add Raycaster
        this.mouse = new THREE.Vector2(); // Store mouse position
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
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.5,
            1000
        );

        this.directionalLight = new THREE.DirectionalLight("white", 1);
        this.directionalLight.castShadow = true;
        this.directionalLight.shadow.mapSize.width = 1024;
        this.directionalLight.shadow.mapSize.height = 1024;
        this.directionalLight.position.set(2,5,10)
        this.scene.add(this.directionalLight);

        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));
        
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        this.composer.addPass(bloomPass);

        const light = new THREE.AmbientLight("white", 5);
        this.scene.add(light);

        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.camera.position.set(0, 0, 5);

        window.addEventListener("resize", () => this.handleResize());

        window.addEventListener("mousemove", (e) => this.objectType(e)); // Detect mouse hover
this.wall()
        this.assembleDoorWithFrame();
        this.animate();
    }

    createWall(wallValues) {
        console.log('wallValues', wallValues);

        this.wallWidth = wallValues?.width ?? 5;
        this.wallHeight = wallValues?.height ?? 5;

        if (this.currentWall) {
            this.scene.remove(this.currentWall);
            this.currentWall.geometry.dispose();
            this.currentWall.material.dispose();
        }

        const geometry = new THREE.BoxGeometry(this.wallWidth, this.wallHeight);
        const material = new THREE.MeshBasicMaterial({ color: "green" });
        const wall = new THREE.Mesh(geometry, material);

        this.scene.add(wall);
        this.currentWall = wall;
    }

   
    createFrame(width, height, position, material) {
        const geometry = new THREE.BoxGeometry(width, height, 0.15);
        const frame = new THREE.Mesh(geometry, material);
        frame.position.set(...position);
        frame.updateMatrixWorld(true);
        return frame;
    }

    
    createDoor() {
        const materialDoor = new THREE.MeshBasicMaterial({ color: "maroon" });

        if (this.currentDoor) {
            this.scene.remove(this.currentDoor);
            this.currentDoor.geometry.dispose();
            this.currentDoor.material.dispose();
        }

        const doorGeometry = new THREE.BoxGeometry(this.h,this.h, 0.1);
        const door = new THREE.Mesh(doorGeometry, materialDoor);

        this.scene.add(door);
        this.currentDoor = door;

        return door;
    }

  
    createGlass() {
        const materialGlass = new THREE.MeshBasicMaterial({ color: "lightblue", transparent: true, opacity: 0.4 });

        if (this.currentGlass) {
            this.scene.remove(this.currentGlass);
            this.currentGlass.geometry.dispose();
            this.currentGlass.material.dispose();
        }

        const glassGeometry = new THREE.BoxGeometry(1, 4, 0.1);
        const glass = new THREE.Mesh(glassGeometry, materialGlass);
        glass.position.x = -1;

        this.scene.add(glass);
        this.currentGlass = glass;

        return glass;
    }

    assembleDoorWithFrame() {
       
        const materialFrame = new THREE.MeshBasicMaterial({ color: "black" });
    
        const door = this.createDoor();
        const glass = this.createGlass();
        this.wall();
    
        const cube1 = this.createFrame(this.w, this.h, [-this.h / 2, 0, this.w / 2], materialFrame);
        const cube2 = this.createFrame(this.w, this.h, [this.h / 2, 0, this.w / 2], materialFrame);
        const cube3 = this.createFrame(this.h, this.w, [0, this.h / 2, this.w / 2], materialFrame);
        const cube4 = this.createFrame(this.h, this.w, [0, -this.h / 2, this.w / 2], materialFrame);
    
        this.scene.add(cube1, cube2, cube3,cube4);
    
        door.updateMatrixWorld(true);
        glass.updateMatrixWorld(true);
    
        let doorCSG = CSG.fromMesh(door);
        let glassCSG = CSG.fromMesh(glass);

        let cutDoor = CSG.toMesh(doorCSG.subtract(glassCSG), new THREE.Matrix4(), door.material);
        cutDoor.position.copy(door.position);
    
        this.scene.remove(door, glass);
        this.scene.add(cutDoor);
        this.currentDoor = cutDoor;
        const texture = new THREE.TextureLoader().load( "./glass_tex4.jpeg" );
        const materialGlass = new THREE.MeshBasicMaterial({ 
            map: texture, 
            // transparent: true, 
            // opacity: 0.5,
            // depthWrite: false 
        });
        const newGlass = new THREE.Mesh(glass.geometry, materialGlass);
        newGlass.position.copy(glass.position);
        this.scene.add(newGlass);
        this.currentGlass = newGlass;
    }
    cutWallWithFrame(frameParts) {
        const cuttingMesh = new THREE.Mesh(
            new THREE.BoxGeometry( this.h ,this.h), 
            new THREE.MeshStandardMaterial({ color: "blue"})
          );
          cuttingMesh.position.copy(this.currentDoor.position)
        const result = CSG.subtract(this.currentWall, cuttingMesh);

    if (result) {
        this.currentWall.geometry.dispose();
        this.currentWall.geometry = result.geometry.clone();
        this.currentWall.geometry.computeBoundingBox();
    } 
    }
    
    wall(wallValues) {
        this.wallWidth = wallValues?.width ?? 5;
        this.wallHeight = wallValues?.height ?? 5;
    
        if (this.currentWall) {
            
            this.scene.remove(this.currentWall);
            this.currentWall.geometry.dispose();
            this.currentWall.material.dispose();
        }
    
        const geometry = new THREE.BoxGeometry(this.wallWidth, this.wallHeight, 0.1);
        const material = new THREE.MeshBasicMaterial({ color: "green" });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
        this.currentWall = cube;
    
        if (this.currentWall) {
            this.cutWallWithFrame(this.currentWall);
        }
    }
  
    
        
    
   

    handleResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.composer.render();
        // this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

}
