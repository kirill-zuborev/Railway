import { Scene, Camera, RequestAnimationFrame, PrimitiveCubePrefab, ColorUtils, View, HoverController, ElementsType, MethodMaterial, DirectionalLight, Vector3D, StaticLightPicker } from 'awayjs-full';
class rect {
    constructor() {
        this.move = false;
        let scene = new Scene(), camera = new Camera();
        this.view = new View();
        this.view.camera = camera;
        this.view.scene = scene;
        this.cameraController = new HoverController(camera, null, 0, 0, 1500, -90, 90);
        this.cameraController.minTiltAngle = 0;
        this.cameraController.maxTiltAngle = 90;
        this.cameraController.tiltAngle = 20;
        this.view.backgroundColor = ColorUtils.ARGBtoFloat32(0, 211, 211, 211);
        console.log(ColorUtils.ARGBtoFloat32(0, 211, 211, 211));
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
        this.RenderContainer(1200, 600, 600, scene);
        let sphereMaterial2 = new MethodMaterial(0xFF0000, 0.3);
        sphereMaterial2.bothSides = true;
        for (var i = 0; i < 1; i++) {
            let sphere = new PrimitiveCubePrefab(sphereMaterial2, ElementsType.TRIANGLE, 1200, 600, 600).getNewObject();
            sphere.x = 0;
            sphere.y = 300;
            sphere.z = 0;
            scene.addChild(sphere);
        }
        window.onresize = (event) => this.onResize();
        document.onmousedown = (event) => this.onMouseDown(event);
        document.onmouseup = (event) => this.onMouseUp(event);
        document.onmousemove = (event) => this.onMouseMove(event);
        document.onmousewheel = (event) => this.onMouseWheel(event);
        this.onResize();
        let timer = new RequestAnimationFrame(this.onEnterFrame, this);
        timer.start();
    }
    RenderContainer(l, w, h, scene) {
        const width = 20;
        let containerMaterial = new MethodMaterial(0x00FF00, 0.9);
        containerMaterial.bothSides = true;
        scene.addChild(this.RenderContainerLine(containerMaterial, width, h, 0, l / 2 - width / 2, h / 2, -w / 2));
        scene.addChild(this.RenderContainerLine(containerMaterial, width, h, 0, -(l / 2 - width / 2), h / 2, -w / 2));
        scene.addChild(this.RenderContainerLine(containerMaterial, width, h, 0, l / 2 - width / 2, h / 2, w / 2));
        scene.addChild(this.RenderContainerLine(containerMaterial, width, h, 0, -(l / 2 - width / 2), h / 2, w / 2));
        scene.addChild(this.RenderContainerLine(containerMaterial, 0, h, width, -l / 2, h / 2, w / 2 - width / 2));
        scene.addChild(this.RenderContainerLine(containerMaterial, 0, h, width, l / 2, h / 2, w / 2 - width / 2));
        scene.addChild(this.RenderContainerLine(containerMaterial, 0, h, width, -l / 2, h / 2, -(w / 2 - width / 2)));
        scene.addChild(this.RenderContainerLine(containerMaterial, 0, h, width, l / 2, h / 2, -(w / 2 - width / 2)));
        scene.addChild(this.RenderContainerLine(containerMaterial, width, 0, w, -(l / 2 - width / 2), h, 0));
        scene.addChild(this.RenderContainerLine(containerMaterial, width, 0, w, -(l / 2 - width / 2), 0, 0));
        scene.addChild(this.RenderContainerLine(containerMaterial, width, 0, w, l / 2 - width / 2, h, 0));
        scene.addChild(this.RenderContainerLine(containerMaterial, width, 0, w, l / 2 - width / 2, 0, 0));
        scene.addChild(this.RenderContainerLine(containerMaterial, l, 0, width, 0, h, -(w / 2 - width / 2)));
        scene.addChild(this.RenderContainerLine(containerMaterial, l, 0, width, 0, 0, -(w / 2 - width / 2)));
        scene.addChild(this.RenderContainerLine(containerMaterial, l, 0, width, 0, h, w / 2 - width / 2));
        scene.addChild(this.RenderContainerLine(containerMaterial, l, 0, width, 0, 0, w / 2 - width / 2));
        scene.addChild(this.RenderContainerLine(containerMaterial, l, 0, width, 0, h, -(w / 2 - width / 2)));
        scene.addChild(this.RenderContainerLine(containerMaterial, l, 0, width, 0, 0, -(w / 2 - width / 2)));
        scene.addChild(this.RenderContainerLine(containerMaterial, l, 0, width, 0, h, w / 2 - width / 2));
        scene.addChild(this.RenderContainerLine(containerMaterial, l, 0, width, 0, 0, w / 2 - width / 2));
        scene.addChild(this.RenderContainerLine(containerMaterial, 0, width, w, l / 2, h - width / 2, 0));
        scene.addChild(this.RenderContainerLine(containerMaterial, 0, width, w, l / 2, width / 2, 0));
        scene.addChild(this.RenderContainerLine(containerMaterial, 0, width, w, -l / 2, h - width / 2, 0));
        scene.addChild(this.RenderContainerLine(containerMaterial, 0, width, w, -l / 2, width / 2, 0));
        scene.addChild(this.RenderContainerLine(containerMaterial, l, width, 0, 0, h - width / 2, w / 2));
        scene.addChild(this.RenderContainerLine(containerMaterial, l, width, 0, 0, width / 2, w / 2));
        scene.addChild(this.RenderContainerLine(containerMaterial, l, width, 0, 0, h - width / 2, -w / 2));
        scene.addChild(this.RenderContainerLine(containerMaterial, l, width, 0, 0, width / 2, -w / 2));
    }
    RenderContainerLine(material, width, height, depth, x, y, z) {
        let line = new PrimitiveCubePrefab(material, ElementsType.TRIANGLE, width, height, depth).getNewObject();
        line.x = x;
        line.y = y;
        line.z = z;
        return line;
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
        this.view.y = 0;
        this.view.x = 0;
        this.view.width = 0.75 * window.innerWidth;
        this.view.height = window.innerHeight;
    }
}
export const Rectangle = () => {
    new rect();
};
//# sourceMappingURL=Rectangle1.js.map