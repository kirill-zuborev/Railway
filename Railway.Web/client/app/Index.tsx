import * as React from "react";
import { RouteComponentProps } from 'react-router';
import { Rectangle } from '../components/Rectangle1';
import { Wagon } from '../components/Wagon';
import { RectangleModel } from '../models/Models';

export interface IndexProp {
	title: string;
}

let rect = { height: 10, length: 20, width: 10 } as RectangleModel;

export class Index extends React.Component<IndexProp, void> {
	render() {
		Rectangle();

		return <div>
			
		</div>;
	}
}