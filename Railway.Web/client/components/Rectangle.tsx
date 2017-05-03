import * as React from "react";
import { RouteComponentProps } from 'react-router'
import { RectangleModel, Point } from '../models/Models';

export interface RectangleProp {
	rectangle: RectangleModel;
	position: Point;
	angleX: number;
	angleY: number;
	canvas: CanvasRenderingContext2D;
	viewDistance: number;
}

export class Rectangle {
	props: RectangleProp;
	vertices: Vector3D[];
	faces = [
		[0, 1, 2, 3],
		[1, 5, 6, 2],
		[5, 4, 7, 6],
		[4, 0, 3, 7],
		[0, 4, 5, 1],
		[3, 2, 6, 7]
	];

	updateCanvas() {
		let { canvas } = this.props;


		let state: Vector3D[] = [];

		this.vertices.forEach(vertex => {
			let projection = vertex
				.rotateY(this.props.angleY)
				.rotateX(this.props.angleX)
				.project(this.props.position.x, this.props.position.y, 128, this.props.viewDistance)

			state.push(projection);
		});

		this.faces.forEach((face, index) => {
			canvas.beginPath();
			canvas.moveTo(state[face[0]].x, state[face[0]].y);
			canvas.lineTo(state[face[1]].x, state[face[1]].y);
			canvas.lineTo(state[face[2]].x, state[face[2]].y);
			canvas.lineTo(state[face[3]].x, state[face[3]].y);
			canvas.closePath();
			canvas.stroke();
		});

		//canvas.beginPath();
		//canvas.moveTo(new Vector3D(0, 0, 0).rotateY(this.angleY).rotateX(this.angleX).project(150, 150, 128, this.viewDistance).x, new Vector3D(0, 0, 0).rotateY(this.angleY).rotateX(this.angleX).project(150, 150, 128, this.viewDistance).y);
		//canvas.lineTo(new Vector3D(1, 0, 0).rotateY(this.angleY).rotateX(this.angleX).project(150, 150, 128, this.viewDistance).x, new Vector3D(1, 0, 0).rotateY(this.angleY).rotateX(this.angleX).project(150, 150, 128, this.viewDistance).y);
		//canvas.closePath();
		//canvas.stroke();
	}

	constructor(props: RectangleProp) {
		this.props = props;

		let x = 1,
			y = props.rectangle.width / props.rectangle.length,
			z = props.rectangle.height / props.rectangle.length;

		this.vertices = [
			new Vector3D(-x, y, -z),
			new Vector3D(x, y, -z),
			new Vector3D(x, -y, -z),
			new Vector3D(-x, -y, -z),
			new Vector3D(-x, y, z),
			new Vector3D(x, y, z),
			new Vector3D(x, -y, z),
			new Vector3D(-x, -y, z)
		];
	}
}



class Vector3D {
	constructor(public x: number, public y: number, public z: number) { }

	rotateX(angle: number): Vector3D {
		var rad, cosa, sina, y, z;
		rad = angle * Math.PI / 180;
		cosa = Math.cos(rad);
		sina = Math.sin(rad);
		y = this.y * cosa - this.z * sina;
		z = this.y * sina + this.z * cosa;

		return new Vector3D(this.x, y, z);
	}

	rotateY(angle: number): Vector3D {
		var rad, cosa, sina, x, z;
		rad = angle * Math.PI / 180;
		cosa = Math.cos(rad);
		sina = Math.sin(rad);
		x = this.z * sina + this.x * cosa;
		z = this.z * cosa - this.x * sina;

		return new Vector3D(x, this.y, z);
	}

	rotateZ(angle: number): Vector3D {
		var rad, cosa, sina, x, y;
		rad = angle * Math.PI / 180;
		cosa = Math.cos(rad);
		sina = Math.sin(rad);
		x = this.x * cosa - this.y * sina;
		y = this.x * sina + this.y * cosa;

		return new Vector3D(x, y, this.z);
	}

	rotate(x: number, y: number, z: number): Vector3D {
		return this.rotateX(x).rotateY(y).rotateZ(z);
	}

	project(cx: number, cy: number, fov: number, viewDistance: number): Vector3D {
		var factor, x, y;
		factor = fov / (viewDistance + this.z);
		x = this.x * factor + cx;
		y = this.y * factor + cy;
		return new Vector3D(x, y, this.z);
	}
}