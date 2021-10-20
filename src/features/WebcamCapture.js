import React, { useRef } from "react";
import Webcam from "react-webcam";

const videoConstrants = {
	width: 250,
	height: 400,
	facingMode: "user",
};

const WebcamCapture = () => {
	const webcamRef = useRef(null);

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
		</div>
	);
};

export default WebcamCapture;
