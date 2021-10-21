import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { v4 as uuid } from "uuid";
import { selectUser } from "../features/appSlice";
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
	const user = useSelector(selectUser);

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
			getDownloadURL(uploadTask.ref).then(async downloadURL => {
				try {
					const timeCreated = await (await getMetadata(storageRef)).timeCreated;
					await addDoc(collection(db, "photos"), {
						imageUrl: downloadURL,
						username: user.username,
						read: false,
						profilePic: user.profilePic,
						timestamp: timeCreated,
					});
					history.push("/messages");
				} catch (error) {
					console.log(error);
				}
			});
		} catch (error) {
			console.log(error);
		}
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
