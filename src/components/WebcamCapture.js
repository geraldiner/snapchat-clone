import React, { useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCameraImage } from "../features/cameraSlice";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import "./WebcamCapture.css";

const videoConstrants = {
	width: 250,
	height: 400,
	facingMode: "user",
};

const WebcamCapture = () => {
	const webcamRef = useRef(null);
	const dispatch = useDispatch();
	const history = useHistory();

	const capture = useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		dispatch(setCameraImage(imageSrc));
		history.push("/preview");
	}, [webcamRef]);

	return (
		<div className="webcam-capture">
			<Webcam
				audio={false}
				height={videoConstrants.height}
				ref={webcamRef}
				screenshotFormat="image/jpeg"
				width={videoConstrants.width}
				videoConstraints={videoConstrants}
			/>
			<RadioButtonUncheckedIcon className="webcam-capture__button" onClick={capture} fontSize="large" />
		</div>
	);
};

export default WebcamCapture;
