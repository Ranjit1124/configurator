import * as THREE from "three";
// import { CSG } from 'three-csg-ts'; 
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import TWEEN from 'https://cdn.jsdelivr.net/npm/@tweenjs/tween.js@18.6.4/dist/tween.esm.js'
// import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";


export default class Configurator {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.rectangleValue=null;
        this.wallValues=null;
        this.transformControls
        this.mouse,this.raycaster
        this.raycasterObject=[]
        this.DoorObjects=[]


        this.init();
    }

    init() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color("#E5E4E2");


        this.renderer = new THREE.WebGLRenderer({
            antialias: true,       
            preserveDrawingBuffer: true 
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
                this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 1000);
        this.camera.position.set(0, 0, 5);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        const sunLight = new THREE.DirectionalLight('white', 1);
        sunLight.position.set(5, 5, 10);
        sunLight.castShadow = true; 
        this.scene.add(sunLight);

        const light = new THREE.AmbientLight("white", 5);
        this.scene.add(light);
        
        window.addEventListener("resize", () => this.handleResize());

        this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
        this.scene.add(this.transformControls);
        window.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'KeyG':
                    this.transformControls.setMode('translate');
                    break;
                case 'KeyR':
                    this.transformControls.setMode('rotate');
                    break;
                case 'KeyS':
                    this.transformControls.setMode('scale');
                    break;
            }
        });
        this.renderer.domElement.addEventListener("click", (event) => {
          this.addTransformControlToGlobalArray(event);
        });
               
        this.animate();
    }

   
    addTransformControlToGlobalArray(event) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        let mouse = new THREE.Vector2();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        this.raycaster = new THREE.Raycaster();
        this.raycaster.setFromCamera(mouse, this.camera);
    
        const intersects = this.raycaster.intersectObjects(this.DoorObjects, true);
      
        if (intersects.length > 0) {
            let intersectedObject = intersects[0].object;
            this.transformControls.detach();
            this.transformControls.attach(intersectedObject);
            let giz=this.transformControls.getHelper()
            this.scene.add(giz)
            this.controls.enabled = false;

            this.transformControls.addEventListener('objectChange', () => {
                intersectedObject.position.z = 0; 
                this.restrictDoorMovement(intersectedObject);
            });
    
        } else {
            this.transformControls.detach();
            this.controls.enabled = true;
        }
    }
    
    restrictDoorMovement(door) {
        if (!this.wallValues) return;
    
        let halfWallWidth = this.wallValues.width / 2;
        let halfWallHeight = this.wallValues.height / 2;
        
        let doorHalfWidth = door.geometry.parameters.width / 2;
        let doorHalfHeight = door.geometry.parameters.height / 2;

        door.position.x = THREE.MathUtils.clamp(door.position.x, -halfWallWidth + doorHalfWidth, halfWallWidth - doorHalfWidth);
        door.position.y = THREE.MathUtils.clamp(door.position.y, -halfWallHeight + doorHalfHeight, halfWallHeight - doorHalfHeight);
    }
    
 
    wall(wallValues) {
        this.wallValues=wallValues
        this.wallWidth = wallValues?.width ?? 0;
        this.wallHeight = wallValues?.height ?? 0;
    
      
    
        const geometry = new THREE.BoxGeometry(this.wallWidth, this.wallHeight, 0.1);
        const material = new THREE.MeshBasicMaterial({ color: "#82807C" });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
        this.raycasterObject.push(cube)
        // this.currentWall = cube;
    
        // if (this.currentWall) {
        //     this.cutWallWithFrame(this.currentWall);
        // }
    }
    Door(rectangleValue) {
        this.rectangleValue=rectangleValue;
        this.wallWidth1 = rectangleValue?.width ?? 0;
        this.wallHeight1 = rectangleValue?.height ?? 0;
    
      
    
        const geometry = new THREE.BoxGeometry(this.wallWidth1, this.wallHeight1, 0.1);
        const material = new THREE.MeshBasicMaterial({ color: "maroon" });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
        this.DoorObjects.push(cube)
     
    }

    handleResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        // this.composer.render();
        this.render();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

}