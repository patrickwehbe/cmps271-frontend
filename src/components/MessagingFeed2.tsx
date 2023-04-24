import React, { useState } from "react";
import {
	Typography,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	TextField,
	InputAdornment,
	Box,
	createTheme,
	Drawer,
} from "@mui/material";
import { ArrowBack, Search as SearchIcon } from "@mui/icons-material";
import { createStyles, makeStyles } from "@mui/styles";

const messages = [
	{
		id: 1,
		sender: "Alice",
		content: "Hey, how are you?",
		timestamp: "2022-04-23T15:00:00Z",
	},
	{
		id: 2,
		sender: "Bob",
		content: "I'm good, thanks for asking. How about you?",
		timestamp: "2022-04-23T15:05:00Z",
	},
	{
		id: 3,
		sender: "Alice",
		content: "I'm doing well too. Do you want to grab lunch later?",
		timestamp: "2022-04-23T15:10:00Z",
	},
	{
		id: 4,
		sender: "Bob",
		content: "Sure, that sounds great. How about 1pm?",
		timestamp: "2022-04-23T15:15:00Z",
	},
	{
		id: 1,
		sender: "Alice",
		content: "Hey, how are you?",
		timestamp: "2022-04-23T15:00:00Z",
	},
	{
		id: 2,
		sender: "Bob",
		content: "I'm good, thanks for asking. How about you?",
		timestamp: "2022-04-23T15:05:00Z",
	},
	{
		id: 3,
		sender: "Alice",
		content: "I'm doing well too. Do you want to grab lunch later?",
		timestamp: "2022-04-23T15:10:00Z",
	},
	{
		id: 4,
		sender: "Bob",
		content: "Sure, that sounds great. How about 1pm?",
		timestamp: "2022-04-23T15:15:00Z",
	},
	{
		id: 1,
		sender: "Alice",
		content: "Hey, how are you?",
		timestamp: "2022-04-23T15:00:00Z",
	},
	{
		id: 2,
		sender: "Bob",
		content: "I'm good, thanks for asking. How about you?",
		timestamp: "2022-04-23T15:05:00Z",
	},
	{
		id: 3,
		sender: "Alice",
		content: "I'm doing well too. Do you want to grab lunch later?",
		timestamp: "2022-04-23T15:10:00Z",
	},
	{
		id: 12,
		sender: "Bob",
		content: "Sure, that sounds great. How about 1pm?",
		timestamp: "2022-04-23T15:15:00Z",
	},
];

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
			flexDirection: "column",
			maxHeight: "66vh",
			border: `1px solid ${theme.palette.grey[400]}`,
		},
		searchContainer: {
			backgroundColor: theme.palette.background.paper,
			padding: theme.spacing(2),
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			position: "relative",
			borderBottom: `1px solid ${theme.palette.grey[400]}`,
			cursor: "pointer",
		},
		searchInput: {
			backgroundColor: theme.palette.background.paper,
		},
		messageList: {
			flex: "1 1 auto",
			overflow: "auto",
			backgroundColor: theme.palette.background.paper,
			"&::-webkit-scrollbar": {
				width: "0.4em",
			},
			"&::-webkit-scrollbar-track": {
				boxShadow: `inset 0 0 6px ${theme.palette.grey[300]}`,
			},
			"&::-webkit-scrollbar-thumb": {
				backgroundColor: theme.palette.grey[400],
				borderRadius: 10,
			},
		},
		messageItem: {
			paddingTop: theme.spacing(1),
			paddingBottom: theme.spacing(1),
		},
		messageText: {
			display: "flex",
			justifyContent: "space-between",
		},
		drawer: {
			height: "50vh",
			backgroundColor: theme.palette.background.paper,
			padding: theme.spacing(2),
		},
	})
);

const MessagingFeed = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const handleSearchChange = (event: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setSearchTerm(event.target.value);
	};

	const filteredMessages = messages.filter((message) =>
		message.sender.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const classes = useStyles();

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	return (
		<div className={classes.root}>
			<Box className={classes.searchContainer} onClick={toggleDrawer}>
				<IconButton sx={{ position: "fixed" }}>
					<ArrowBack />
				</IconButton>
				<TextField
					className={classes.searchInput}
					placeholder="Search messages"
					value={searchTerm}
					onChange={handleSearchChange}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
			</Box>
			<List className={classes.messageList}>
				{filteredMessages.map((message) => (
					<ListItem key={message.id} className={classes.messageItem}>
						<ListItemAvatar>
							<Avatar>{message.sender[0]}</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={message.sender}
							secondary={
								<Typography
									component="span"
									variant="body2"
									className={classes.messageText}
									color="textPrimary"
								>
									{message.content}
									<br />
									{new Date(message.timestamp).toLocaleString()}
								</Typography>
							}
						/>
						<ListItemSecondaryAction>
							<IconButton edge="end" aria-label="delete">
								{/* Add delete icon here */}
							</IconButton>
						</ListItemSecondaryAction>
					</ListItem>
				))}
			</List>
			<Drawer anchor="bottom" open={isDrawerOpen} onClose={toggleDrawer}>
				<Box className={classes.drawer}>
					<Typography variant="h6">Search Messages</Typography>
					<TextField
						placeholder="Search messages"
						value={searchTerm}
						onChange={handleSearchChange}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
				</Box>
			</Drawer>
		</div>
	);
};

export default MessagingFeed;
