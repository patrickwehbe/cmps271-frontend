import React, { useEffect, useRef, useState } from "react";
import {
	Theme,
	Drawer,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	TextField,
	IconButton,
	Divider,
	Box,
	Typography,
	createTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { makeStyles, createStyles } from "@mui/styles";

const theme = createTheme({
	spacing: 8, // or any other value
	palette: {
		primary: {
			main: "#5f8fff",
		},
		common: {
			white: "#fff",
		},
	},
});
const useStyles = makeStyles(() =>
	createStyles({
		root: {
			display: "flex",
			height: "100vh",
			overflow: "hidden",
			backgroundColor: "white",
		},
		drawer: {
			width: "400px",
			flexShrink: 0,
			overflowY: "auto",
		},
		drawerPaper: {
			width: "400px",
			backgroundColor: theme.palette.background.default,
		},
		chatSection: {
			width: "100%",
			padding: theme.spacing(2),
			overflowY: "auto",
		},
		searchSection: {
			width: "100%",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			padding: theme.spacing(1, 2),
			backgroundColor: theme.palette.background.paper,
			boxShadow: theme.shadows[1],
		},
		messageSection: {
			width: "100%",
			padding: theme.spacing(2),
			paddingBottom: theme.spacing(7),
			overflowY: "auto",
		},
		searchInput: {
			flexGrow: 1,
			marginLeft: theme.spacing(1),
			marginTop: theme.spacing(4),
		},
		messageInput: {
			flexGrow: 1,
			marginRight: theme.spacing(1),
		},
		messageButton: {
			marginLeft: theme.spacing(1),
		},
		attachmentButton: {
			marginRight: theme.spacing(1),
		},
		listItem: {
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-start",
			marginBottom: theme.spacing(1),
		},
		listItemText: {
			marginBottom: theme.spacing(1),
		},
		listItemAvatar: {
			marginRight: theme.spacing(2),
		},
		messageDate: {
			fontSize: "0.75rem",
			color: theme.palette.text.secondary,
		},
	})
);

interface ChatMessage {
	id: number;
	sender: string;
	message: string;
	date: Date;
}

interface Conversation {
	id: number;
	name: string;
	messages: ChatMessage[];
}

interface MessageFeedProps {
	conversations: Conversation[];
}

const MessageFeed: React.FC<MessageFeedProps> = ({ conversations }) => {
	const classes = useStyles();
	const [selectedConversationId, setSelectedConversationId] = useState<number | null>(
		null
	);
	const [searchTerm, setSearchTerm] = useState<string>("");

	const handleConversationClick = (id: number) => {
		setSelectedConversationId(id);
	};

	const drawerRef = useRef<HTMLDivElement>(null);
	const handleDrawerClose = () => {
		setSelectedConversationId(null);
	};

	const filteredConversations = conversations.filter((conversation) =>
		conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
				setSelectedConversationId(null);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className={classes.root}>
			<Drawer
				ref={drawerRef}
				className={classes.drawer}
				variant="temporary"
				anchor="right"
				open={selectedConversationId !== null}
				classes={{
					paper: classes.drawerPaper,
				}}
				onClose={handleDrawerClose}
			>
				{selectedConversationId !== null && (
					<>
						<Box className={classes.chatSection}>
							<List>
								{filteredConversations.map((conversation) => (
									<React.Fragment key={conversation.id}>
										<ListItem
											button
											onClick={() =>
												handleConversationClick(conversation.id)
											}
											selected={
												conversation.id === selectedConversationId
											}
										>
											<ListItemAvatar
												className={classes.listItemAvatar}
											>
												<Avatar>
													{conversation.name.charAt(0)}
												</Avatar>
											</ListItemAvatar>
											<ListItemText primary={conversation.name} />
										</ListItem>
										<Divider variant="inset" component="li" />
									</React.Fragment>
								))}
							</List>
						</Box>
						<Box className={classes.messageSection}>
							<Typography variant="h6">
								{
									conversations.find(
										(c) => c.id === selectedConversationId
									)?.name
								}
							</Typography>
							<Divider />
							{conversations
								.find((c) => c.id === selectedConversationId)
								?.messages.map((message) => (
									<Box key={message.id} className={classes.listItem}>
										<Typography className={classes.messageDate}>
											{message.date.toLocaleString()}
										</Typography>
										<Typography className={classes.listItemText}>
											{message.message}
										</Typography>
									</Box>
								))}
							<Box>
								<TextField
									id="message-input"
									label="Type a message"
									variant="outlined"
									multiline
									rows={4}
									fullWidth
									className={classes.messageInput}
								/>
							</Box>
							<IconButton className={classes.attachmentButton} size="small">
								<AttachmentIcon />
							</IconButton>
							<IconButton className={classes.messageButton}>
								<SendIcon />
							</IconButton>
						</Box>
					</>
				)}
			</Drawer>
			<Box className={classes.chatSection}>
				<Box
					className={classes.searchSection}
					alignItems="center"
					justifyContent="center"
				>
					<SearchIcon />
					<TextField
						id="search-input"
						label="Search conversations"
						variant="standard"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className={classes.searchInput}
					/>
					<IconButton>
						<ChatIcon />
					</IconButton>
				</Box>
				<List>
					{filteredConversations.map((conversation) => (
						<React.Fragment key={conversation.id}>
							<ListItem
								button
								onClick={() => handleConversationClick(conversation.id)}
							>
								<ListItemAvatar className={classes.listItemAvatar}>
									<Avatar>{conversation.name.charAt(0)}</Avatar>
								</ListItemAvatar>
								<ListItemText primary={conversation.name} />
							</ListItem>
							<Divider variant="inset" component="li" />
						</React.Fragment>
					))}
				</List>
			</Box>
		</div>
	);
};

export default MessageFeed;
