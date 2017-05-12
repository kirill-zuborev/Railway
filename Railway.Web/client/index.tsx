import * as React from "react";
import * as ReactDOM from "react-dom";
import { Store, Dispatch } from 'redux';
import { Index } from './app/Index';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { Route, Router } from 'react-router';
import { createBrowserHistory } from 'history';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import * as sdasd from 'material-ui/styles';

let history = createBrowserHistory();


ReactDOM.render(
	<Router history={history}>
		<MuiThemeProvider>
			<Route exact={true} path="/" component={() => <Index title="New App" />} />
		</MuiThemeProvider>
	</Router>,
	document.getElementById("example")
);