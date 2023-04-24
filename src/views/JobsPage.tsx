import React, { useState } from "react";
import {
	TextField,
	Checkbox,
	FormControlLabel,
	FormControl,
	Button,
	Box,
	Typography,
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	Menu,
	MenuItem,
	createTheme,
	Grid,
	Stack,
	Divider,
	Select,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FilterList, MoreVert } from "@mui/icons-material";
import { Chip } from "@mui/material";
import MessagingFeed from "../components/MessagingFeed";
import JobDescriptionHeader from "../components/JobListHeader";

type JobType = "Full Time" | "Part Time" | "Contract" | "Featured" | "Recruiters";

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
							fullWidth
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
							fullWidth
						/>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

interface JobTagProps {
	tags: string[];
}

const JobTags: React.FC<JobTagProps> = ({ tags }) => {
	return (
		<>
			{tags.map((tag) => (
				<Chip
					label={tag}
					variant="outlined"
					size="small"
					sx={{ mr: 1, mb: 1, mt: 2 }}
				/>
			))}
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
		marginTop: theme.spacing(2),
	},
	filters: {
		display: "flex",
		flexDirection: "column",
		marginRight: theme.spacing(2),
		marginTop: theme.spacing(2),
		maxWidth: "300px",
		backgroundColor: theme.palette.common.white,
		padding: theme.spacing(2),
	},
	filter: {
		marginBottom: theme.spacing(2),
	},
	jobs: {
		flexGrow: 1,
		backgroundColor: theme.palette.common.white,
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

type Job = {
	id: number;
	title: string;
	description: string;
	company: string;
	location: string;
	salary: number;
	remote: boolean;
	tags: string[];
};

type Props = {
	jobs: Job[];
};

interface SkillFilterProps {
	onFilterChange: (selectedSkills: string[]) => void;
}

const SkillFilter: React.FC<SkillFilterProps> = ({ onFilterChange }) => {
	const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
	const [inputValue, setInputValue] = useState<string>("");

	const handleSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const skillName = event.target.name;
		const isChecked = event.target.checked;

		if (isChecked) {
			setSelectedSkills((prevSkills) => [...prevSkills, skillName]);
		} else {
			setSelectedSkills((prevSkills) => prevSkills.filter((s) => s !== skillName));
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			addSelectedSkill(inputValue.trim());
			setInputValue("");
		}
	};

	const addSelectedSkill = (skillName: string) => {
		if (skillName !== "" && !selectedSkills.includes(skillName)) {
			setSelectedSkills([...selectedSkills, skillName]);
		}
	};

	const removeSelectedSkill = (skillName: string) => {
		setSelectedSkills((prevSkills) => prevSkills.filter((s) => s !== skillName));
	};

	const handleFilterChange = () => {
		onFilterChange(selectedSkills);
	};

	return (
		<Stack direction="column" spacing={2}>
			<Typography variant="h6" sx={{ fontWeight: "bold" }}>
				Skills
			</Typography>
			<Stack direction="column" spacing={0} justifyContent="center">
				<Stack direction="row" spacing={1} alignItems="center">
					<Checkbox
						name="Frontend"
						checked={selectedSkills.includes("Frontend")}
						onChange={handleSkillChange}
						sx={{ color: "primary.main" }}
					/>

					<Typography>Frontend</Typography>
				</Stack>
				<Stack direction="row" spacing={1} alignItems="center">
					<Checkbox
						name="Backend"
						checked={selectedSkills.includes("Backend")}
						onChange={handleSkillChange}
						sx={{ color: "primary.main" }}
					/>
					<Typography>Backend</Typography>
				</Stack>
				<Stack direction="row" spacing={1} alignItems="center">
					<Checkbox
						name="Fullstack"
						checked={selectedSkills.includes("Fullstack")}
						onChange={handleSkillChange}
						sx={{ color: "primary.main" }}
					/>
					<Typography>Fullstack</Typography>
				</Stack>
				<Stack direction="row" spacing={1} alignItems="center">
					<Checkbox
						name="DevOps"
						checked={selectedSkills.includes("DevOps")}
						onChange={handleSkillChange}
						sx={{ color: "primary.main" }}
					/>
					<Typography>DevOps</Typography>
				</Stack>
				<Stack direction="row" spacing={1} alignItems="center">
					<Checkbox
						name="Mobile"
						checked={selectedSkills.includes("Mobile")}
						onChange={handleSkillChange}
						sx={{ color: "primary.main" }}
					/>
					<Typography>Mobile</Typography>
				</Stack>
			</Stack>
			<Stack direction="row" spacing={2} alignItems="center">
				<TextField
					label="Other skills"
					variant="outlined"
					size="small"
					value={inputValue}
					onChange={handleInputChange}
					onKeyPress={handleInputKeyPress}
					fullWidth
					sx={{ mt: 1 }}
				/>
				<Button
					variant="outlined"
					size="medium"
					onClick={() => addSelectedSkill(inputValue.trim())}
				>
					Add
				</Button>
			</Stack>
			<Box sx={{ width: "200px" }}>
				{selectedSkills.map((skillName) => (
					<Stack
						direction="row"
						key={skillName}
						spacing={{ xs: 1, sm: 2 }}
						sx={{ minWidth: "200px", maxWidth: "200px" }}
					>
						<Typography>{skillName}</Typography>
						<Button
							size="small"
							onClick={() => removeSelectedSkill(skillName)}
						>
							x
						</Button>
					</Stack>
				))}
			</Box>
		</Stack>
	);
};

const JobList = ({ jobs }: Props) => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [selectedJob, setSelectedJob] = useState<Job | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>, job: Job) => {
		setAnchorEl(event.currentTarget);
		setSelectedJob(job);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<List className={classes.jobs}>
			{jobs.map((job) => (
				<ListItem key={job.id} className={classes.listItem}>
					<ListItemText
						primary={job.title}
						secondary={
							<>
								{job.company} - {job.location} -
								{job.remote ? "Remote" : "Office"}
								<br />
								{job.description}
								<br />
								<br />
								<br />
								<JobTags tags={job.tags} />
								<Divider />
							</>
						}
					/>

					<ListItemSecondaryAction>
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						{job.salary}$
						<IconButton
							onClick={(event) => handleClick(event, job)}
							edge="end"
						>
							<MoreVert />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			))}
			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
				<MenuItem onClick={handleClose}>View Details</MenuItem>
				<MenuItem onClick={handleClose}>Save Job</MenuItem>
			</Menu>
		</List>
	);
};

