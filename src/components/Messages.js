import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Avatar } from "@mui/material";
import { Search, ChatBubble, RadioButtonUnchecked } from "@mui/icons-material";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { signOut } from "@firebase/auth";
import { selectUser } from "../features/appSlice";
import { resetCameraImage } from "../features/cameraSlice";

import Message from "./Message";
import { db, auth } from "../firebase";
import "./Messages.css";

const Messages = () => {
	const [messages, setMessages] = useState([]);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const history = useHistory();

	const takePic = () => {
		dispatch(resetCameraImage());
		history.push("/");
	};

	useEffect(() => {
		const getDocsFromFireStore = async () => {
			const q = query(collection(db, "photos"), orderBy("timestamp", "desc"));
			const querySnapshot = await getDocs(q);
			let snapshots = [];
			querySnapshot.forEach(doc => {
				snapshots.push({ id: doc.id, data: doc.data() });
			});
			setMessages(snapshots);
		};
		getDocsFromFireStore();
	}, []);

	return (
		<div className="messages">
			<div className="messages__header">
				<Avatar src={user.profilePic} onClick={() => signOut(auth)} className="messages__avatar" />
				<div className="messages__search">
					<Search className="messages__searchIcon" />
					<input type="text" placeholder="Search contacts" />
				</div>
				<ChatBubble className="messages__chatIcon" />
			</div>
			<div className="messages__wrapper">
				{messages.map(({ id, data: { profilePic, username, timestamp, imageUrl, read } }) => {
					return <Message key={id} id={id} username={username} timestamp={timestamp} imageUrl={imageUrl} read={read} profilePic={profilePic} />;
				})}
			</div>

			<RadioButtonUnchecked className="messages__takePicIcon" onClick={takePic} fontSize="large" />
		</div>
	);
};

export default Messages;
