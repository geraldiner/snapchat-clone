import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./features/appSlice";

import WebcamCapture from "./components/WebcamCapture";
import Preview from "./components/Preview";
import Messages from "./components/Messages";
import MessageView from "./components/MessageView";

import "./App.css";

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	return (
		<div className="app">
			<Router>
				{!user ? (
					<Login />
				) : (
					<div className="app__body">
						<Switch>
							<Route exact path="/" component={WebcamCapture} />
							<Route exact path="/preview" component={Preview} />
							<Route exact path="/messages" component={Messages} />
							<Route exact path="/messages/view" component={MessageView} />
						</Switch>
					</div>
				)}
			</Router>
		</div>
	);
}

export default App;
