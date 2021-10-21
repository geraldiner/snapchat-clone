import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebcamCapture from "./components/WebcamCapture";
import Preview from "./components/Preview";

import "./App.css";

function App() {
	return (
		<Router>
			<div className="app">
				<div className="app__body">
					<Switch>
						<Route exact path="/" component={WebcamCapture} />
						<Route exact path="/preview" component={Preview} />
					</Switch>
				</div>
			</div>
		</Router>
	);
}

export default App;
