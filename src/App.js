import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebcamCapture from "./components/WebcamCapture";
import Preview from "./components/Preview";
import Messages from "./components/Messages";
import MessageView from "./components/MessageView";

import "./App.css";

function App() {
	return (
		<Router>
			<div className="app">
				<div className="app__body">
					<Switch>
						<Route exact path="/" component={WebcamCapture} />
						<Route exact path="/preview" component={Preview} />
						<Route exact path="/messages" component={Messages} />
						<Route exact path="/messages/view" component={MessageView} />
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
