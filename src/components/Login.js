import React from "react";
import { useDispatch } from "react-redux";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { auth, provider } from "../firebase";
import { login } from "../features/appSlice";
import { Button } from "@mui/material";

const Login = () => {
	const dispatch = useDispatch();

	const handleLogin = async () => {
		signInWithPopup(auth, provider)
			.then(result => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				dispatch(
					login({
						username: result.user.displayName,
						profilePic: result.user.photoURL,
						id: result.user.uid,
					}),
				);
			})
			.catch(error => {
				alert(error.message);
			});
	};

	return (
		<div className="login">
			<div className="login__container">
				<img src="https://twemoji.maxcdn.com/2/svg/1f47b.svg" alt="logo" />
				<Button variant="outlined" onClick={handleLogin}>
					Log In
				</Button>
			</div>
		</div>
	);
};

export default Login;
