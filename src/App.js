import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "@firebase/auth";
import { selectUser, login, logout } from "./features/appSlice";
import { auth } from "./firebase";

import Login from "./components/Login";
import WebcamCapture from "./components/WebcamCapture";
import Preview from "./components/Preview";
import Messages from "./components/Messages";
import MessageView from "./components/MessageView";

import "./App.css";

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				dispatch(
					login({
						username: user.displayName,
						profilePic: user.photoURL,
						id: user.uid,
					}),
				);
			} else {
				dispatch(logout());
			}
		});
	}, []);

	return (
		<div className="app">
			<Router>
				{!user ? (
					<Login />
				) : (
					<>
						<img className="app__logo" src="https://twemoji.maxcdn.com/2/svg/1f47b.svg" alt="logo" />
						<div className="app__body">
							<div className="app__bodyBackground">
								<Switch>
									<Route exact path="/" component={WebcamCapture} />
									<Route exact path="/preview" component={Preview} />
									<Route exact path="/messages" component={Messages} />
									<Route exact path="/messages/view" component={MessageView} />
								</Switch>
							</div>
						</div>
					</>
				)}
			</Router>
		</div>
	);
}

export default App;
