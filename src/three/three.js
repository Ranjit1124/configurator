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
        this.angle = null;
        this.currentWall = null;
        this.currentDoor = null;
        this.currentFrame = null;
        this.currentGlass = null;
        this.w = 0.1, this.h = 6;
        this.transformControls
        this.mouse,this.raycaster
        this.raycasterObject=[]


        this.init();
    }

    init() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color("#E5E4E2");


        this.renderer = new THREE.WebGLRenderer({
            antialias: true,          // Smooth edges
            preserveDrawingBuffer: true // Keep buffer for screenshots
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
                this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 1000);
        this.camera.position.set(0, 0, 5);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        const sunLight = new THREE.DirectionalLight('white', 1);
        sunLight.position.set(5, 5, 10);
        sunLight.castShadow = true;  // Enable shadows
        this.scene.add(sunLight);

        const light = new THREE.AmbientLight("white", 5);
        this.scene.add(light);

        // this.composer = new EffectComposer(this.renderer);
        // this.composer.addPass(new RenderPass(this.scene, this.camera));
        
        // const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.8, 0.4, 0.85);
        // this.composer.addPass(bloomPass);
        
        window.addEventListener("resize", () => this.handleResize());

        // this.assembleDoorWithFrame()
        this.wall()

        this.transformControls = new TransformControls(this.camera, this.renderer.domElement);
        this.scene.add(this.transformControls);
      
        this.renderer.domElement.addEventListener("click", (event) => {
          this.addTransformControlToGlobalArray(event);
        });
        this.transformControls.addEventListener("objectChange", () => {
            const draggedObject = this.transformControls.object;
            console.log(draggedObject);
            
        })        
        this.animate();
    }

   

addTransformControlToGlobalArray(event) {
    console.log("ddesf");
    
    const rect = this.renderer.domElement.getBoundingClientRect();
  let mouse=new THREE.Vector2()
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    console.log("d");
    
    this.raycaster=new THREE.Raycaster()
    this.raycaster.setFromCamera(mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(this.raycasterObject, true);
  
    if (intersects.length > 0) {
      let intersectedObject = intersects[0].object;
      this.transformControls.detach();
      this.transformControls.attach(intersectedObject);
      let giz=this.transformControls.getHelper()
      this.scene.add(giz)
      this.controls.enabled=false
  
    } else {
      this.transformControls.detach();
      this.controls.enabled=true
    }
   
  }
 
    wall(wallValues) {
        this.wallWidth = wallValues?.width ?? 0;
        this.wallHeight = wallValues?.height ?? 0;
    
        const geometry = new THREE.BoxGeometry(this.wallWidth, this.wallHeight, 0.5);
        const material = new THREE.MeshBasicMaterial({ color: "#82807C" });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);
        this.raycasterObject.push(cube)
        // this.currentWall = cube;
    
        // if (this.currentWall) {
        //     this.cutWallWithFrame(this.currentWall);
        // }
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