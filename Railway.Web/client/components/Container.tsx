import * as React from "react";
import { RouteComponentProps } from 'react-router'
import { ContainerModel } from '../models/Models';

export interface ContainerProp {
	
}

export class Container extends React.Component<ContainerProp, void> {
	render() {
		return <div>
			<h1>Index page</h1>
		</div>;
	}
}