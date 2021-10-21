import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { Search, ChatBubble } from "@mui/icons-material";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import Message from "./Message";
import { db } from "../firebase";
import "./Messages.css";

const Messages = () => {
	const [messages, setMessages] = useState([]);

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
				<Avatar className="messages__avatar" />
				<div className="messages__search">
					<Search />
					<input type="text" placeholder="Search contacts" />
				</div>
				<ChatBubble className="messages__chatIcon" />
			</div>
			<div className="messages__wrapper">
				{messages.map(({ id, data: { profilePic, username, timestamp, imageUrl, read } }) => {
					return <Message key={id} id={id} username={username} timestamp={timestamp} imageUrl={imageUrl} read={read} profilePic={profilePic} />;
				})}
			</div>
		</div>
	);
};

export default Messages;
