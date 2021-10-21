import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { Avatar } from "@mui/material";
import { StopRounded } from "@mui/icons-material";
import ReactTimeago from "react-timeago";
import { selectImage } from "../features/appSlice";
import { doc, setDoc } from "firebase/firestore";

import { db } from "../firebase";

import "./Message.css";

const Message = ({ id, username, timestamp, imageUrl, read, profilePic }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const open = async () => {
		if (!read) {
			dispatch(selectImage(imageUrl));
			await setDoc(doc(db, "photos", id), { read: true }, { merge: true });

			history.push("/messages/view");
		}
	};
	return (
		<div onClick={open} className="message">
			<Avatar className="message__avatar" src={profilePic} />
			<div className="message__info">
				<h4>{username}</h4>
				<p>
					{!read && "Tap to view - "}
					<ReactTimeago date={new Date(timestamp).toUTCString()} />
				</p>
			</div>

			{!read && <StopRounded className="message__readIcon" />}
		</div>
	);
};

export default Message;
