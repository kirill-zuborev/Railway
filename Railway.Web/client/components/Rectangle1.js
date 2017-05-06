import { Scene, Camera, RequestAnimationFrame, PrimitiveCubePrefab, ColorUtils, Sampler2D, PrimitivePlanePrefab, View, HoverController, ElementsType, DefaultMaterialManager, MethodMaterial, DirectionalLight, Vector3D, StaticLightPicker } from 'awayjs-full';
class rect {
    constructor() {
        this.move = false;
        let scene = new Scene(), camera = new Camera();
        this.view = new View();
        this.view.camera = camera;
        this.view.scene = scene;
        this.cameraController = new HoverController(camera, null, 0, 0, 600, -90, 90);
        this.cameraController.distance = 1000;
        this.cameraController.minTiltAngle = 0;
        this.cameraController.maxTiltAngle = 90;
        this.cameraController.panAngle = 45;
        this.cameraController.tiltAngle = 20;
        this.view.backgroundColor = ColorUtils.ARGBtoFloat32(100, 255, 255, 0);
        this.light1 = new DirectionalLight();
        this.light1.direction = new Vector3D(0, -1, 0);
        this.light1.ambient = 0.1;
        this.light1.diffuse = 0.7;
        scene.addChild(this.light1);
        let light2 = new DirectionalLight();
        light2.direction = new Vector3D(0, -1, 0);
        light2.color = 0x00FFFF;
        light2.ambient = 0.1;
        light2.diffuse = 0.7;
        scene.addChild(light2);
        let lightPicker = new StaticLightPicker([this.light1, light2]);
        let sphereMaterial = new MethodMaterial(0);
        sphereMaterial.lightPicker = lightPicker;
        let planeMaterial = new MethodMaterial(DefaultMaterialManager.getDefaultImage2D());
        planeMaterial.lightPicker = lightPicker;
        planeMaterial.style.sampler = new Sampler2D(true, true, true);
        let plane = new PrimitivePlanePrefab(planeMaterial, ElementsType.TRIANGLE, 1000, 1000).getNewObject();
        plane.graphics.scaleUV(2, 2);
        plane.y = 0;
        let sphere = new PrimitiveCubePrefab(sphereMaterial, ElementsType.TRIANGLE, 150, 40, 20).getNewObject();
        sphere.x = 300;
        sphere.y = 160;
        sphere.z = 300;
        scene.addChild(sphere);
        scene.addChild(plane);
        window.onresize = (event) => this.onResize();
        document.onmousedown = (event) => this.onMouseDown(event);
        document.onmouseup = (event) => this.onMouseUp(event);
        document.onmousemove = (event) => this.onMouseMove(event);
        document.onmousewheel = (event) => this.onMouseWheel(event);
        this.onResize();
        let timer = new RequestAnimationFrame(this.onEnterFrame, this);
        timer.start();
    }
    onMouseDown(event) {
        this.lastPanAngle = this.cameraController.panAngle;
        this.lastTiltAngle = this.cameraController.tiltAngle;
        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;
        this.move = true;
    }
    onMouseUp(event) {
        this.move = false;
    }
    onMouseMove(event) {
        if (this.move) {
            this.cameraController.panAngle = 0.3 * (event.clientX - this.lastMouseX) + this.lastPanAngle;
            this.cameraController.tiltAngle = 0.3 * (event.clientY - this.lastMouseY) + this.lastTiltAngle;
        }
    }
    onMouseWheel(event) {
        this.cameraController.distance -= event.wheelDelta;
        if (this.cameraController.distance < 100)
            this.cameraController.distance = 100;
        else if (this.cameraController.distance > 2000)
            this.cameraController.distance = 2000;
    }
    onEnterFrame(dt) {
        this.time += dt;
        this.light1.direction = new Vector3D(Math.sin(this.time / 10000) * 150000, -1000, Math.cos(this.time / 10000) * 150000);
        this.view.render();
    }
    onResize() {
        this.view.y = 100;
        this.view.x = 0;
        this.view.width = window.innerWidth;
        this.view.height = window.innerHeight - 200;
    }
}
export const Rectangle = () => {
    new rect();
};
//# sourceMappingURL=Rectangle1.js.map