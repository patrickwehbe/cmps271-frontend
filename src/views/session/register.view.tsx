import React, { useState } from "react";
import { useDispatch } from "react-redux";
import metamaskSlice from "../../redux/metamask";
import { makeStyles } from "@mui/styles";
import {
	Box,
	Grid,
	Typography,
	Button,
	TextField,
	Alert,
	Link,
	createTheme,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
	spacing: 8, // or any other value
	palette: {
		primary: {
			main: "#1A237E",
		},
		common: {
			white: "#fff",
		},
		grey: {
			50: "#F5F5F5",
			100: "#eeeeee",
			200: "#e0e0e0",
			300: "#bdbdbd",
			400: "#9e9e9e",
			500: "#757575",
			600: "#616161",
			700: "#424242",
			800: "#212121",
			900: "#000000",
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
	typography: {
		fontFamily: "Roboto",
	},
});

const useStyles = makeStyles(() => ({
	root: {
		height: "100vh",
	},
	image: {
		backgroundImage:
			"url(https://images.unsplash.com/photo-1494548162494-384bba4ab999)",
		backgroundRepeat: "no-repeat",
		// @ts-ignore
		backgroundColor: theme.palette.grey[50],

		backgroundSize: "cover",
		backgroundPosition: "center",
	},
	formBox: {
		// @ts-ignore

		// @ts-ignore
		border: `1px solid ${theme.palette.grey[400]}`,
		// @ts-ignore
		borderRadius: theme.shape.borderRadius,
		// @ts-ignore
		padding: theme.spacing(4),
	},
	connectButton: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		// @ts-ignore
		marginTop: theme.spacing(2),
		// @ts-ignore
		backgroundColor: theme.palette.primary.main,
		// @ts-ignore
		color: theme.palette.common.white,
		"&:hover": {
			backgroundColor: "#0D185F",
			boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
		},
	},
}));

const RegisterPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const classes = useStyles();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [metamaskAlert, setMetamaskAlert] = useState(null);

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
			navigate("/jobs");
		} else {
			console.log("Metamask not found");
		}
	};

	return (
		<Grid container className={classes.root}>
			{/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
			<Grid item xs={12} sm={4} md={4} component={Box} display="flex">
				{" "}
			</Grid>
			<Grid
				item
				xs={12}
				sm={4}
				md={4}
				component={Box}
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<Box className={classes.formBox}>
					<Typography variant="h4" align="center" gutterBottom>
						Register
					</Typography>
					<form>
						<TextField
							label="Email"
							type="email"
							fullWidth
							margin="normal"
							variant="outlined"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							InputProps={{
								startAdornment: (
									<Box mr={1}>
										<EmailIcon color="action" />
									</Box>
								),
							}}
						/>
						<TextField
							label="Password"
							type="password"
							fullWidth
							margin="normal"
							variant="outlined"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							InputProps={{
								startAdornment: (
									<Box mr={1}>
										<LockIcon color="action" />
									</Box>
								),
							}}
						/>
						<TextField
							label="Confirm Password"
							type="cpassword"
							fullWidth
							margin="normal"
							variant="outlined"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							InputProps={{
								startAdornment: (
									<Box mr={1}>
										<LockIcon color="action" />
									</Box>
								),
							}}
						/>
						{metamaskAlert && (
							<Alert severity="error" variant="outlined">
								{metamaskAlert}
							</Alert>
						)}

						<Button
							type="submit"
							variant="contained"
							fullWidth
							className={classes.connectButton}
							onClick={handleMetamaskLogin}
						>
							Connect with MetaMask
						</Button>
						<Typography align="center" mt={2}>
							Already have an account?{" "}
							<Link href="#" color="primary">
								Sign in
							</Link>
						</Typography>
					</form>
				</Box>
			</Grid>
		</Grid>
	);
};

export default RegisterPage;
