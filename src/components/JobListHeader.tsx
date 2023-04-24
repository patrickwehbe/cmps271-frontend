import * as React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	Button,
	MenuItem,
	Menu,
	FormControl,
	InputLabel,
	Select,
	FormHelperText,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

interface JobDescriptionHeaderProps {
	onSortByDate: () => any;
	onSortByPrice: () => any;
	onPageChange: (page: number) => void;
	currentPage: number;
	totalPages: number;
}

const JobDescriptionHeader: React.FC<JobDescriptionHeaderProps> = (job) => {
	const [jobs, setJobs] = React.useState<any[]>([]);
	const [sort, setSort] = React.useState("");

	const handleChange = (event: any) => {
		setSort(event.target.value);
	};
	const [currentPage, setCurrentPage] = React.useState(1);
	const [totalPages, setTotalPages] = React.useState(1);
	const onSortByDate = () => {
		setJobs((prevJobs) =>
			[...prevJobs].sort((a, b) => {
				const dateA = new Date(a.date);
				const dateB = new Date(b.date);

				if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
					// handle invalid dates
					return 0;
				}

				return dateB.getTime() - dateA.getTime();
			})
		);
	};

	const onSortByPrice = () => {
		const sortedJobs = jobs.slice().sort((a, b) => {
			return b.price - a.price;
		});
		setJobs(sortedJobs);
	};

	const onPageChange = (page: number) => {
		// Update the current page state
		setCurrentPage(page);
	};

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar
			position="static"
			sx={{ minHeight: "100px", display: "flex", justifyContent: "center" }}
		>
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Job Description
				</Typography>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Box sx={{ position: "relative" }}>
						<FormControl
							sx={{ m: 2, minWidth: 120, backgroundColor: "white" }}
						>
							<InputLabel id="demo-simple-select-helper-label">
								Sort
							</InputLabel>
							<Select
								labelId="demo-simple-select-helper-label"
								id="demo-simple-select-helper"
								value={sort}
								label="Sort"
								onChange={handleChange}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value="INCR">INCR</MenuItem>
								<MenuItem value="DESC">DESC</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default JobDescriptionHeader;
