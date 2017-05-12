import * as React from "react";
import { RouteComponentProps } from 'react-router';
import { Rectangle } from '../components/Rectangle1';
import { Wagon } from '../components/Wagon';
import { RectangleModel } from '../models/Models';

import './index.less';

export interface IndexProp {
	title: string;
}

let rect = { height: 10, length: 20, width: 10 } as RectangleModel;

export class Index extends React.Component<IndexProp, void> {
	//render() {
	//	Rectangle();

	//	return <div className='page'>
	//		<div className='container'></div>
	//		<div className='list'>
	//			<div className='list__items'>
	//				<div className='list__item'>
	//					list
	//				</div>
	//				<div className='list__item'>
	//					list
	//				</div>
	//				<div className='list__item'>
	//					list
	//				</div>
	//				<div className='list__item'>
	//					list
	//				</div>
	//			</div>
	//		</div>
	//	</div>;
	//}

	render() {
		return <div className='page'>



		</div>;
	}
}