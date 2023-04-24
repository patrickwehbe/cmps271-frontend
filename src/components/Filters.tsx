import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Stack,
	TextField,
	Typography,
	createTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { JobType } from "../views/JobsPage";

interface JobTypeFilterProps {
	onChange: (selectedTypes: JobType[]) => void;
}

const JobTypeFilter: React.FC<JobTypeFilterProps> = ({ onChange }) => {
	const [selectedTypes, setSelectedTypes] = useState<JobType[]>([]);

	const handleTypeChange = (type: JobType) => {
		const updatedTypes = selectedTypes.includes(type)
			? selectedTypes.filter((selectedType) => selectedType !== type)
			: [...selectedTypes, type];
		setSelectedTypes(updatedTypes);
		onChange(updatedTypes);
	};

	return (
		<Stack spacing={2} sx={{ color: "text.secondary" }}>
			<Typography variant="h6">Job Types</Typography>
			<Stack>
				<FormControlLabel
					control={
						<Checkbox
							color="primary"
							checked={selectedTypes.includes("Full Time")}
							onChange={() => handleTypeChange("Full Time")}
						/>
					}
					label="Full Time"
				/>
				<FormControlLabel
					control={
						<Checkbox
							color="primary"
							checked={selectedTypes.includes("Part Time")}
							onChange={() => handleTypeChange("Part Time")}
						/>
					}
					label="Part Time"
				/>
				<FormControlLabel
					control={
						<Checkbox
							color="primary"
							checked={selectedTypes.includes("Contract")}
							onChange={() => handleTypeChange("Contract")}
						/>
					}
					label="Contract"
				/>
				<FormControlLabel
					control={
						<Checkbox
							color="primary"
							checked={selectedTypes.includes("Featured")}
							onChange={() => handleTypeChange("Featured")}
						/>
					}
					label="Featured"
				/>
				<FormControlLabel
					control={
						<Checkbox
							color="primary"
							checked={selectedTypes.includes("Recruiters")}
							onChange={() => handleTypeChange("Recruiters")}
						/>
					}
					label="Recruiters"
				/>
			</Stack>
			<Button variant="contained" onClick={() => onChange(selectedTypes)}>
				Apply Filter
			</Button>
		</Stack>
	);
};

interface PriceFilterProps {
	minPrice: number;
	maxPrice: number;
	onPriceChange: (minPrice: number, maxPrice: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
	minPrice,
	maxPrice,
	onPriceChange,
}) => {
	const [localMinPrice, setLocalMinPrice] = useState<string>(minPrice.toString());
	const [localMaxPrice, setLocalMaxPrice] = useState<string>(maxPrice.toString());

	const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLocalMinPrice(event.target.value);
	};

	const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLocalMaxPrice(event.target.value);
	};

	const handleBlur = () => {
		const newMinPrice = parseInt(localMinPrice, 10);
		const newMaxPrice = parseInt(localMaxPrice, 10);

		if (!isNaN(newMinPrice) && !isNaN(newMaxPrice) && newMinPrice <= newMaxPrice) {
			onPriceChange(newMinPrice, newMaxPrice);
		} else {
			setLocalMinPrice(minPrice.toString());
			setLocalMaxPrice(maxPrice.toString());
		}
	};

	return (
		<>
			<Box>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={4}>
						<TextField
							label="Price from"
							variant="outlined"
							size="small"
							type="number"
							value={localMinPrice}
							onChange={handleMinPriceChange}
							onBlur={handleBlur}
							sx={{ mr: 1 }}
						/>
					</Grid>
					<Grid item xs={12} sm={2}>
						<Typography variant="body1" sx={{ mt: 1 }}>
							to
						</Typography>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							label="Price to"
							variant="outlined"
							size="small"
							type="number"
							value={localMaxPrice}
							onChange={handleMaxPriceChange}
							onBlur={handleBlur}
						/>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

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

const useStyles = makeStyles(() => ({
	root: {
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-start",
		paddingTop: theme.spacing(10),
		paddingBottom: theme.spacing(10),
		paddingLeft: theme.spacing(10),
		paddingRight: theme.spacing(10),
		marginTop: "64px",
	},
	search: {
		marginRight: theme.spacing(2),
	},
	filters: {
		display: "flex",
		flexDirection: "column",
		marginRight: theme.spacing(2),
		marginTop: theme.spacing(2),
		mawWidth: "300px",
	},
	filter: {
		marginBottom: theme.spacing(2),
	},
	jobs: {
		flexGrow: 1,
	},
	listItem: {
		paddingRight: theme.spacing(6),
	},
	pagination: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		position: "fixed",
		bottom: theme.spacing(2),
		marginTop: theme.spacing(4),
		right: theme.spacing(50),
	},
}));

const Filters = () => {
	const classes = useStyles();

	const [salary, setSalary] = useState<string>("");
	const [location, setLocation] = useState<string>("");
	const [minPrice, setMinPrice] = useState<number>(0);
	const [maxPrice, setMaxPrice] = useState<number>(0);
	const [skills, setSkills] = useState<string>("");
	const [type, setType] = useState<string>("");
	const [remote, setRemote] = useState<boolean>(false);

	const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSalary(event.target.value);
	};

	const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLocation(event.target.value);
	};

	const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMinPrice(Number(event.target.value));
	};

	const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMaxPrice(Number(event.target.value));
	};

	const handleSkillFilterChange = (selectedSkills: string[]) => {
		setSkills(selectedSkills.join(", "));
	};

	const handleJobTypeFilterChange = (selectedTypes: JobType[]) => {
		setType(selectedTypes.join(", "));
	};

	const handleRemoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRemote(event.target.checked);
	};

	return (
		<Box className={classes.filters}>
			<Typography variant="h6">Filters</Typography>
			<Box className={classes.filter}>
				<TextField
					className={classes.search}
					label="Salary"
					variant="outlined"
					value={salary}
					onChange={handleSalaryChange}
				/>
			</Box>
			<Box className={classes.filter}>
				<TextField
					className={classes.search}
					label="Location"
					variant="outlined"
					value={location}
					onChange={handleLocationChange}
				/>
			</Box>
			<Box className={classes.filter}>
				<PriceFilter
					minPrice={minPrice}
					maxPrice={maxPrice}
					onPriceChange={(minPrice, maxPrice) => {
						handleMinPriceChange(minPrice);
						handleMaxPriceChange(maxPrice);
					}}
				/>
			</Box>
			<Box className={classes.filter}>
				<TextField
					className={classes.search}
					label="Skills"
					variant="outlined"
					value={skills}
					onChange={(event) =>
						handleSkillFilterChange(event.target.value.split(", "))
					}
				/>
			</Box>
			<Box className={classes.filter}>
				<JobTypeFilter
					onJobTypeChange={(selectedTypes) =>
						handleJobTypeFilterChange(selectedTypes)
					}
				/>
			</Box>
			<Box className={classes.filter}>
				<FormControlLabel
					control={<Checkbox checked={remote} onChange={handleRemoteChange} />}
					label="Remote"
				/>
			</Box>
		</Box>
	);
};

export default Filters;
