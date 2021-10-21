import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { v4 as uuid } from "uuid";
import { selectCameraImage, resetCameraImage } from "../features/cameraSlice";
import { Close, TextFields, Create, Note, MusicNote, AttachFile, Crop, Timer, Send } from "@mui/icons-material";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadString, getDownloadURL, getMetadata } from "firebase/storage";
import { db, storage } from "../firebase";

import "./Preview.css";

const Preview = () => {
	const cameraImage = useSelector(selectCameraImage);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!cameraImage) {
			history.replace("/");
		}
	}, [cameraImage, history]);

	const closePreview = () => {
		dispatch(resetCameraImage());
	};

	const sendPhoto = async () => {
		const id = uuid();
		const storageRef = ref(storage, `photos/${id}`);
		try {
			const uploadTask = await uploadString(storageRef, cameraImage, "data_url");
			console.log(uploadTask);
			getDownloadURL(uploadTask.ref).then(async downloadURL => {
				console.log("File available at", downloadURL);
				try {
					const timeCreated = await (await getMetadata(storageRef)).timeCreated;
					const docRef = await addDoc(collection(db, "photos"), {
						imageUrl: downloadURL,
						username: "Mr. Meeseeks",
						read: false,
						// profilePic,
						timestamp: timeCreated,
					});
				} catch (error) {
					console.log(error);
				}
			});
		} catch (error) {
			console.log(error);
		}
		// Register three observers:
		// 1. 'state_changed' observer, called any time the state changes
		// 2. Error observer, called on failure
		// 3. Completion observer, called on successful completion
	};

	return (
		<div className="preview">
			<Close onClick={closePreview} className="preview__close" />
			<div className="preview__toolbarRight">
				<TextFields />
				<Create />
				<Note />
				<MusicNote />
				<AttachFile />
				<Crop />
				<Timer />
			</div>
			<img src={cameraImage} alt="" />
			<div onClick={sendPhoto} className="preview__footer">
				<h2>Send Now</h2>
				<Send className="preview__sendIcon" />
			</div>
		</div>
	);
};

export default Preview;
