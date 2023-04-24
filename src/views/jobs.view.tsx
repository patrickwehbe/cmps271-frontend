import * as React from "react";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
	Container,
	Grid,
	TextField,
	Button,
	Typography,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Pagination,
} from "@mui/material";

const useStyles = makeStyles({
	container: {
		marginTop: "20px",
		backgroundColor: "red",
		height: "100vh",
	},
	jobList: {
		marginTop: "20px",
	},
	jobItem: {
		padding: "10px",
		borderBottom: "1px solid #ccc",
	},
	jobTitle: {
		fontSize: "20px",
		fontWeight: "bold",
	},
	jobDesc: {
		marginTop: "10px",
		marginBottom: "10px",
	},
	jobInfo: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	searchContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: "20px",
	},
	searchInput: {
		marginRight: "10px",
	},
	paginationContainer: {
		marginTop: "20px",
		display: "flex",
		justifyContent: "center",
	},
});

interface Job {
	id: number;
	title: string;
	description: string;
	location: string;
	date: string;
	type: string;
	budget: number;
	skills: string[];
	bids: number;
	renumeration: number;
}

const jobs: Job[] = [
	{
		id: 1,
		title: "React Developer Needed",
		description: "We are looking for a skilled React developer to join our team.",
		location: "San Francisco, CA",
		date: "Oct 15, 2022",
		type: "Full-time",
		budget: 5000,
		skills: ["React", "JavaScript", "HTML", "CSS"],
		bids: 10,
		renumeration: 6000,
	},
	{
		id: 2,
		title: "Python Developer Needed",
		description: "We are seeking a Python developer to work on a new project.",
		location: "New York, NY",
		date: "Nov 1, 2022",
		type: "Contract",
		budget: 8000,
		skills: ["Python", "Django", "PostgreSQL"],
		bids: 5,
		renumeration: 10000,
	},
	{
		id: 3,
		title: "UI/UX Designer Needed",
		description:
			"We are looking for a talented UI/UX designer to help us redesign our website.",
		location: "Seattle, WA",
		date: "Dec 1, 2022",
		type: "Part-time",
		budget: 2000,
		skills: ["UI/UX Design", "Figma", "Sketch"],
		bids: 7,
		renumeration: 2500,
	},
];

const JobList = () => {
	const classes = useStyles();
	const [searchTerm, setSearchTerm] = useState("");
	const [locationFilter, setLocationFilter] = useState("");
	const [budgetFilter, setBudgetFilter] = useState("");
	const [typeFilter, setTypeFilter] = useState("");
	const [skillFilter, setSkillFilter] = useState("");

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleLocationFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setLocationFilter(event.target.value as string);
	};

	const handleBudgetFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setBudgetFilter(event.target.value as string);
	};

	const handleTypeFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setTypeFilter(event.target.value as string);
	};

	const handleSkillFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setSkillFilter(event.target.value as string);
	};

	const filteredJobs = jobs.filter((job) => {
		return (
			job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(locationFilter === "" || job.location === locationFilter) &&
			(budgetFilter === "" || job.budget.toString() === budgetFilter) &&
			(typeFilter === "" || job.type === typeFilter) &&
			(skillFilter === "" || job.skills.includes(skillFilter))
		);
	});

	const itemsPerPage = 5;
	const [currentPage, setCurrentPage] = useState(1);
	const totalItems = filteredJobs.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
	};

	return (
		<Container maxWidth="md" className={classes.container}>
			<Grid container spacing={3}>
				<Grid item xs={12} className={classes.searchContainer}>
					<TextField
						id="search"
						label="Search jobs"
						variant="outlined"
						className={classes.searchInput}
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					<Pagination
						count={totalPages}
						page={currentPage}
						onChange={handlePageChange}
					/>
				</Grid>
				<Grid item xs={12} sm={3}>
					<FormControl fullWidth>
						<InputLabel id="location-filter-label">Location</InputLabel>
						<Select
							labelId="location-filter-label"
							id="location-filter"
							value={locationFilter}
							// onChange={handleLocationFilterChange}
						>
							<MenuItem value="">All locations</MenuItem>
							<MenuItem value="San Francisco, CA">
								San Francisco, CA
							</MenuItem>
							<MenuItem value="New York, NY">New York, NY</MenuItem>
							<MenuItem value="Seattle, WA">Seattle, WA</MenuItem>
						</Select>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel id="budget-filter-label">Budget</InputLabel>
						<Select
							labelId="budget-filter-label"
							id="budget-filter"
							value={budgetFilter}
							// onChange={handleBudgetFilterChange}
						>
							<MenuItem value="">All budgets</MenuItem>
							<MenuItem value="5000">$5000+</MenuItem>
							<MenuItem value="8000">$8000+</MenuItem>
							<MenuItem value="2000">$2000+</MenuItem>
						</Select>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel id="type-filter-label">Type</InputLabel>
						<Select
							labelId="type-filter-label"
							id="type-filter"
							value={typeFilter}
							// onChange={handleTypeFilterChange}
						>
							<MenuItem value="">All types</MenuItem>
							<MenuItem value="Full-time">Full-time</MenuItem>
							<MenuItem value="Contract">Contract</MenuItem>
							<MenuItem value="Part-time">Part-time</MenuItem>
						</Select>
					</FormControl>
					<FormControl fullWidth>
						<InputLabel id="skill-filter-label">Skills</InputLabel>
						<Select
							labelId="skill-filter-label"
							id="skill-filter"
							value={skillFilter}
							// onChange={handleSkillFilterChange}
						>
							<MenuItem value="">All skills</MenuItem>
							<MenuItem value="React">React</MenuItem>
							<MenuItem value="Python">Python</MenuItem>
							<MenuItem value="UI/UX Design">UI/UX Design</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={9} className={classes.jobList}>
					{filteredJobs
						.slice(
							(currentPage - 1) * itemsPerPage,
							currentPage * itemsPerPage
						)
						.map((job) => (
							<div key={job.id} className={classes.jobItem}>
								<Typography className={classes.jobTitle}>
									{job.title}
								</Typography>
								<Typography className={classes.jobDesc}>
									{job.description}
								</Typography>
								<div className={classes.jobInfo}>
									<Typography>{job.location}</Typography>
									<Typography>{job.date}</Typography>
									<Typography>{job.bids} bids</Typography>
									<Typography>${job.renumeration}</Typography>
								</div>
							</div>
						))}
					<div className={classes.paginationContainer}>
						<Pagination
							count={totalPages}
							page={currentPage}
							onChange={handlePageChange}
						/>
					</div>
				</Grid>
			</Grid>
		</Container>
	);
};

export default JobList;
