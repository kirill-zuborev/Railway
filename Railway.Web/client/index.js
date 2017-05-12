import * as React from "react";
import * as ReactDOM from "react-dom";
import { Index } from './app/Index';
import { Route, Router } from 'react-router';
import { createBrowserHistory } from 'history';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { MuiThemeProvider } from "material-ui/styles";
let history = createBrowserHistory();
ReactDOM.render(React.createElement(Router, { history: history },
    React.createElement(MuiThemeProvider, null,
        React.createElement(Route, { exact: true, path: "/", component: () => React.createElement(Index, { title: "New App" }) }))), document.getElementById("example"));
//# sourceMappingURL=index.js.map