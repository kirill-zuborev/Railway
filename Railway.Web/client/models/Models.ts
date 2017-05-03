export interface ContainerModel {
	figure: RectangleModel;
	position: Point;
}

export interface RectangleModel {
	height: number;
	width: number;
	length: number;
}

export interface Point {
	x: number;
	y: number;
	z: number;
}

export interface WagonModel {
	figure: RectangleModel;
	containers: ContainerModel[];
}