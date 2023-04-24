import React, { useState } from "react";
import metamaskSlice from "../redux/metamask";
import { ThemeProvider, makeStyles } from "@mui/styles";
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	InputBase,
	Drawer,
	Box,
	Grid,
	Avatar,
	createTheme,
	alpha,
	Button,
	Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import SearchIcon from "@mui/icons-material/Search";
import { GroupsOutlined, LockPerson, Work } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { ethers } from "ethers";

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
	shape: {
		borderRadius: 4, // or any other value
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 960,
			lg: 1280,
			xl: 1920,
		},
	},
});

const useStyles = makeStyles(() => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		width: 240,
	},
	avatar: {
		height: theme.spacing(6),
		width: theme.spacing(6),
		marginRight: theme.spacing(2),
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		"&:hover": {
			backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(10),
			width: "auto",
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	inputRoot: {
		color: "inherit",
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

const Header = () => {
	const dispatch = useDispatch();
	const connected = useSelector((state: any) => state.metamask.connected);
	const address = useSelector((state: any) => state.metamask.address);
	const classes = useStyles();
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleDrawerOpen = () => {
		setDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setDrawerOpen(false);
	};
	const handleMetamaskLogout = () => {
		// Dispatch the disconnectMetamask action
		dispatch(metamaskSlice.actions.disconnectMetamask());
	};
	const handleMetamaskLogin = async () => {
		if (window.ethereum) {
			// Request Metamask to connect
			await window.ethereum.request({ method: "eth_requestAccounts" });
			// Create a new provider using the Metamask provider
			const provider = new ethers.BrowserProvider(window.ethereum);

			// Get the signer from the provider
			const signer = provider.getSigner();
			// Get the Ethereum address of the signer
			const address = await (await signer).getAddress();
			console.log("Connected to Metamask with address:", address);
			// Dispatch the connectMetamask action with the address payload
			dispatch(metamaskSlice.actions.connectMetamask(address));
		} else {
			console.log("Metamask not found");
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<AppBar position="fixed">
				<Toolbar>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between"
						width="100%"
					>
						<Box display="flex" alignItems="center">
							<IconButton
								edge="start"
								className={classes.menuButton}
								color="inherit"
								aria-label="menu"
								onClick={handleDrawerOpen}
							>
								<MenuIcon />
							</IconButton>
							<Typography variant="h6" className={classes.title}>
								Dework
							</Typography>
						</Box>
						<Box
							display="flex"
							alignItems="center"
							justifyContent="space-evenly"
							gap={2}
						>
							{
								// If the user is connected, show the logout button
								connected ? (
									<Button
										variant="contained"
										startIcon={<LockPerson />}
										sx={{
											background: alpha(
												theme.palette.common.white,
												0.25
											),
										}}
										onClick={handleMetamaskLogout}
									>
										Logout
									</Button>
								) : (
									<Button
										variant="contained"
										startIcon={<LockPerson />}
										sx={{
											background: alpha(
												theme.palette.common.white,
												0.25
											),
										}}
										onClick={() => {
											handleMetamaskLogin();
										}}
									>
										Login
									</Button>
								)
							}

							<Button
								variant="contained"
								startIcon={<GroupsOutlined />}
								sx={{
									background: alpha(theme.palette.common.white, 0.25),
								}}
							>
								DAO
							</Button>
							<Button
								variant="contained"
								startIcon={<Work />}
								sx={{
									background: alpha(theme.palette.common.white, 0.25),
								}}
							>
								Jobs
							</Button>

							<div className={classes.search}>
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>
								<InputBase
									placeholder=""
									classes={{
										root: classes.inputRoot,
										input: classes.inputInput,
									}}
									inputProps={{ "aria-label": "search" }}
								/>
							</div>
							{
								// If the user is connected, show the user's address
								connected ? (
									<Typography variant="h6" className={classes.title}>
										{address}
									</Typography>
								) : (
									""
								)
							}
							<Avatar
								alt="User Profile"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSICBNue4lK6L2HK4Gujo5gEZS3o3mdTxkjhcK8uTCX4g&s"
								className={classes.avatar}
							/>
						</Box>
					</Box>
				</Toolbar>
			</AppBar>
			<Drawer
				anchor="left"
				open={drawerOpen}
				onClose={handleDrawerClose}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<Grid container direction="column" spacing={2} padding={2}>
					<Grid item>
						<Box display="flex" alignItems="center" justifyContent="start">
							<Avatar
								alt="User Profile"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSICBNue4lK6L2HK4Gujo5gEZS3o3mdTxkjhcK8uTCX4g&s"
								className={classes.avatar}
							/>
							<Typography variant="h6">John Doe</Typography>
						</Box>
					</Grid>
					<br />
					<Grid item>
						<Box>
							<Typography variant="h6">Profile</Typography>
							<Divider />

							<Typography variant="subtitle1">
								john.doe@dework.com
							</Typography>
							<Typography variant="subtitle1">+91 1234567890</Typography>
							<Typography variant="subtitle1">India</Typography>
							<Typography variant="subtitle1">
								Joined 1st Jan 2021
							</Typography>
						</Box>

						<br />

						<Box>
							<Typography variant="h6">Feed</Typography>
							<Divider />
							<br />
							<Typography variant="subtitle1">My Jobs</Typography>
							<Typography variant="subtitle1">My DAOs</Typography>
							<Typography variant="subtitle1">My Network</Typography>
						</Box>
						<br />
						<Box>
							<Typography variant="h6">Actions</Typography>
							<Divider />
							<Typography variant="subtitle1">Create Job</Typography>
							<Typography variant="subtitle1">Create DAO</Typography>
						</Box>
					</Grid>
				</Grid>
			</Drawer>
		</ThemeProvider>
	);
};

export default Header;
