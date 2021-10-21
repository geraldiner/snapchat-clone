import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import { selectSelectedImage } from "../features/appSlice";
import "./MessageView.css";

const MessageView = () => {
	const selectedImage = useSelector(selectSelectedImage);
	const history = useHistory();

	useEffect(() => {
		if (!selectedImage) {
			exit();
		}
	}, [selectedImage]);

	const exit = () => {
		history.replace("/messages");
	};

	return (
		<div className="message-view">
			<img src={selectedImage} onClick={exit} alt="" />
		</div>
	);
};

export default MessageView;