const Filters = () => {
	const classes = useStyles();

	const [salary, setSalary] = useState<string>("");
	const [type, setType] = useState<string>("");
	const [skills, setSkills] = useState<string>("");
	const [language, setLanguage] = useState<string>("");
	const [remote, setRemote] = useState<boolean>(false);

	const handleSalaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSalary(event.target.value);
	};

	const handleRemoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRemote(event.target.checked);
	};

	const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setType(event.target.value);
	};

	const handleSkillsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSkills(event.target.value);
	};

	const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLanguage(event.target.value);
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
					fullWidth
				/>
			</Box>
			<Box className={classes.filter}>
				<TextField
					className={classes.search}
					label="Location"
					variant="outlined"
					value={salary}
					onChange={handleSalaryChange}
					fullWidth
				/>
			</Box>
			<Box className={classes.filter}>
				<TextField
					className={classes.search}
					label="Salary"
					variant="outlined"
					value={salary}
					onChange={handleSalaryChange}
					fullWidth
				/>
			</Box>
			<Box className={classes.filter}>
				<PriceFilter
					minPrice={0}
					maxPrice={0}
					onPriceChange={function (minPrice: number, maxPrice: number): void {
						throw new Error("Function not implemented.");
					}}
				/>
			</Box>
			<Box className={classes.filter}>
				<TextField
					className={classes.search}
					label="Salary"
					variant="outlined"
					value={salary}
					onChange={handleSalaryChange}
					fullWidth
				/>
			</Box>

			<Box className={classes.filter}>
				<SkillFilter
					onFilterChange={function (selectedSkills: string[]): void {
						throw new Error("Function not implemented.");
					}}
				/>
			</Box>
			<Box className={classes.filter}>
				<JobTypeFilter
					onChange={function (selectedTypes: JobType[]): void {
						throw new Error("Function not implemented.");
					}}
				/>
			</Box>
			<Box className={classes.filter}>
				<FormControlLabel
					control={
						<Checkbox
							color="primary"
							checked={remote}
							onChange={handleRemoteChange}
						/>
					}
					label="Remote Only"
				/>
			</Box>

			<Button variant="contained" color="primary" sx={{ maxWidth: "150px" }}>
				Apply Filters
			</Button>
		</Box>
	);
};

