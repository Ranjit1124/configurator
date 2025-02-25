import * as THREE from "three";
import { CSG } from 'three-csg-ts';
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.6.4/dist/tween.esm.js'
import store from "@/store";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";


export default class Configurator {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.angle = null;
        this.currentDoor = null;
        this.raycaster = new THREE.Raycaster(); // Add Raycaster
        this.mouse = new THREE.Vector2(); // Store mouse position
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

        this.camera.position.set(0, 0, 5);

        window.addEventListener("resize", () => this.handleResize());
        window.addEventListener("mousemove", (e) => this.objectType(e)); // Detect mouse hover
this.wall()
        this.assembleDoorWithFrame();
        this.animate();
    }

    wall(wallValues) {
        console.log('wallValues', wallValues);
        this.wallWidth = wallValues?.width == null ? 0 : wallValues.width;
        this.wallHeight = wallValues?.height == null ? 0 : wallValues.height;

        if (this.currentWall) {
            this.scene.remove(this.currentWall);
            this.currentWall.geometry.dispose();
            this.currentWall.material.dispose();
        }

        const geometry = new THREE.BoxGeometry(this.wallWidth, this.wallHeight);
        const material = new THREE.MeshBasicMaterial({ color: "#E6E6E9" });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.z=-1
        cube.name='Wall'
        this.scene.add(cube);

        this.currentWall = cube;
    }
    createFrame(width, height, position, material) {
        const geometry = new THREE.BoxGeometry(width, height, 0.15);
        const frame = new THREE.Mesh(geometry, material);
        frame.position.set(...position);
        frame.updateMatrixWorld(true);
        return frame;
    }

    
    createDoor() {
        // const materialDoor = new THREE.MeshBasicMaterial({ color: "maroon" });
        const materialDoor = new THREE.MeshStandardMaterial({
            color: '#82807C',
            metalness: 0.9,  // Defines how metallic the object is (0 = non-metal, 1 = metal)
            roughness: 0.4,  // Defines surface smoothness (0 = mirror-like, 1 = rough)
        });
        if (this.currentDoor) {
            this.scene.remove(this.currentDoor);
            this.currentDoor.geometry.dispose();
            this.currentDoor.material.dispose();
        }

        const doorGeometry = new THREE.BoxGeometry(4, 4.8, 0.1);
        const door = new THREE.Mesh(doorGeometry, materialDoor);
         door.name="Door"
        this.scene.add(door);
        this.currentDoor = door;

        return door;
    }

  
    createGlass() {
        const materialGlass = new THREE.MeshStandardMaterial({ color: "lightblue", transparent: true, opacity: 0.5 });

        if (this.currentGlass) {
            this.scene.remove(this.currentGlass);
            this.currentGlass.geometry.dispose();
            this.currentGlass.material.dispose();
        }

        const glassGeometry = new THREE.BoxGeometry(1, 4, 0.1);
        const glass = new THREE.Mesh(glassGeometry, materialGlass);
        glass.position.x = 1;
        glass.name="Glass"

        this.scene.add(glass);
        this.currentGlass = glass;

        return glass;
    }

    assembleDoorWithFrame() {
        const door = this.createDoor();
        const glass = this.createGlass();
    
        door.updateMatrixWorld(true);
        glass.updateMatrixWorld(true);
    
        let doorCSG = CSG.fromMesh(door);
        let glassCSG = CSG.fromMesh(glass);
    
        let cutDoor = CSG.toMesh(doorCSG.subtract(glassCSG), new THREE.Matrix4(), door.material);
        cutDoor.position.copy(door.position);
        cutDoor.name = "Door";  // ✅ Fix: Reassign the name
    
        this.scene.remove(door);
        this.scene.remove(glass);
    
        this.scene.add(cutDoor);
        this.currentDoor = cutDoor;
        const texture = new THREE.TextureLoader().load( "./glass.jpg" );
        const materialGlass = new THREE.MeshBasicMaterial({ 
            map: texture, 
            transparent: true, 
            opacity: 0.3,
            depthWrite: false // ✅ Fix: Ensures raycaster detects glass
        });
        
       
        const newGlass = new THREE.Mesh(glass.geometry, materialGlass);
        newGlass.position.copy(glass.position);
        newGlass.name = "Glass";  // ✅ Fix: Assign name again
    
        this.scene.add(newGlass);
        this.currentGlass = newGlass;
    }
    
    objectType(event) {
        const rect = this.renderer.domElement.getBoundingClientRect(); 
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
        this.raycaster.setFromCamera(this.mouse, this.camera);
    
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
    
        let tooltip = document.getElementById("tooltip");
        if (!tooltip) {
            tooltip = document.createElement("div");
            tooltip.id = "tooltip";
            tooltip.style.position = "absolute";
            tooltip.style.background = "black";
            tooltip.style.color = "white";
            tooltip.style.padding = "5px 10px";
            tooltip.style.borderRadius = "5px";
            tooltip.style.fontSize = "14px";
            tooltip.style.pointerEvents = "none"; // Prevents tooltip from interfering with mouse events
            tooltip.style.display = "none";
            tooltip.style.transition = "top 0.1s ease-out, left 0.1s ease-out"; // Smooth movement
            document.body.appendChild(tooltip);
        }
    
        if (intersects.length > 0) {
            const hoveredObject = intersects[0].object;
            const intersectionPoint = intersects[0].point; // Exact 3D intersection point
    
            console.log("Hovered Object:", hoveredObject, "Intersection Point:", intersectionPoint);
    
            store.commit("tooltip", hoveredObject.name);
    
            if (hoveredObject.name) {
                tooltip.textContent = hoveredObject.name;
            
                // Update tooltip position relative to the cursor
                requestAnimationFrame(() => {
                    tooltip.style.left = event.clientX + 15 + "px"; // Offset for better visibility
                    tooltip.style.top = event.clientY + 15 + "px";
                    tooltip.style.display = "block";
                });
            }
            
        } else {
            tooltip.style.display = "none";
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
