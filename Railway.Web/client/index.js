import * as React from "react";
import * as ReactDOM from "react-dom";
import { Index } from './app/Index';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { Route, Router } from 'react-router';
import { createBrowserHistory } from 'history';
injectTapEventPlugin();
let history = createBrowserHistory();
ReactDOM.render(React.createElement(Router, { history: history },
    React.createElement(Route, { exact: true, path: "/", component: () => React.createElement(Index, { title: "New App" }) })), document.getElementById("example"));
//# sourceMappingURL=index.js.map