const JobsPage = () => {
	const classes = useStyles();

	const [jobs, setJobs] = useState<Job[]>([
		{
			id: 1,
			title: "Front-end Developer",
			description:
				"We are looking for a Front-end Developer who is motivated to combine the art of design with the art of programming.",
			company: "ABC Inc.",
			location: "New York",
			salary: 80000,
			remote: false,
			tags: ["Frontend"],
		},
		{
			id: 2,
			title: "Back-end Developer",
			description:
				"We are looking for a Back-end Developer who is motivated to combine the art of design with the art of programming.",
			company: "XYZ Ltd.",
			location: "London",
			salary: 90000,
			remote: true,
			tags: ["DevOps"],
		},
		{
			id: 3,
			title: "Full-stack Developer",
			description:
				"We are looking for a Full-stack Developer who is motivated to combine the art of design with the art of programming.",
			company: "PQR Corp.",
			location: "San Francisco",
			salary: 100000,
			remote: false,
			tags: ["Frontend", "Backend"],
		},
		{
			id: 4,
			title: "Mobile Developer",
			description:
				"We are looking for a Mobile Developer who is motivated to combine the art of design with the art of programming.",
			company: "MNO LLC",
			location: "Tokyo",
			salary: 110000,
			remote: true,
			tags: ["DevOps"],
		},
		{
			id: 5,
			title: "UI/UX Designer",
			description:
				"We are looking for a UI/UX Designer who is motivated to combine the art of design with the art of programming.",
			company: "DEF Co.",
			location: "Berlin",
			salary: 70000,
			remote: false,
			tags: ["Frontend"],
		},
		{
			id: 6,
			title: "Product Manager",
			description:
				"We are looking for a Product Manager who is motivated to combine the art of design with the art of programming.",
			company: "GHI GmbH",
			location: "Paris",
			salary: 120000,
			remote: true,
			tags: ["DevOps"],
		},
	]);
	const chatMessages: any[] = [
		{
			id: 1,
			sender: "Alice",
			message: "Hi Bob, how are you?",
			date: new Date("2022-04-22T10:00:00.000Z"),
		},
		{
			id: 2,
			sender: "Bob",
			message: "I'm doing well, thanks! How about you?",
			date: new Date("2022-04-22T10:05:00.000Z"),
		},
		{
			id: 3,
			sender: "Alice",
			message: "I'm good too, thanks for asking!",
			date: new Date("2022-04-22T10:10:00.000Z"),
		},
	];

	const conversations: any[] = [
		{
			id: 1,
			name: "Bob",
			messages: [chatMessages[0], chatMessages[1]],
		},
		{
			id: 2,
			name: "Carol",
			messages: [chatMessages[2]],
		},
	];

	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12} md={12} sx={{ backgroundColor: "#f0f0f0" }}>
					<Box className={classes.root}>
						<Grid container spacing={3} alignContent="center">
							<Grid item xs={12} md={3}>
								<Filters />
							</Grid>

							<Grid item xs={12} md={5}>
								<Box>
									<JobDescriptionHeader
										onSortByDate={function () {
											throw new Error("Function not implemented.");
										}}
										onSortByPrice={function () {
											throw new Error("Function not implemented.");
										}}
										onPageChange={function (page: number): void {
											throw new Error("Function not implemented.");
										}}
										currentPage={0}
										totalPages={0}
									/>
									<JobList jobs={jobs} />
								</Box>
							</Grid>
							<Grid item xs={12} md={4}>
								<MessagingFeed conversations={conversations} />
							</Grid>
						</Grid>
					</Box>
				</Grid>
				<Box className={classes.pagination}>
					<Button variant="outlined">Previous</Button>
					<Button
						variant="contained"
						color="primary"
						style={{ marginLeft: "8px", marginRight: "8px" }}
					>
						1
					</Button>
					<Button variant="outlined">Next</Button>
				</Box>
			</Grid>
		</>
	);
};

export default JobsPage;
