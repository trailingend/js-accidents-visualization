import { Scene, 
         PerspectiveCamera,
         WebGLRenderer, 
         TextureLoader,
         REPEAT,
         RepeatWrapping, 
         LinearFilter,
         PlaneGeometry,
         BoxGeometry,
         MeshLambertMaterial,
         ShaderMaterial,
         DirectionalLight,
         Mesh } from "three";

class Ranking {
    constructor() {
        this.canvas = document.querySelector('#canvas');

        this.counter = 0;
        this.settings = {
            width: 1024,
            height: 768,
            speed: 0.02
        }

        this.scene = undefined;
        this.loader = undefined;
        this.renderer = undefined;
        this.camera = undefined;

        this.floorTextures = undefined;
        this.floorMaterial = undefined;
    }

    init(winW, winH) {
        this.settings.width = winW;
        this.settings.height = winH;
        this.update = this.update.bind(this);

        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupLighting();
        this.setupTexture();

        this.drawFloor();
        
        requestAnimationFrame(this.update);
    }

    setupScene() {
        this.scene = new Scene();
    }

    setupCamera() {
        this.camera = new PerspectiveCamera(
                            75, 
                            this.settings.width / this.settings.height, 
                            0.1, 
                            15);
        this.camera.position.x = 0;
        this.camera.position.y = 4;
        this.camera.position.z = 13;
    }
        
    setupRenderer() {
        this.renderer = new WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.setSize(this.settings.width, this.settings.height);
        this.renderer.setClearColor( 0xffffff );
    }

    setupTexture() {
        this.loader = new TextureLoader();
        this.loader.crossOrigin = 'anonymous';

        this.floorTextures = [
            this.loader.load('https://res.cloudinary.com/dbo3jfkpl/image/upload/v1519579527/road-1.png'),
        ];

        this.floorTextures[0].wrapT = RepeatWrapping;
        this.floorTextures[0].minFilter = LinearFilter;
    }

    setupLighting() {
        var light1 = new DirectionalLight(0xffffff,1);
        this.scene.add(light1);
        light1.position.set(1.5,2,1);
        var light1 = new DirectionalLight(0xffffff,.5);
        this.scene.add(light1);
        light1.position.set(-1.5,2,1);
    }

    drawFloor() {
        const floor_G = new PlaneGeometry(20, 200);
        // const floorM = new MeshLambertMaterial({color: 0x204555});
        const floor_M = new ShaderMaterial({
            uniforms: {
                uRoadTexture: {value: this.floorTextures[0]},
                // uReflectionTexture: {value: this._reflectRoad.texture},
                uRepeatY: {value: REPEAT}
            },
            vertexShader: document.getElementById('roadVertexShader').innerHTML,
            fragmentShader: document.getElementById('roadFragmentShader').innerHTML
        });
        const floor = new Mesh(floor_G, floor_M);
        floor.rotation.x = - Math.PI * 0.5;
        

        const items = [];
        for(var i = 0; i < 5; ++i){
            let item_G = new BoxGeometry( 1, 0.1, 1 );
            let item_M = new MeshLambertMaterial({color: 0x59bfea});
            item_M.transparent = true;
            item_M.opacity = 1;
            items[i] = new Mesh( item_G, item_M );
            floor.add( items[i] );

            const x = (i * 2 - 4);
            const y = 0;
            const z = 1
            items[i].position.set(x, y, z);
        }

        this.scene.add(floor);
    }

    update() {
        requestAnimationFrame(this.update);
        this.renderer.render(this.scene, this.camera);

        this.camera.position.z -= this.settings.speed;
        console.log(this.camera.position.z)
        if (this.camera.position.z < 1.0) this.camera.position.z = 13;
    }

    onResize(winW, winH) {
        this.settings.width = winW;
        this.settings.height = winH;

        this.camera.aspect = winW / winH;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(winW, winH);
    }

    obDesktopToMobile() {

    }

    onMobileToDesktop() {

    }
}

export default Ranking;