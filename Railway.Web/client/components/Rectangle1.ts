import { Scene, Camera, RequestAnimationFrame, PrimitiveCubePrefab, ColorUtils, Sampler2D, PrimitivePlanePrefab, View, HoverController, Sprite, PrimitiveSpherePrefab, ElementsType, DefaultMaterialManager, MethodMaterial, DirectionalLight, Vector3D, StaticLightPicker, MaterialPool } from 'awayjs-full';


class rect {
	constructor() {
		let scene = new Scene(),
			camera = new Camera();

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


		let plane = <Sprite>new PrimitivePlanePrefab(planeMaterial, ElementsType.TRIANGLE, 1000, 1000).getNewObject();
		plane.graphics.scaleUV(2, 2);
		plane.y = 0;

		//for (var i = 0; i < 5; i++) {
		//	let sphere = <Sprite>new PrimitiveSpherePrefab(sphereMaterial, ElementsType.TRIANGLE, 150, 40, 20).getNewObject();
		//	sphere.x = 300;
		//	sphere.y = 150 * i * 2 + 160;
		//	sphere.z = 300;

		//	scene.addChild(sphere);
		//}



		let sphere = <Sprite>new PrimitiveCubePrefab(sphereMaterial, ElementsType.TRIANGLE, 150, 40, 20).getNewObject();
		sphere.x = 300;
		sphere.y = 160;
		sphere.z = 300;

		scene.addChild(sphere);

		//let plane1 = <Sprite>new PrimitivePlanePrefab(planeMaterial, ElementsType.TRIANGLE, 1000, 1000).getNewObject();
		//plane1.graphics.scaleUV(2, 2);
		//plane1.y = -20;
		//plane1.x = 1000;
		//plane1.z = 0;

		scene.addChild(plane);
		//scene.addChild(plane1);

		

		window.onresize = (event: UIEvent) => this.onResize();

		document.onmousedown = (event: MouseEvent) => this.onMouseDown(event);
		document.onmouseup = (event: MouseEvent) => this.onMouseUp(event);
		document.onmousemove = (event: MouseEvent) => this.onMouseMove(event);
		document.onmousewheel = (event: WheelEvent) => this.onMouseWheel(event);


		this.onResize();

		let timer = new RequestAnimationFrame(this.onEnterFrame, this);
		timer.start();
	}
	view: View;
	light1: DirectionalLight;
	time: number;
	cameraController: HoverController;
	move: boolean = false;
	lastPanAngle: number;
	lastTiltAngle: number;
	lastMouseX: number;
	lastMouseY: number;

	private onMouseDown(event: MouseEvent): void {
		this.lastPanAngle = this.cameraController.panAngle;
		this.lastTiltAngle = this.cameraController.tiltAngle;
		this.lastMouseX = event.clientX;
		this.lastMouseY = event.clientY;
		this.move = true;
	}

	private onMouseUp(event: MouseEvent): void {
		this.move = false;
	}

	private onMouseMove(event: MouseEvent) {
		if (this.move) {
			this.cameraController.panAngle = 0.3 * (event.clientX - this.lastMouseX) + this.lastPanAngle;
			this.cameraController.tiltAngle = 0.3 * (event.clientY - this.lastMouseY) + this.lastTiltAngle;
		}
	}

	private onMouseWheel(event: WheelEvent) {
		this.cameraController.distance -= event.wheelDelta;

		if (this.cameraController.distance < 100)
			this.cameraController.distance = 100;
		else if (this.cameraController.distance > 2000)
			this.cameraController.distance = 2000;
	}

	private onEnterFrame(dt: number): void {
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

